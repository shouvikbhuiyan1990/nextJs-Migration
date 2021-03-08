import React from 'react';

const IndMessages = ({
    profile,
    text,
    from,
    studentName,
    teacherName,
    studentImg,
    teacherImg
}) => {
    const getDetails = () => {
        if (from === 0) {
            return {
                name: studentName || 'Anonymus',
                image: studentImg || profile
            };
        }
        else if (from === 1) {
            return {
                name: teacherName || 'Anonymus',
                image: teacherImg || profile
            };
        }
    }
    return (
        <div className='ind-messages'>
            <div className='avatar-hold'>
                <img className="avatar" src={getDetails().image} alt="user" ></img>
            </div>
            <div className='body'>
                <p className="bold">{getDetails().name}</p>
                <p className="content">{text}</p>
            </div>
        </div>
    )
}

export default IndMessages;