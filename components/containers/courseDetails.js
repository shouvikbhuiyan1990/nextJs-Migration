import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseByTecherId } from '../../store/actions/cources';
import Spinner from 'react-bootstrap/Spinner';
import ScrollToTopOnMount from '../common/scrollToTopOnMount';
import CourseDetailsTile from '../component/courseDetailsTile';
import TeacherSlotBook from '../component/teacherSlotBook';
import { checkIfProfileExists } from '../../store/actions/registration';
import isEmpty from 'lodash/isEmpty';
import cookie from '../../utils/cookie';

import Styles from './container';

const TeacherDetails = ({
    id
}) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.registration.userInfo) || {};
    const { course } = useSelector(state => state.cources.courseByTecher) || {};
    const isLoggedIn = useSelector(state => state.registration.isLoggedIn);
    const { teacher } = useSelector(state => state.cources.courseByTecher) || {};
    const isCourseLoading = useSelector(state => state.cources.isCourseLoading);
    const isUserInfoLoading = useSelector(state => state.registration.isUserInfoLoading);

    useEffect(() => {
        dispatch(getCourseByTecherId(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (isEmpty(userInfo) && isLoggedIn) {
            dispatch(checkIfProfileExists(cookie.get('googleAuthId')[0]));
        }
    }, [dispatch, userInfo, isLoggedIn]);

    return (
        <Styles>
            <main>
                <ScrollToTopOnMount />
                <div className='course-listing'>
                    {(isCourseLoading || isUserInfoLoading) && <div className='loader'>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                    }
                    {!(isCourseLoading || isUserInfoLoading) && <React.Fragment>
                        <CourseDetailsTile {...course} teacher={teacher} />
                        <TeacherSlotBook {...course} isApprovedStudent={!isEmpty(userInfo.student)} />
                    </React.Fragment>
                    }
                </div>
            </main>
        </Styles>
    );
};

export default TeacherDetails;