import React, { useEffect } from "react";
import { DiscussionEmbed } from 'disqus-react';
import uuid from 'uuid';
import ScrollToTopOnMount from '../../common/scrollToTopOnMount';
import UserInfo from '../../component/profiePages/userInfo';
import { useDispatch, useSelector } from "react-redux";
import { checkIfProfileExists } from '../../../store/actions/registration';
import { getAllMessages } from '../../../store/actions/booking';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';
import FeedBack from '../../component/feedback';
import Styles from '../container';
import cookie from '../../../utils/cookie';
import { logout } from '../../../utils/helpers';
import DashboardHoc from './dashboardHoc';


const SITE_SHORT_NAME = "https-conzalt-com";
const SITE_IDENTIFIER = uuid();
const SITE_URL = "http://conzalt.com/";
const SITE_TITLE = "Conzult";

const FeedsLanding = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.registration.userInfo) || {};
    const isUserInfoLoading = useSelector(state => state.registration.isUserInfoLoading);

    useEffect(() => {
        if (isEmpty(userInfo)) {

            dispatch(checkIfProfileExists(cookie.get('googleAuthId')[0]));
        }
        document.querySelector('body').classList.add('hide-scroll');
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let query = new URLSearchParams(location.search);
            dispatch(getAllMessages(cookie.get('googleAuthId')[0], query.get('id'), query.get('user')));
        }
    }, [dispatch])

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
                            <div className='user-details-section feeds-cont'>
                                <DiscussionEmbed
                                    shortname={SITE_SHORT_NAME}
                                    config={
                                        {
                                            url: SITE_URL,
                                            identifier: SITE_IDENTIFIER,
                                            title: SITE_TITLE
                                        }
                                    }
                                />
                            </div>
                        </React.Fragment>
                    }
                </div>
            </main>
        </Styles>
    );
};

export default DashboardHoc(FeedsLanding);