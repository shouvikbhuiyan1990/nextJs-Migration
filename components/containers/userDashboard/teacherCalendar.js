import React, { useEffect } from "react";
import ScrollToTopOnMount from '../../common/scrollToTopOnMount';
import UserInfo from '../../component/profiePages/userInfo';
import Calendar from '../../common/calendar';
import { useDispatch, useSelector } from "react-redux";
import { checkIfProfileExists } from '../../../store/actions/registration';
import { getCalendar } from '../../../store/actions/booking';
import DashboardHoc from './dashboardHoc';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';

import cookie from '../../../utils/cookie';
import { logout } from '../../../utils/helpers';


import Styles from '../container';

const LoggedInTeacherCalendar = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.registration.userInfo) || {};
    const isUserInfoLoading = useSelector(state => state.registration.isUserInfoLoading);
    const calendarDataAll = useSelector(state => state.booking.availableData);

    useEffect(() => {
        if (!isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest)) {
            dispatch(getCalendar(cookie.get('googleAuthId')[0]));
        }
        else {
            window.location.href = '/dashboard';
        }
        if (isEmpty(userInfo)) {
            if (!isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest)) {
                dispatch(checkIfProfileExists(cookie.get('googleAuthId')[0]));
            }
            else {
                window.location.href = '/dashboard';
            }
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (!isEmpty(userInfo.error) && userInfo.error === 'REDIRECT') {
            logout();
        }
    }, [userInfo]);

    const isStudent = (!isEmpty(userInfo.student) && (isEmpty(userInfo.teacher) && isEmpty(userInfo.teacherRequest))) || (isEmpty(userInfo.student) && isEmpty(userInfo.teacherRequest) && isEmpty(userInfo.teacher));
    const isTeacher = !isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest);

    return (
        <Styles>
            <main>
                <ScrollToTopOnMount />
                <div className='loggedin-teacher-calendar'>
                    {isUserInfoLoading && <div className='loader'>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                    }
                    {!isUserInfoLoading &&
                        <React.Fragment>
                            <UserInfo
                                isStudent={isStudent}
                                isTeacher={isTeacher}
                            />
                            <div className='calendar-holder'>
                                <Calendar
                                    data={calendarDataAll}
                                />
                            </div>
                        </React.Fragment>
                    }
                </div>
            </main>
        </Styles>
    );
};

export default DashboardHoc(LoggedInTeacherCalendar);