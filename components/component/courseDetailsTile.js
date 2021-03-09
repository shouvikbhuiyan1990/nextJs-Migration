import React, { useState } from 'react';
import Link from 'next/link';
import styles from 'styled-components';
import StarRatings from 'react-star-ratings';
import SharePage from '../common/sharePage';

const Styled = styles.div`
.teacher-info, .t-icon {
    display: flex;
    align-items: center;
}

.teacher-info {
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
}

.t-icon p {
    max-width: 100px;
    margin-left: 8px;
    color: #404145;
    font-family: 'lato-semibold';
}

.cr-details-tile {
    max-width: 800px;
}

.cr-details-tile h2 {
    font-family: 'lato-bold';
    color: #404145;
    font-size: 28px;
    padding-bottom: 16px;
    margin: 0 10px;
}

.cr-details-tile .img {
    padding: 20px 0 0;
}

.cr-details-tile h4 {
    padding: 25px 10px 14px;
    font-size: 20px;
    font-family: 'lato-semibold';
}

.cr-details-tile p.description {
    padding: 0 10px;
}

.share-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 14px 0 4px;
}

.btn.share-btn {
    align-self: flex-end;
}

.cr-details-tile .course-image {
    width: 100%;
    min-height: 400px;
    max-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
}

@media screen and (min-width: 968px) {
    .share-info {
        align-items: center;
        flex-direction: row;
    }
    .teacher-info {
        width: 70%;
    }
}

@media screen and (min-width: 1025px) {
    .cr-details-tile {
        min-width: 740px;
        max-width: 800px;
    }
    .cr-details-tile h4 {
        padding: 25px 0 14px;
    }
    .cr-details-tile p.description {
        padding: 0;
    }
    .teacher-info {
        padding: 0;
        width: 35%;
        max-width: 350px;
    }
    .cr-details-tile h2 {
        margin: 0;
    }
    .cr-details-tile .course-image {
        margin-top: 80px;
    }
    .cr-details-tile .img {
        margin-top: 80px;
        max-width: 350px;
    }
    .share-info {
        position: absolute;
        width: 100%;
        padding: 0;
        padding-right: 76px;
    }
}
`;

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
        <Styled>
            <div className='cr-details-tile'>
                <SharePage
                    url={typeof window!=='undefined' ? window.location.href : ''}
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
                            <Link href={`/teacher/${teacherId}`}><a><p>{teacherName}</p></a></Link>
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
                <div className='course-image' style={{ backgroundImage: `url(${iconUrl || 'https://randomuser.me/api/portraits/lego/3.jpg'})` }}></div>
                <h4>About this course</h4>
                <p className='description'>{description}</p>
            </div>
        </Styled>
    )
};

export default CourseDetailsTile;