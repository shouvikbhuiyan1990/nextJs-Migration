import React, { useEffect } from "react";
import merge from 'lodash/merge';
import ScrollToTopOnMount from '../../common/scrollToTopOnMount';
import UserInfo from '../../component/profiePages/userInfo';
import ProfileInfo from '../../component/profiePages/profileInfo';
import { useDispatch, useSelector } from "react-redux";
import { checkIfProfileExists } from '../../../store/actions/registration';
import { getFeedbacks } from '../../../store/actions/global';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';
import Modal from '../../component/joiningModal';
import FeedBack from '../../component/feedback';
import RegistrationModal from '../../component/registrationModal';

import cookie from '../../../utils/cookie';
import { logout } from '../../../utils/helpers';
import Styles from '../container';
// import '../container.css';
import { useRouter } from "next/router";

const Dashboard = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector(state => state.registration.userInfo) || {};
    const isUserInfoLoading = useSelector(state => state.registration.isUserInfoLoading);

    useEffect(() => {
        if (isEmpty(userInfo)) {

            dispatch(checkIfProfileExists(cookie.get('googleAuthId')[0]));
        }
        if (!isEmpty(userInfo)) {
            if (isEmpty(userInfo.teacher) && isEmpty(userInfo.teacherRequest) && isEmpty(userInfo.student) && isEmpty(userInfo.studentRequest)) {
                router.push('/events');
            }
            const isTeacher = !isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest);
            dispatch(getFeedbacks(cookie.get('googleAuthId')[0], isTeacher));
        }
    }, [dispatch, userInfo, history]);

    useEffect(() => {
        if (!isEmpty(userInfo.error) && userInfo.error === 'REDIRECT') {
            logout();
        }
    }, [userInfo]);

    const teacherDetails = isEmpty(userInfo.teacher) ? userInfo.teacherRequest : userInfo.teacher;
    const isStudent = (!isEmpty(userInfo.student) && (isEmpty(userInfo.teacher) && isEmpty(userInfo.teacherRequest))) || (isEmpty(userInfo.student) && isEmpty(userInfo.teacherRequest) && isEmpty(userInfo.teacher));
    const isTeacher = !isEmpty(userInfo.teacher) || !isEmpty(userInfo.teacherRequest);
    const isGuest = !!(isEmpty(userInfo.teacher) && isEmpty(userInfo.teacherRequest) && isEmpty(userInfo.student) && isEmpty(userInfo.studentRequest));
    const showModal = useSelector(state => state.joinModal.showModal);
    const showRegistrationModal = useSelector(state => state.joinModal.showRegistrationModal);

    const mergedTeacherInfo = merge({}, userInfo.teacher, userInfo.teacherRequest);
    const mergedStudentInfo = merge({}, userInfo.student, userInfo.studentRequest);

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
                            <div className='user-details-section'>
                                {isTeacher &&
                                    <ProfileInfo
                                        pendingDetails={{ ...mergedTeacherInfo }}
                                        {...teacherDetails}
                                        experiences={userInfo.experiences || []}
                                        educations={userInfo.educations || []}
                                        teacherRequest={userInfo.teacherRequest}
                                        warningProfileFieldsPending={!isEmpty(userInfo.teacher) && !isEmpty(userInfo.teacherRequest)}
                                        warningProfilePending={isEmpty(userInfo.teacher) && !isEmpty(userInfo.teacherRequest)}
                                    />
                                }
                                {isStudent &&
                                    <ProfileInfo
                                        pendingDetails={{ ...mergedStudentInfo }}
                                        experiences={userInfo.experiences || []}
                                        educations={userInfo.educations || []}
                                        isStudent={true}
                                        warningProfileFieldsPending={!isEmpty(userInfo.student) && !isEmpty(userInfo.studentRequest)}
                                        warningProfilePending={isEmpty(userInfo.student) && !isEmpty(userInfo.studentRequest)}
                                    />
                                }

                                <Modal show={showModal} />
                                <RegistrationModal show={showRegistrationModal} />
                            </div>
                        </React.Fragment>
                    }
                </div>
            </main>
        </Styles>
    );
};

export default Dashboard;