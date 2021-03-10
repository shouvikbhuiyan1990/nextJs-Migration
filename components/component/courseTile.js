import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';

import { getCountryFromLocale, getCurrencyFromLocale } from '../../utils/helpers';


const Styles = styled.div`
.course-tile {
    border: 1px solid #e5e5e5;
    position: relative;
    border-radius: 0 0 4px 4px;
    margin: 0;
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    width: 100%;
}

.course-tile .editable-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
    z-index: 6;
    cursor: pointer;
}

.course-tile .edit-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.course-tile .edit-btns i:first-child {
    margin-right: 10px;
}

.course-tile .editable-overlay:hover {
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 60px;
}

.course-tile .course-tile-footer i {
    font-size: 1.4rem;
    color: #4a73e8;
    cursor: pointer;
}

.course-tile:first-child {
    margin-left: 0;
}

.course-details-link {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.course-tile-header {
    width: 100%;
    height: 180px;
    background-size: cover;
    background-color: #ddd;
}

img {
    max-width: 100%;
}

p {
    margin: 0;
}

.avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    background-color: #ddd;
}

.avata-container {
    display: flex;
    align-items: center;
    margin: 14px 0;
}

.avata-container+p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 50px;
}

.avata-container .name {
    margin-left: 12px;
}

.avata-container .name a {
    position: relative;
    z-index: 5;
}

.avata-container .name p:first-child {
    color: #404145;
}

.avata-container .name p:nth-child(2) {
    color: #95979d;
    font-size: 12px;
}

.course-tile-body, .course-tile-footer {
    padding: 8px 12px;
}

.course-tile-footer {
    border-top: 1px solid #e5e5e5;
}

.course-tile .course-tile-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.course-tile .course-tile-footer img {
    width: 16px;
    height: 16px;
}

.rating {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.rating img {
    width: 16px;
    height: 16px;
}

.rating p {
    margin: 0;
}

@media screen and (min-width: 760px) {}
`;

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
        <Styles>
            <div className='course-tile'>
                {
                    !isEditable && <Link href={`/courses/${courseId}`}>
                        <a className='course-details-link'></a>
                    </Link>
                }
                <div className='course-tile-header' style={{ backgroundImage: `url(${iconUrl || 'https://via.placeholder.com/250'})` }}>
                </div>
                <div className='course-tile-body'>
                    <div className='avata-container'>
                        <div style={{ backgroundImage: `url(${profileUrl || 'https://randomuser.me/api/portraits/lego/3.jpg'})` }} className='avatar'></div>
                        <div className='name'>
                            {blockTeacherRedirect && <p>{teacherName}</p>}
                            {!blockTeacherRedirect &&
                                <Link href={`/teacher/${teacherId}`}>
                                    <a><p>{teacherName}</p></a>
                                </Link>
                            }
                            <p>{subject}</p>
                        </div>
                    </div>
                    <p>{description}</p>
                    <div className='rating'>
                        <i className="fa fa-star" aria-hidden="true"></i>
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
        </Styles>
    )
};

export default CourseTile;

CourseTile.defaultProps = {
    pricing: {
        IN: {},
        US: {}
    }
};