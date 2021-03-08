import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from '../../store/actions/cources';
import { useLocation } from 'react-router-dom';
import ScrollToTopOnMount from '../common/scrollToTopOnMount';
import Spinner from 'react-bootstrap/Spinner';
import CourseTile from '../component/courseTile';

import './container.css';

const CourseLandingByUser = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    let { courses = [] } = useSelector(state => state.cources.teacheDeatails) || {};
    let { teacher = {} } = useSelector(state => state.cources.teacheDeatails) || {};
    const isTeachersDetailsLoading = useSelector(state => state.cources.isTeachersDetailsLoading);

    useEffect(() => {
        const id = location.state.id;
        dispatch(getTeacherDetails(id));
    }, [dispatch, location.state.id]);

    return (
        <main>
            <ScrollToTopOnMount />
            <div className='course-landing-user'>
                <h4>{`All Cources Offered By ${teacher.name}`}</h4>
                {isTeachersDetailsLoading && <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                }
                <div className='courses-container-all'>
                    {
                        courses && courses.length > 0 &&
                        courses.map((value, index) => <CourseTile profileUrl={teacher.profileUrl} {...value} key={value.id} courseId={value.id} />)
                    }
                </div>
            </div>
        </main>
    );
};

export default CourseLandingByUser;