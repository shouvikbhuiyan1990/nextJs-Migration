import React from 'react';
import dayjs from 'dayjs';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';

import './index.css';

const EventsTile = ({
    pastTile,
    endTime,
    startTime,
    bookingType,
    id,
    course: {
        subject
    },
    metadata: {
        meetLink
    }
}) => {
    const history = useHistory();

    const gotoMessages = () => {
        history.push(`/dashboard/messages?id=${id}&user=${"Teacher Name"}`)
    }

    return (
        <div className='event-tile'>
            <ReactTooltip />
            <div className='date'>
                <p>{dayjs(startTime).format('DD')}</p>
                {pastTile && <p>{dayjs(startTime).format('MMM')}, {dayjs(startTime).format('YYYY')}</p>}
                {!pastTile && <p>{dayjs(startTime).format('MMM')}</p>}
            </div>
            <div className='info'>
                <div className='content'>
                    <p>{subject}</p>
                    <p>Course Type: {bookingType}</p>
                    {!pastTile &&
                        <p>
                            Event scheduled on <span className='bold'>{dayjs(startTime).format('DD/MM/YYYY hh:mma')}</span>
                        </p>
                    }
                    {
                        pastTile &&
                        <p>
                            Event completed on <span className='bold'>{dayjs(endTime).format('DD/MM/YYYY hh:mma')}</span>
                        </p>
                    }
                </div>
                <div className='message'>
                    {pastTile && <i onClick={gotoMessages} className="fa fa-envelope-o" aria-hidden="true" data-tip="You can drop a note for the host"></i>}
                    {!pastTile &&
                        <a data-tip="Join Meeting" href={meetLink} target='_blank' rel='noopener noreferrer'>
                            Join
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default EventsTile;