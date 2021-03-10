import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import EditCourse from './editCourse';
import Modal from 'react-bootstrap/Modal';
import isEmpty from 'lodash/isEmpty';
import { deleteCourse } from '../../../store/actions/cources';
import cookie from '../../../utils/cookie';

import CourseTile from '../courseTile';
let cachedCourseFields,
    cachedIsReqFlow;

const UserCourses = ({
    allCourseByTeacher,
    loadingAllCourseByTeacher,
    getCourseCb
}) => {

    const dispatch = useDispatch();

    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    const {
        courses = [],
        coursesRequests = [],
        teacher = []
    } = allCourseByTeacher;

    const [showCourseForm, setDisplayCourseForm] = useState(false);
    const [courseFields, setCourseFields] = useState({});
    const [isRequestFlow, setIsRequestFlow] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const courseUpdating = useSelector(state => state.cources.courseUpdating);

    useEffect(() => {
        if (courseUpdating) {
            setDisplayCourseForm(false);
        }
    }, [courseUpdating])


    const hideEditForm = () => {
        setDisplayCourseForm(false);
    }

    const handleEdit = (courseFields, isReqFlow) => {
        setCourseFields(courseFields);
        setDisplayCourseForm(true);
        setIsRequestFlow(!!isReqFlow);
    }

    const confirmDelete = () => {
        let bodyObject = {};
        !cachedIsReqFlow ? bodyObject.courseId = cachedCourseFields.courseId || cachedCourseFields.id : bodyObject.requestId = cachedCourseFields.id;
        dispatch(deleteCourse(cookie.get('googleAuthId')[0], JSON.stringify(bodyObject), cachedIsReqFlow));
        setShowDeleteModal(false);
    }

    const handleDelete = (courseFields, isReqFlow) => {
        setShowDeleteModal(true);
        cachedCourseFields = courseFields;
        cachedIsReqFlow = isReqFlow;
    }

    return (
        <div className='user-courses'>
            {loadingAllCourseByTeacher &&
                <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }
            <React.Fragment>
                <Modal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    centered={true}
                    className='delete-modal'
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Do you want to delete this course ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={confirmDelete} className='btn-theme-global' variant="primary" type="button">
                            Yes
                                </Button>
                        <Button onClick={() => setShowDeleteModal(false)} className='btn-theme-global-cancel' variant="primary" type="button">
                            No
                                 </Button>
                    </Modal.Footer>
                </Modal>
                <EditCourse
                    showForm={showCourseForm}
                    hideEditForm={hideEditForm}
                    courseFields={courseFields}
                    teacherName={teacher[0] ? teacher[0].name : ''}
                    isCourseAddForm={isEmpty(courseFields) ? true : false}
                    isRequestFlow={isRequestFlow}
                />
                <div className='active'>
                    <div className='active-head'>
                        <h5> Active Courses </h5>
                        {courses.length !== 0 &&
                            <Button onClick={() => { setDisplayCourseForm(true); setCourseFields({}); }} className='btn-theme-global'>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            Add New Course
                        </Button>
                        }
                    </div>
                    {
                        courses.length === 0 &&
                        <div className='no-course' onClick={() => { setDisplayCourseForm(true); setCourseFields({}); }} >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    }
                    <Slider {...settings}>
                        {
                            courses.map((value) => (
                                <CourseTile
                                    blockTeacherRedirect
                                    profileUrl={teacher[0] ? teacher[0].profileUrl : ''}
                                    handleDelete={() => handleDelete(value, false)}
                                    handleEdit={() => handleEdit(value, false)}
                                    isEditable {...value} key={value.id}
                                    blockTeacherDetails
                                    blockCourseDetails courseId={value.id}
                                />
                            ))
                        }
                    </Slider>
                </div>
                <div className='pending'>
                    <h5> Pending Courses </h5>
                    {
                        coursesRequests.length === 0 &&
                        <p>You don't have any pending courses</p>
                    }
                    <Slider {...settings}>
                        {
                            coursesRequests.map((value) => (
                                <CourseTile
                                    blockTeacherRedirect
                                    profileUrl={teacher[0] ? teacher[0].profileUrl : ''}
                                    handleDelete={() => handleDelete(value, true)}
                                    handleEdit={() => handleEdit(value, true)}
                                    isEditable {...value} key={value.id}
                                    blockTeacherDetails
                                    blockCourseDetails courseId={value.id}
                                />
                            ))
                        }
                    </Slider>
                </div>
            </React.Fragment>
        </div>
    );
};


export default UserCourses;