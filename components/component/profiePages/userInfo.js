import React from 'react';
import ActiveLink from '../../common/activeLink';
import { useSelector } from "react-redux";
import cookie from '../../../utils/cookie'
import styled from 'styled-components';

const Styles = styled.div`
.user-info {
    display: flex;
    border: 1px solid #ddd;
    background-color: #fff;
    margin-bottom: 25px;
    padding: 20px 15px;
    flex: 1;
    max-width: 300px;
    min-width: 300px;
    justify-content: space-between;
    align-self: flex-start;
    margin: 30px auto;
}

.student-profile a:not([href]):not([class]) {
    text-decoration: underline;
}

.profile-info .btn-holder button:first-child {
    margin-right: 10px;
}

.profile-info .additional-info-box .bordered-box select {
    max-width: 300px;
}

.profile-info .btn-holder {
    margin-bottom: 10px;
}

.edit-course-modal .image-preview {
    width: 100%;
    background-size: cover;
    height: 200px;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    background-color: #ddd;
}

.pending-info ul {
    padding-left: 45px;
}

.pending-info ul li {
    list-style: circle;
}

.profile-info {
    position: relative;
}

.profile-info .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.6);
    z-index: 3;
}

.user-info .avatar, .profile-info .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ddd;
}

.profile-info .headings {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.profile-info .headings i {
    font-size: 16px;
    margin-left: 8px;
    cursor: pointer;
}

.profile-info .img-info {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #ddd;
}

.profile-info .additional-info-box h2 {
    font-size: 16px;
    font-family: 'lato-bold';
    color: #404145;
    text-transform: capitalize;
}

.profile-info .additional-info-box .bordered-box {
    padding: 20px 25px;
}

.user-info .links {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
}

.user-info .links a {
    color: #1dbf73;
    text-decoration: none;
    padding: 0 0 6px;
    border-bottom: 1px solid #37AD1C;
}

.user-info .links a.active {
    color: #9C15A9;
    border-color: #9C15A9;
}

.user-info .links a:last-child:not(.active) {
    border-bottom: none;
}

.user-details-section {
    padding: 0 30px;
    flex: 1;
    min-height: 100vh;
}

.img-heading i {
    width: 20px;
    height: 20px;
    display: inline-block;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    align-self: flex-start;
    margin-top: 15px;
}

.user-courses {
    flex: 1;
    max-width: 1024px;
    padding: 0 30px;
    position: relative;
}

.user-courses .course-tile {
    margin: 0 10px;
    width: auto;
}

.user-courses .no-course {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 412px;
    background-color: #ddd;
    color: #404145;
    font-size: 4rem;
    cursor: pointer;
}

.delete-modal .modal-title.h4 {
    font-size: 1.2rem;
}

.delete-modal .modal-header .close {
    display: none;
}

.delete-modal .modal-footer {
    border: none;
}

.user-courses .loader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.4);
    bottom: 0;
    z-index: 9;
}

.user-courses .active-head {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.user-courses .active {
    margin-bottom: 50px;
}

.user-courses .new-course {
    max-width: 300px;
    height: 400px;
    border: 1px solid #e5e5e5;
    position: relative;
    border-radius: 0 0 4px 4px;
    margin: 20px auto;
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
}

.img-heading .fileUpload {
    height: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
}

.edit-course-modal .form-file>.invalid-tooltip {
    position: static;
}

.edit-course-modal .form-file>input {
    color: transparent;
}

@media screen and (min-width: 1025px) {
    .user-info {
        margin-top: 0;
        margin-left: 0;
        width: 10%;
        position: sticky;
        top: 100px;
    }
    .user-details-section {
        width: 80%;
    }
    .user-courses .active-head {
        flex-direction: row;
    }
    .user-courses .no-course {
        margin-left: 0;
    }
}`;

const UserInfo = ({
    isTeacher,
    isGuest
}) => {
    const imageUrl = useSelector(state => state.joinModal.googleSignupProfile.imageUrl);
    const profileImageUrl = useSelector(state => state.registration.profileImageUrl);
    return (
        <Styles>
            <div className='user-info'>
                <div className='avatar' style={{ backgroundImage: `url(${profileImageUrl || imageUrl || cookie.get('profileImageUrl')[0]})` }}></div>
                <div className='links'>
                    <ActiveLink href='/dashboard/feeds' activeClassName='active'><a>Feeds</a></ActiveLink>
                    {!isGuest &&
                        <ActiveLink href='/dashboard' exact activeClassName='active'><a>Profile</a></ActiveLink>
                    }
                    <ActiveLink href='/events' activeClassName='active'><a>Events</a></ActiveLink>
                    {isTeacher &&
                        <ActiveLink href='/dashboard/accounts' activeClassName='active'><a>Accounts</a></ActiveLink>
                    }
                    {isTeacher &&
                        <ActiveLink href='/dashboard/courses' activeClassName='active'><a>Courses</a></ActiveLink>
                    }
                    {isTeacher &&
                        <ActiveLink href='/dashboard/calendar' activeClassName='active'><a>Calendar</a></ActiveLink>
                    }
                    <ActiveLink href='/dashboard/messages' activeClassName='active'><a>Messages</a></ActiveLink>
                </div>
            </div>
        </Styles>
    )
}

export default UserInfo;