import React, { useState } from 'react';
import { ReactTinyLink } from "react-tiny-link";
import CourseTile from './courseTile';
import SharePage from '../common/sharePage';
import Slider from "react-slick";

import './teacherCourses.css';


const TeacherCourses = ({
    courses,
    teacher = {}
}) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true
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
    const [showShareModal, setShareModalDisplay] = useState(false);

    return (
        <div className='courses-teacher'>
            <SharePage
                url={window.location.href}
                text={`Check out my profile in Conzult`}
                subject='About my profile in Conzult'
                show={showShareModal}
                setDisplay={() => setShareModalDisplay(!showShareModal)}
            />
            <div className='teacher-details-tile'>
                <div className='centered-with-space'>
                    <h2>Highlights</h2>
                    <button className='btn share-btn' onClick={() => setShareModalDisplay(!showShareModal)}>
                        <i className="fa fa-share-alt" aria-hidden="true"></i>
                        <span>share</span>
                    </button>
                </div>
                <div className='details-body'>
                    <div className='highlights-carousal'>
                        <Slider {...settings}>
                            <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url="https://www.youtube.com/watch?v=k8sN7Vl3IFQ&ab_channel=JingleToons"
                            />
                            <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url="https://www.youtube.com/watch?v=k8sN7Vl3IFQ&ab_channel=JingleToons"
                            />
                            <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url="https://www.youtube.com/watch?v=k8sN7Vl3IFQ&ab_channel=JingleToons"
                            />
                            <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url="https://www.youtube.com/watch?v=k8sN7Vl3IFQ&ab_channel=JingleToons"
                            />
                            <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url="https://www.youtube.com/watch?v=k8sN7Vl3IFQ&ab_channel=JingleToons"
                            />
                        </Slider>
                    </div>
                </div>
            </div>
            <div className='teacher-details-tile'>
                <div className='centered-with-space'>
                    <h2>Certifications</h2>
                </div>
                <div className='details-body'>
                    <p>None</p>
                </div>
            </div>
            <div className='teacher-details-tile'>
                <div className='centered-with-space'>
                    <h2>Patents</h2>
                </div>
                <div className='details-body'>
                    <p>None</p>
                </div>
            </div>
            <div className='teacher-details-tile'>
                <div className='centered-with-space'>
                    <h2>{`Courses offered by ${teacher.name}`}</h2>
                </div>
                <div className='courses-container'>
                    {
                        courses && courses.length > 0 &&
                        courses.map((value, index) => <CourseTile {...value} key={value.id} blockTeacherDetails blockCourseDetails courseId={value.id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default TeacherCourses;