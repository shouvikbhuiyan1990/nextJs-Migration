import React, { useRef, useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import './index.css';

const Card = ({
    id,
    name,
    rating,
    description,
    profileUrl,
    remarks
}) => {
    const docRef = useRef('');

    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (docRef && docRef.current) {
            setWidth(docRef.current.clientWidth - 20);
        }
    }, []);

    const validURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    };

    const getProfileUrl = () => {
        return validURL(profileUrl) ? profileUrl : 'https://randomuser.me/api/portraits/lego/3.jpg';
    }

    return (
        <div className='expert-card' ref={docRef}>
            <Link className='clickable' to={`/teacher/${id}`}></Link>
            <div className='avatar-cont'>
                <div className='avatar' style={{ backgroundImage: `url(${getProfileUrl()})` }}></div>
            </div>
            <h4 className='title'>{name}</h4>
            <StarRatings
                rating={rating}
                starRatedColor="#ffbf00"
                numberOfStars={5}
                name='rating'
                starDimension='15px'
                starSpacing="2px"
            />
            <p className='skills' style={{ maxWidth: `${width}px` }}>{description}</p>
            <p className='job'>{remarks}</p>
        </div>
    )
}

export default Card;