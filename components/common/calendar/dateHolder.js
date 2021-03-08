import React from 'react';
import dayjs from 'dayjs';
import {
    STATUS_AVAILABLE
} from './constants';


var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const DateHolder = ({
    currentDate,
    slots,
    hourMapping,
    isBookingCalendar
}) => {
    const getAvailableSlotsPerday = () => {
        const slotsInMicro = slots.filter((value) => value.status === STATUS_AVAILABLE).length;
        if (isBookingCalendar) {
            return slotsInMicro;
        }
        return Math.floor(slotsInMicro / hourMapping);
    }

    const checkIfRecentDate = () => {
        if (dayjs(currentDate).isSame(dayjs(), 'day')) {
            return 'Today';
        }
        else if (dayjs(currentDate).isSame(dayjs().add(1, 'days'), 'day')) {
            return 'Tomorrow';
        }
        return '';
    }

    return (
        <div className='date-holder'>
            <p>{checkIfRecentDate(currentDate) ? checkIfRecentDate(currentDate) : dayjs(currentDate).format('dddd')}</p>
            <p>{dayjs(currentDate).format('ll')}</p>
            <p className='slot-availability'>{`${getAvailableSlotsPerday()} Slots Available`}</p>
        </div>
    )
}

export default DateHolder;