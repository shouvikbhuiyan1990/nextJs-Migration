import React from 'react';
import dayjs from 'dayjs';

const DateHolder = ({
    slots,
    selectTime,
    dayIndex,
    isBookingCalendar
}) => {
    let moringArr = [],
        afterNoonArr = [],
        eveningArr = [],
        nightArr = [];

    const getPills = (value, dateIndex) => {
        if (isBookingCalendar && value.timeRange) {
            return (
                <React.Fragment>
                    <div className={`slot-pill ${value.status}`}>
                        <span onClick={() => selectTime(dayIndex, dateIndex, value)}>{`${dayjs(value.timeRange.startTime).format('hh:mm')} - ${dayjs(value.timeRange.endTime).format('hh:mm')}`}</span>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <div className={`slot-pill ${value.status}`}>
                        <span onClick={() => selectTime(dayIndex, dateIndex, value)}>{dayjs(value.startTime).format('hh:mm')}</span>
                    </div>
                </React.Fragment>
            )
        }
    };

    const checkIfExceededCurrentTime = (time) => {
        const currentTime = dayjs();

        return currentTime > time;
    }

    const checkIfEmpty = () => {
        return !!(moringArr.length === 0 && afterNoonArr.length === 0 && eveningArr.length === 0 && nightArr.length === 0);
    }

    slots.forEach((value, index) => {
        let currentHour,
            time;
        if (isBookingCalendar && value.timeRange) {
            currentHour = dayjs(value.timeRange.startTime).format('H');
            time = dayjs(value.timeRange.startTime);
        }
        else {
            currentHour = dayjs(value.startTime).format('H');
            time = dayjs(value.startTime);
        }

        if (currentHour >= 0 && currentHour < 6 && !checkIfExceededCurrentTime(time)) {
            moringArr.push({ value, dateIndex: index });
        }
        if (currentHour >= 6 && currentHour < 12 && !checkIfExceededCurrentTime(time)) {
            afterNoonArr.push({ value, dateIndex: index });
        }
        if (currentHour >= 12 && currentHour < 18 && !checkIfExceededCurrentTime(time)) {
            eveningArr.push({ value, dateIndex: index });
        }
        if (currentHour >= 18 && currentHour < 24 && !checkIfExceededCurrentTime(time)) {
            nightArr.push({ value, dateIndex: index });
        }
    });

    return (
        <div className={`day-holder ${checkIfEmpty() ? 'no-date-cont' : ''} ${isBookingCalendar ? 'booking-flow' : ''}`}>
            {moringArr.length > 0 &&
                <div className='day-separator'>
                    <div className='day-time'>
                        <i className="fa fa-coffee" aria-hidden="true"></i>
                        <p>Late Night</p>
                    </div>
                    <div className='time-slots'>
                        {
                            moringArr.map((value, index) => getPills(value.value, value.dateIndex))
                        }
                    </div>
                </div>
            }
            {afterNoonArr.length > 0 &&
                <div className='day-separator'>
                    <div className='day-time'>
                        <i className="fa fa-sun-o" aria-hidden="true"></i>
                        <p>Morning</p>
                    </div>
                    <div className='time-slots'>
                        {
                            afterNoonArr.map((value, index) => getPills(value.value, value.dateIndex))
                        }
                    </div>
                </div>
            }
            {eveningArr.length > 0 &&
                <div className='day-separator'>
                    <div className='day-time'>
                        <i className="fa fa-apple" aria-hidden="true"></i>
                        <p>Afternoon</p>
                    </div>
                    <div className='time-slots'>
                        {
                            eveningArr.map((value, index) => getPills(value.value, value.dateIndex))
                        }
                    </div>
                </div>
            }
            {nightArr.length > 0 &&
                <div className='day-separator'>
                    <div className='day-time'>
                        <i className="fa fa-cutlery" aria-hidden="true"></i>
                        <p>Evening</p>
                    </div>
                    <div className='time-slots'>
                        {
                            nightArr.map((value, index) => getPills(value.value, value.dateIndex))
                        }
                    </div>
                </div>
            }
            {
                checkIfEmpty() &&
                <div className='no-date'>
                    <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                    <p>No Slots Available</p>
                </div>
            }
        </div>
    )
}

export default DateHolder;