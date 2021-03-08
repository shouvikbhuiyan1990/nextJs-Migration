import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from '../../store/actions/cources';
import SharePage from '../common/sharePage';
import Spinner from 'react-bootstrap/Spinner';
// import TeacherTile from '../component/teacherTile';
import ProfileDetails from '../component/profileDetails';
import ScrollToTopOnMount from '../common/scrollToTopOnMount';

import './container.css';

const TeacherDetails = ({
    match: {
        params: {
            id
        }
    },
    isStudent
}) => {
    const dispatch = useDispatch();
    const [showShareModal, setShareModalDisplay] = useState(false);
    const teacherDetails = useSelector(state => state.cources.teacheDeatails) || {};
    let { courses = [] } = useSelector(state => state.cources.teacheDeatails) || {};
    const isTeachersDetailsLoading = useSelector(state => state.cources.isTeachersDetailsLoading);

    courses.sort(function (a, b) {
        var keyA = a.rating,
            keyB = b.rating;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });

    useEffect(() => {
        dispatch(getTeacherDetails(id, isStudent));
    }, [dispatch, id, isStudent]);

    return (
        <main>
            <ScrollToTopOnMount />
            {!teacherDetails.errorCode &&
                <div className='teacher-listing'>
                    {!isTeachersDetailsLoading &&
                        < div className='share-btn-container'>
                            <button className='btn share-btn' onClick={() => setShareModalDisplay(!showShareModal)}>
                                <i className="fa fa-share-alt" aria-hidden="true"></i>
                                <span>share</span>
                            </button>
                        </div>
                    }
                    <SharePage
                        url={window.location.href}
                        text={`Check out my profile in Conzult`}
                        subject='About my profile in Conzult'
                        show={showShareModal}
                        setDisplay={() => setShareModalDisplay(!showShareModal)}
                    />
                    {isTeachersDetailsLoading && <div className='loader'>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                    }
                    {!isTeachersDetailsLoading && !isStudent && <React.Fragment>
                        {/* <TeacherTile {...teacherDetails.teacher} bestRated={courses[0] ? courses[0].subject : ''} /> */}
                        {/*<TeacherCourses teacher={teacherDetails.teacher} courses={teacherDetails.courses} /> */}
                        <ProfileDetails
                            {...teacherDetails.teacher}
                            bestRated={courses[0] ? courses[0].subject : ''}
                            teacher={teacherDetails.teacher}
                            courses={teacherDetails.courses}
                            experiences={teacherDetails.experiences}
                            feedbacks={teacherDetails.feedbacks}
                            educations={teacherDetails.educations}
                        />
                    </React.Fragment>
                    }
                    {!isTeachersDetailsLoading && isStudent && <React.Fragment>
                        {/* <TeacherTile {...teacherDetails.teacher} bestRated={courses[0] ? courses[0].subject : ''} /> */}
                        {/*<TeacherCourses teacher={teacherDetails.teacher} courses={teacherDetails.courses} /> */}
                        <ProfileDetails
                            {...teacherDetails.student}
                            teacher={teacherDetails.student}
                            experiences={teacherDetails.experiences}
                            educations={teacherDetails.educations}
                            isStudent={true}
                        />
                    </React.Fragment>
                    }
                </div>
            }
            {teacherDetails.errorCode &&
                <div className='teacher-listing centered-without-space'>
                    <h2>{teacherDetails.displayText || 'Something went wrong'}</h2>
                </div>
            }
        </main >
    );
};

export default TeacherDetails;