import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
.confirmation-tile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
    min-height: 600px;
}

.confirmation-tile i {
    font-size: 100px;
    color: #1dbf73;
    margin-bottom: 10px;
}

.confirmation-tile i+p {
    font-size: 1.6rem;
    margin-bottom: 10px;
}

.confirmation-tile a {
    border-bottom: 1px solid;
    padding-bottom: 5px;
    color: #0056b3;
}

.confirmation-tile a:hover {
    text-decoration: none;
}
`;

const Confirmation = () => {

    return (
        <Styles>
            <div className='confirmation-tile'>
                <i className="fa fa-trophy" aria-hidden="true"></i>
                <p>Booking Successfull</p>
                <p>You can <Link href={`/`}>browse through our cources</Link> and book more available slots</p>
                <p><a target="_blank" rel="noopener noreferrer" href={sessionStorage.getItem('calendarLink')}>See Your Booking in the Calendar</a></p>
            </div>
        </Styles>
    )
}

export default Confirmation;