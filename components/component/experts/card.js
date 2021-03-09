import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import Link from 'next/link';

const Styles = styled.div`
.expert-card {
    border: 1px solid #e5e5e5;
    text-align: center;
    padding: 10px 12px;
    border-radius: 0 0 4px 4px;
    -webkit-box-shadow: 0 0 5px 1px rgb(0 0 0 / 5%);
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 5%);
    position: relative;
}

.expert-card .clickable {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
}

.expert-card h4.title {
    margin-bottom: 2px;
}

.expert-card p.skills {
    padding: 6px 0;
}

.expert-card p.job {
    padding: 4px 0 0;
}

.expert-card .avatar-cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.2rem 0;
}

.expert-card .avatar-cont .avatar {
    width: 150px;
    height: 150px;
}

.expert-card p.skills {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
`;

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
        <Styles>
            <div className='expert-card' ref={docRef}>
                <Link href={`/teacher/${id}`}><a className='clickable'></a></Link>
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
        </Styles>
    )
}

export default Card;