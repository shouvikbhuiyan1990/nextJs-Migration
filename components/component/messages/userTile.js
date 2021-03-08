import React from 'react';
import dayjs from 'dayjs';

const UserTile = ({
    toggleMessageContent,
    bookingId,
    activeId,
    updated_at,
    chatAs,
    studentName,
    teacherName,
    studentImg,
    teacherImg
}) => {
    const getDetails = () => {
        if (chatAs === 'teacher') {
            return {
                name: studentName || '',
                image: studentImg || "https://randomuser.me/api/portraits/lego/3.jpg"
            };
        }
        else if (chatAs === 'student') {
            return {
                name: teacherName || '',
                image: teacherImg || "https://randomuser.me/api/portraits/lego/3.jpg"
            };
        }
        return {
            name: '',
            image: "https://randomuser.me/api/portraits/lego/3.jpg"
        };
    }
    return (
        <div className={`user-tile-msg ${activeId === bookingId ? 'active' : ''}`} onClick={() => toggleMessageContent(bookingId)}>
            <div className='avatar-holder'>
                <img className='avatar' src={getDetails().image} alt="user" />
            </div>
            <div className='user-info-id'>
                <div className='name-header'>
                    {getDetails().name && <p>{getDetails().name}</p>}
                    {!getDetails().name && <p>Booking Id: #{bookingId}</p>}
                    <p>{dayjs(updated_at).format('MMM DD')}</p>
                </div>
                {getDetails().name && <p>Booking Id: #{bookingId}</p>}
            </div>
        </div>
    )
}

export default UserTile;