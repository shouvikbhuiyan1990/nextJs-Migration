import React, { useState } from 'react';
import { ReactTinyLink } from "react-tiny-link";
import styled from 'styled-components';
import CourseTile from './courseTile';
import SharePage from '../common/sharePage';
import Slider from "react-slick";

const Styles = styled.div`
.courses-teacher {
    padding-top: 35px;
    flex: 1;
    max-width: 740px;
}

.courses-teacher .teacher-details-tile .details-body .highlights-carousal a {
    margin: 0 10px 0 0;
}

.courses-teacher .btn.share-btn {
    display: none;
}

.courses-teacher .course-tile {
    width: 100%;
    margin: 12px 10px;
}

.courses-teacher h2 {
    margin: 0;
    font-size: 20px;
}

.courses-teacher .centered-with-space {
    flex-direction: column;
    align-items: flex-start;
    margin: 0 0 20px 10px;
}

.courses-teacher .courses-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.teacher-details .btn.share-btn {
    align-self: center;
    margin: 10px 0 20px;
}

.teacher-details-tile .details-body {
    margin: 0 0 20px 10px;
}

@media screen and (min-width: 1025px) {
    .courses-teacher .teacher-details-tile .details-body .highlights-carousal a {
        margin: 0 5px;
    }
    .teacher-details .btn.share-btn {
        display: none;
    }
    .courses-teacher .btn.share-btn {
        display: block;
    }
    .courses-teacher {
        padding-top: 0;
        padding-left: 48px;
    }
    .courses-teacher .courses-container {
        justify-content: flex-start;
    }
    .courses-teacher .centered-with-space {
        flex-direction: row;
        align-items: center;
    }
    .courses-teacher .course-tile {
        margin-right: 25px;
    }
    .courses-teacher .centered-with-space {
        margin: 0 0 20px 10px;
    }
    .teacher-details-tile .details-body {
        margin: 0 0 20px 10px;
    }
    .courses-teacher {
        padding-top: 35px;
        flex: 1;
        max-width: 800px;
        width: 40%;
    }
}`;


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
        <Styles>
            <div className='courses-teacher'>
                <SharePage
                    url={typeof window !== 'undefined' ? window.location.href : ''}
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
                                {typeof window !== 'undefined' &&
                                    <>
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
                                    </>
                                }
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
        </Styles>
    );
};

export default TeacherCourses;