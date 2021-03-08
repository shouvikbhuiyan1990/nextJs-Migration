import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import SharePage from '../common/sharePage';
import dayjs from 'dayjs';

import './teacherTile.css';

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
        <div className='teacher-details'>
            <SharePage
                url={window.location.href}
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
    )
};

export default TeacherTile;