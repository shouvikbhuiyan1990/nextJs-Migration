import React from 'react';
import { Link } from 'react-router-dom';

import './confirm.css';

const Confirmation = () => {

    return (
        <div className='confirmation-tile'>
            <i className="fa fa-trophy" aria-hidden="true"></i>
            <p>Booking Successfull</p>
            <p>You can <Link to={`/`}>browse through our cources</Link> and book more available slots</p>
            <p><a target="_blank" rel="noopener noreferrer" href={sessionStorage.getItem('calendarLink')}>See Your Booking in the Calendar</a></p>
        </div>
    )
}

export default Confirmation;