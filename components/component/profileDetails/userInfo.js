import React from 'react';
import StarRatings from 'react-star-ratings';

const UserInfo = ({
    profileUrl,
    name,
    remarks,
    rating,
    slotTime,
    country,
    bestRated,
    editable,
    setEdit,
    isStudent
}) => {
    return (
        <React.Fragment>
            {editable &&
                <div className='edit-profile'>
                    <i onClick={setEdit} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                </div>
            }
            <div className='user-info-tile'>
                <div className='profile-head-info'>
                    <p className='name'>{name}</p>
                    <p className='remarks'>{remarks}</p>
                    {!editable && !isStudent &&
                        <div className='ratings'>
                            <StarRatings
                                rating={rating ? Number(Number(rating).toFixed(2)) : 0}
                                starRatedColor="#ffbf00"
                                numberOfStars={5}
                                name='rating'
                                starDimension='15px'
                                starSpacing="2px"
                            />
                            <p>{rating ? Number(Number(rating).toFixed(2)) : ''}</p>
                        </div>
                    }
                    {
                        editable && !isStudent &&
                        <div className='slot-time'>
                            {slotTime && <p>Slot Time: {slotTime} Minutes</p>}
                            {!slotTime && <p>Slot Time: Not Set</p>}
                        </div>
                    }
                    <p><i className="fa fa-map-marker" aria-hidden="true"></i>{country}</p>
                    {bestRated && <p><i className="fa fa-heart" aria-hidden="true"></i>{bestRated}</p>}
                </div>
                <div className='img' style={{ backgroundImage: `url(${profileUrl})` }}></div>
            </div>
        </React.Fragment>)
}

export default UserInfo;