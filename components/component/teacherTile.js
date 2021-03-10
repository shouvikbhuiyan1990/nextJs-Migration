import React, { useState } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import SharePage from '../common/sharePage';
import dayjs from 'dayjs';

const Styles = styled.div`
.teacher-details {
    flex: 1;
}


.teacher-details .fa.fa-map-marker {
    margin-right: 5px;
}

.box {
    padding: 10px;
    border: 1px solid #ddd;
}

ul {
    padding: 0;
}

.bordered-box ul li {
    padding: 10px 0;
}

.bordered-box ul li:last-child {
    padding-bottom: 0;
}

.bordered-box ul li i {
    font-size: 18px;
    width: 25px;
}

ul li {
    list-style: none;
}

.teacher-listing h2 {
    font-size: 16px;
    font-family: 'lato-bold';
    color: #404145;
    text-transform: capitalize;
}

.bordered-box {
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
}

.bordered-box:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.bordered-box:first-child {
    padding-top: 0;
}

.box:first-child {
    border-bottom: none;
    border-top: none;
    margin-bottom: 0;
}

.teacher-details .profile .head {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.teacher-details .profile .img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #ddd;
}

.teacher-details .profile img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.ratings {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
}

.teacher-details .ratings {
    justify-content: center;
}

.teacher-details .profile-head-info {
    text-align: center;
}

.name {
    text-transform: capitalize;
    font-family: 'lato-bold';
    padding: 12px 0 7px;
    color: #0e0e0f;
}

.teacher-details .profile .head p:nth-child(2) {
    color: #62646a;
}

.ratings>p {
    padding: 5px 0 0;
}

.user-stats {
    padding: 15px 0 0 0;
    border-top: 1px solid #ddd;
}

.align-stats:first-child {
    margin-bottom: 15px;
}

.align-stats:last-child {
    margin-bottom: 0;
}

.align-stats {
    display: FLEX;
    margin-bottom: 15px;
    align-items: center;
    justify-content: space-between;
}

.align-stats i {
    font-size: 18px;
    width: 25px;
}

.align-stats p:nth-child(2) {
    color: #62646a;
    font-family: 'lato-bold';
}

.additiona-desc-description {
    display: flex;
    flex-direction: column;
}

.additiona-desc-description.show-more-button p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
}

.additiona-desc-description button {
    align-self: center;
    background: none;
    border: none;
    color: #4a73e8;
    text-decoration: none;
    padding: 10px 0 0px;
    border-bottom: 1px solid #4a73e8;
    outline: none;
}

.additional-career-info .edu-tile p span.bold {
    font-family: 'lato-semibold';
}

.additional-career-info .edu-tile p:nth-child(2) {
    font-size: 14px;
}

.additional-career-info .edu-tile {
    margin: 10px 0;
}

.additional-career-info .edu-tile:first-child {
    margin-top: 0;
}

.additional-career-info .edu-tile:last-child {
    margin-bottom: 0;
}

@media screen and (min-width: 1025px) {
    .teacher-details .profile .head {
        flex-direction: row;
        margin-bottom: 30px;
    }
    .teacher-details .profile-head-info {
        margin-left: 30px;
        text-align: left;
    }
    .teacher-details .ratings {
        justify-content: flex-start;
    }
    .box {
        padding: 15px 30px;
        border: none;
    }
    .teacher-details {
        max-width: 640px;
        width: 60%;
    }
}
`;

const TeacherTile = ({
    name,
    profileUrl,
    rating,
    country,
    bestRated,
    description = '',
    linkedInUrl,
    otherLinks,
    remarks
}) => {
    const [showShareModal, setShareModalDisplay] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const startOdInustryExp = dayjs('2011-01-25');

    return (
        <Styles>
            <div className='teacher-details'>
                <SharePage
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    text={`Check out my profile in Conzult`}
                    subject='About my profile in Conzult'
                    show={showShareModal}
                    setDisplay={() => setShareModalDisplay(!showShareModal)}
                />
                <div className='box'>
                    <div className='profile'>
                        <div className='head'>
                            <div className='img' style={{ backgroundImage: `url(${profileUrl})` }}></div>
                            <div className='profile-head-info'>
                                <p className='name'>{name}</p>
                                <p>{remarks}</p>
                                <div className='ratings'>
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="#ffbf00"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension='15px'
                                        starSpacing="2px"
                                    />
                                    <p>{rating ? Number(Number(rating).toFixed(2)) : ''}</p>
                                </div>
                                <p><i className="fa fa-map-marker" aria-hidden="true"></i>{country}</p>
                            </div>
                            <button className='btn share-btn' onClick={() => setShareModalDisplay(!showShareModal)}>
                                <i className="fa fa-share-alt" aria-hidden="true"></i>
                                <span>share</span>
                            </button>
                        </div>
                        <div className='user-stats'>
                            <div className='align-stats'>
                                <p>
                                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                    <span>Best Rated Course</span>
                                </p>
                                <p>{bestRated}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box'>
                    <div className='additional-details'>
                        <div className={`bordered-box additiona-desc-description ${showMore ? 'show-more-button' : ''}`}>
                            <h2>description</h2>
                            <p>{description}</p>
                            {description && description.length > 200 &&
                                <button onClick={() => setShowMore(!showMore)}>
                                    {showMore ? 'View More' : 'View Less'}
                                </button>
                            }
                        </div>
                        <div className='bordered-box'>
                            <h2>{`Experience (${Math.abs(startOdInustryExp.diff(dayjs(), 'year'))}+ Years)`}</h2>
                            <div className='additional-career-info'>
                                <div className='edu-tile'>
                                    <p><span className='bold'>Senior UI Developer</span> at <span className='bold'>Publicis Groupe</span> from <span className='bold'>2014-Present</span></p>
                                </div>
                                <div className='edu-tile'>
                                    <p><span className='bold'>Consultant</span> at <span className='bold'>Deloitte</span> from <span className='bold'>2012-2014</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='bordered-box'>
                            <h2>Education</h2>
                            <div className='additional-career-info'>
                                <div className='edu-tile'>
                                    <p><span className='bold'>National Institute of Technology (2008-2012)</span></p>
                                    <p>Bachelor's Degree, Computer Science</p>
                                </div>
                                <div className='edu-tile'>
                                    <p><span className='bold'>Umakanta Academy</span></p>
                                    <p>2006-2008</p>
                                </div>
                            </div>
                        </div>
                        <div className='bordered-box'>
                            <h2>Language</h2>
                            <p>English</p>
                        </div>
                        {(linkedInUrl || otherLinks) &&
                            <div className='bordered-box'>
                                <h2>Linked Accounts</h2>
                                <ul>
                                    {linkedInUrl &&
                                        <li>
                                            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                                            <a href={linkedInUrl} target='_blank' rel='noopener noreferrer' >LinkedIn</a>
                                        </li>
                                    }
                                    {otherLinks &&
                                        <li>
                                            <i className="fa fa-link" aria-hidden="true"></i>
                                            <a href={otherLinks} target='_blank' rel='noopener noreferrer' >Other Links</a>
                                        </li>
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Styles>
    )
};

export default TeacherTile;