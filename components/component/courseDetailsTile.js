import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import SharePage from '../common/sharePage';
import noImage from '../../images/no-image-large.jpg';

import './courseDetailsTile.css';

const CourseDetailsTile = ({
    teacherName,
    subject,
    iconUrl,
    description,
    teacher = {},
    teacherId
}) => {
    const [showShareModal, setShareModalDisplay] = useState(false);

    return (
        <div className='cr-details-tile'>
            <SharePage
                url={window.location.href}
                text={`Check out the course in Conzult`}
                subject='About the Course in Conzult'
                show={showShareModal}
                setDisplay={() => setShareModalDisplay(!showShareModal)}
            />
            <h2>{subject}</h2>
            <div className='share-info'>
                <div className='teacher-info'>
                    <div className='t-icon'>
                        <div className='avatar' style={{ backgroundImage: `url(${teacher.profileUrl})` }}></div>
                        <Link to={`/teacher/${teacherId}`}><p>{teacherName}</p></Link>
                    </div>
                    <StarRatings
                        rating={teacher.rating}
                        starRatedColor="#ffbf00"
                        numberOfStars={5}
                        name='rating'
                        starDimension='15px'
                        starSpacing="2px"
                    />
                    <p>{teacher.country}</p>
                </div>
                <button className='btn share-btn' onClick={() => setShareModalDisplay(!showShareModal)}>
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                    <span>share</span>
                </button>
            </div>
            <div className='course-image' style={{ backgroundImage: `url(${iconUrl || noImage})` }}></div>
            <h4>About this course</h4>
            <p className='description'>{description}</p>
        </div>
    )
};

export default CourseDetailsTile;