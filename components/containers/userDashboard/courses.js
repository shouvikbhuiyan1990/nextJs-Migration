import React, { useEffect } from "react";
import ScrollToTopOnMount from '../../common/scrollToTopOnMount';
import UserInfo from '../../component/profiePages/userInfo';
import UserCourses from '../../component/profiePages/userCourses';
import { useDispatch, useSelector } from "react-redux";
import { checkIfProfileExists } from '../../../store/actions/registration';
import { getCoursesByUserTeacherDetails } from '../../../store/actions/cources';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';

import cookie from '../../../utils/cookie';
import { logout } from '../../../utils/helpers';

import Styles from '../container';

const LoggedInTeacherCources = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.registration.userInfo) || {};
    const isUserInfoLoading = useSelector(state => state.registration.isUserInfoLoading);
    const allCourseByTeacher = useSelector(state => state.cources.allCourseByTeacher);
    const loadingAllCourseByTeacher = useSelector(state => state.cources.loadingAllCourseByTeacher);

    useEffect(() => {
        dispatch(getCoursesByUserTeacherDetails(cookie.get('googleAuthId')[0]));
        if (isEmpty(userInfo)) {

            dispatch(checkIfProfileExists(cookie.get('googleAuthId')[0]));
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
                <div className='loggedin-dashboard'>
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
                            <UserCourses
                                allCourseByTeacher={allCourseByTeacher}
                                loadingAllCourseByTeacher={loadingAllCourseByTeacher}
                            />
                        </React.Fragment>
                    }
                </div>
            </main>
        </Styles>
    );
};

export default LoggedInTeacherCources;