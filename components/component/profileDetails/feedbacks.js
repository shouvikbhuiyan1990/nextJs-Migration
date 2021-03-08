import React from 'react';
import StarRatings from 'react-star-ratings';

const Feedbacks = ({
    feedbacks
}) => {

    return (
        <div className='user-feedbacks'>
            <div className='feedback-head'>
                <div className='inner'>
                    <div className='cont centered-with-space'>
                        <h2 className='bold'>EXCELLENT</h2>
                        <p>
                            <span className='bold'>5</span> Average
                    </p>
                    </div>
                    <div className='cont centered-with-space'>
                        <StarRatings
                            rating={5}
                            starRatedColor="#ffbf00"
                            numberOfStars={5}
                            name='rating'
                            starDimension='30px'
                            starSpacing="2px"
                        />
                        <p><span className='bold'>3</span> Reviews</p>
                    </div>
                </div>
            </div>
            <div className='feedback-body'>
                {
                    feedbacks.map((item) => <div className='feed-tile'>
                        <div className='head centered-with-space'>
                            <h2>Iron Man</h2>
                            <StarRatings
                                rating={item.rating}
                                starRatedColor="#ffbf00"
                                numberOfStars={5}
                                name='rating'
                                starDimension='20px'
                                starSpacing="2px"
                            />
                        </div>
                        <div className='body'>
                            <p>{item.feedback}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Feedbacks;