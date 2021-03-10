import React, { useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import ScrollToTopOnMount from '../../common/scrollToTopOnMount';
import Link from 'next/link';
import UserInfo from '../../component/profiePages/userInfo';
import { useDispatch, useSelector } from "react-redux";
import { checkIfProfileExists } from '../../../store/actions/registration';
import { getEvents } from '../../../store/actions/global';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';
import FeedBack from '../../component/feedback';
import DashboardHoc from './dashboardHoc';

import cookie from '../../../utils/cookie';
import { logout } from '../../../utils/helpers';
import EventTile from '../../component/events';
import Styles from '../container';

const EventsLanding = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.registration.userInfo) || {};
    const isUserInfoLoading = useSelector(state => state.registration.isUserInfoLoading);
    const {
        upcoming = [],
        past = []
    } = useSelector(state => state.global.allEvents);
    const eventFetchStatus = useSelector(state => state.global.eventFetchStatus);

    useEffect(() => {
        if (isEmpty(userInfo)) {

            dispatch(checkIfProfileExists(cookie.get('googleAuthId')[0]));
        }
        if (!isEmpty(userInfo)) {
            const isTeacher = !isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest);
            dispatch(getEvents(cookie.get('googleAuthId')[0], isTeacher));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (!isEmpty(userInfo.error) && userInfo.error === 'REDIRECT') {
            logout();
        }
    }, [userInfo]);

    const isStudent = (!isEmpty(userInfo.student) && (isEmpty(userInfo.teacher) && isEmpty(userInfo.teacherRequest))) || (isEmpty(userInfo.student) && isEmpty(userInfo.teacherRequest) && isEmpty(userInfo.teacher));
    const isTeacher = !isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest);
    const isGuest = !!(isEmpty(userInfo.teacher) && isEmpty(userInfo.teacherRequest) && isEmpty(userInfo.student) && isEmpty(userInfo.studentRequest));

    return (
        <Styles>
            <main className='dashboard-main'>
                <ScrollToTopOnMount />
                <FeedBack isTeacher={isTeacher} />
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
                                isGuest={isGuest}
                            />
                            <div className='user-details-section events-container'>
                                {
                                    eventFetchStatus === 'loading' && <div className='loader'>
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    </div>
                                }
                                {isGuest &&
                                    <Alert key={"WarningPendingProfile"} variant={"warning"}>
                                        You are logged in as a guest user. Please signup to unlock full benefits.
                                </Alert>
                                }
                                <div className='upcoming'>
                                    <h2 className='heading'>Upcoming Events</h2>
                                    {upcoming.length === 0 &&
                                        <div className='no-result'>
                                            <p>No upcoming events.</p>
                                        </div>
                                    }
                                    {
                                        upcoming.length > 0 && upcoming.map((item) => <EventTile {...item} />)
                                    }
                                </div>
                                <div className='past'>
                                    <h2 className='heading'>Past Events</h2>
                                    {past.length === 0 &&
                                        <div className='no-result'>
                                            <p>No past events. Please <Link href={`/`}> book a consulation</Link> from our wide variety of course offerings.</p>
                                        </div>
                                    }
                                    {
                                        past.length > 0 && past.map((item) => <EventTile {...item} pastTile />)
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </main>
        </Styles>
    );
};

export default DashboardHoc(EventsLanding);