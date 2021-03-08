import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import cookie from '../../../utils/cookie'

import './profilePage.css';

const UserInfo = ({
    isTeacher,
    isGuest
}) => {
    const imageUrl = useSelector(state => state.joinModal.googleSignupProfile.imageUrl);
    const profileImageUrl = useSelector(state => state.registration.profileImageUrl);
    return (
        <div className='user-info'>
            <div className='avatar' style={{ backgroundImage: `url(${profileImageUrl || imageUrl || cookie.get('profileImageUrl')[0]})` }}></div>
            <div className='links'>
                <NavLink to='/dashboard/feeds' activeclassName='active'>Feeds</NavLink>
                {!isGuest &&
                    <NavLink to='/dashboard' exact activeclassName='active'>Profile</NavLink>
                }
                <NavLink to='/events' activeclassName='active'>Events</NavLink>
                {isTeacher &&
                    <NavLink to='/dashboard/accounts' activeclassName='active'>Accounts</NavLink>
                }
                {isTeacher &&
                    <NavLink to='/dashboard/courses' activeclassName='active'>Courses</NavLink>
                }
                {isTeacher &&
                    <NavLink to='/dashboard/calendar' activeclassName='active'>Calendar</NavLink>
                }
                <NavLink to='/dashboard/messages' activeclassName='active'>Messages</NavLink>
            </div>
        </div>
    )
}

export default UserInfo;