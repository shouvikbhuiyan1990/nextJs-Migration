import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import star from '../../images/star.svg';
import noImage from '../../images/no-image-large.jpg';
import noImageProfile from '../../images/no-image-profile.png';

import { getCountryFromLocale, getCurrencyFromLocale } from '../../utils/helpers';

import './courseTile.css';

const CourseTile = ({
    teacherName,
    subject,
    description,
    pricing,
    rating,
    profileUrl,
    iconUrl,
    teacherId,
    courseId,
    isEditable,
    handleEdit,
    handleDelete,
    blockTeacherRedirect
}) => {
    const price = !isEmpty(pricing) ? pricing[getCountryFromLocale()].price : '';

    return (
        <div className='course-tile'>
            {!isEditable && <Link to={`/courses/${courseId}`} className='course-details-link'></Link>}
            <div className='course-tile-header' style={{ backgroundImage: `url(${iconUrl || noImage})` }}>
            </div>
            <div className='course-tile-body'>
                <div className='avata-container'>
                    <div style={{ backgroundImage: `url(${profileUrl || noImageProfile})` }} className='avatar'></div>
                    <div className='name'>
                        {blockTeacherRedirect && <p>{teacherName}</p>}
                        {!blockTeacherRedirect && <Link to={`/teacher/${teacherId}`}><p>{teacherName}</p></Link>}
                        <p>{subject}</p>
                    </div>
                </div>
                <p>{description}</p>
                <div className='rating'>
                    <img src={star} alt='star' />
                    <p><span>{rating ? Number(rating).toFixed(2) : '0'}</span></p>
                </div>
            </div>
            <div className='course-tile-footer'>
                <p>{`${getCurrencyFromLocale()} ${price}`}</p>
                {isEditable &&
                    <div className='edit-btns'>
                        <i onClick={handleEdit} className="fa fa-pencil" aria-hidden="true"></i>
                        <i onClick={handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
                    </div>
                }
            </div>
        </div>
    )
};

export default CourseTile;

CourseTile.defaultProps = {
    pricing: {
        IN: {}
    }
};