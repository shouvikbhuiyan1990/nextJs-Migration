import React from 'react';
import dayjs from 'dayjs';
import ReactTooltip from 'react-tooltip';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Styles = styled.div`
.event-tile {
    display: flex;
    flex-direction: column;
    -webkit-box-shadow: 4px 5px 16px 1px rgb(0 0 0 / 35%);
    box-shadow: 4px 5px 16px 1px rgb(0 0 0 / 35%);
    margin-bottom: 25px;
}

.event-tile .date {
    background-color: #fff;
}

.event-tile .date p:first-child {
    font-size: 2rem;
    line-height: 1.1;
}

.event-tile .date p:last-child {
    text-transform: uppercase;
}

.event-tile .date {
    padding: 1rem 2.2rem;
    font-family: 'lato-bold';
    color: #fff;
    text-align: center;
    min-width: 175px;
}

.event-tile .info {
    padding: 1rem 1.2rem 1.8rem;
    display: flex;
    flex: 1;
}

.event-tile .info .content {
    border-right: 1px solid #ddd;
    flex: 1;
}

.event-tile .info .content p {
    margin-bottom: 8px;
}

.event-tile .info .content p:first-child {
    font-family: 'lato-bold';
    margin-bottom: 2px;
}

.event-tile .info .content p:nth-child(2) {
    text-transform: capitalize;
}

.event-tile .info .content p:last-child {
    margin-bottom: 0;
    white-space: break-spaces;
}

.event-tile .info .message {
    padding-left: 1.2rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: center;
}

.upcoming .event-tile .info .message a {
    text-decoration: none;
    font-size: 1.2rem;
}

.event-tile .date p:last-child {
    font-size: 1.4rem;
}

@media screen and (min-width: 968px) {
    .event-tile {
        display: flex;
        flex-direction: row;
    }
    .event-tile .info {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}

@media screen and (min-width: 1025px) {
    .event-tile .info {
        padding: 0.6rem 2.2rem 1.1rem;
    }
    .event-tile .info .message {
        padding-left: 2rem;
    }
}`;

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
    const router = useRouter();

    const gotoMessages = () => {
        router.push(`/dashboard/messages?id=${id}&user=${"Teacher Name"}`)
    }

    return (
        <Styles>
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
        </Styles>
    )
}

export default EventsTile;