import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
    GET_CALENDAR,
    LOADING_CALENDAR,
    CREATE_UI_FLEXIBLE_CALENDAR,
    RESET_UI_FLEXIBLE_CALENDAR,
    UI_FLEXIBLE_CALENDAR_SELECTION,
    SEND_MESSAGES,
    MESSAGE_SEND_STATUS,
    BOOKING_IN_PROGRESS,
    BOOKING_STATUS,
    PAYMENT_DETAILS,
    RESET_BOOKING_FLOW,
    UPDATE_TEACHER_SLOT_TIME_SELECTION,
    SET_ACTIVE_MESSAGE_THREAD,
    GET_MESSAGES_WITH_ID,
    GET_MESSAGES,
    LOADING_MESSAGES
} from '../constant';
import {
    CALENDAR_STORAGE_TEACHER,
    STATUS_BOOKED,
    STATUS_AVAILABLE,
    STATUS_HOLD,
    STATUS_DEFAULT
} from '../../components/common/calendar/constants';
import dayjs from 'dayjs';

const initialState = {
    availableData: [],
    loadingCalendar: false,
    totalNoOfDaysdata: [],
    calendarSelectionStartTime: '',
    calendarSelectionEndTime: '',
    calendarFecthError: false,
    calendarSelectionError: false,
    teacherSlotTime: 0,
    teacherSlotTimeDivider: 4,
    selectedSlotId: '',
    bookingStatus: '',
    messageStatus: '',
    bookingInProgress: false,
    messages: [],
    isLoadingMessages: false,
    activeMessage: [],
    paymentDetails: {}
};

const getStoredCalendarSession = () => {
    return JSON.parse(sessionStorage.getItem(CALENDAR_STORAGE_TEACHER));
}

const selectTimeForAvailability = (dayIndex, dateIndex, totalNoOfDaysdata, duration) => {
    let timeJson = totalNoOfDaysdata.slice(),
        defaultDuration = 0,
        selectedSlotId = timeJson[dayIndex]['slots'][dateIndex].id || 0,
        selectedTile = timeJson[dayIndex]['slots'][dateIndex],
        prevStatus = timeJson[dayIndex]['slots'][dateIndex].status,
        updateState = true,
        startTimeForStrage,
        endTimeForStrage;

    if (selectedTile.status === STATUS_AVAILABLE) {
        let j = 1,
            currentSlot,
            selectedIndex = dateIndex;
        while (defaultDuration < duration) {
            currentSlot = timeJson[dayIndex]['slots'][dateIndex + defaultDuration];
            if (currentSlot && (selectedTile.id === currentSlot.id)) {
                currentSlot.status = STATUS_HOLD;
                endTimeForStrage = currentSlot && currentSlot.timeRange ? currentSlot.timeRange.endTime : currentSlot.endTime;
            }
            else {
                currentSlot = timeJson[dayIndex]['slots'][selectedIndex - j];
                if (currentSlot && (selectedTile.id === currentSlot.id)) {
                    currentSlot.status = STATUS_HOLD;

                    endTimeForStrage = currentSlot && currentSlot.timeRange ? currentSlot.timeRange.endTime : currentSlot.endTime;
                    j++;
                }
            }
            defaultDuration++;
        }
        startTimeForStrage = timeJson[dayIndex]['slots'][selectedIndex] && timeJson[dayIndex]['slots'][selectedIndex].timeRange ? timeJson[dayIndex]['slots'][selectedIndex].timeRange.startTime : timeJson[dayIndex]['slots'][selectedIndex].startTime;
    }
    else {
        while (defaultDuration < duration) {
            const currentSlot = timeJson[dayIndex]['slots'][dateIndex + defaultDuration];
            if (currentSlot && currentSlot.status !== STATUS_BOOKED && (prevStatus === currentSlot.status)) {
                prevStatus = currentSlot.status;
                currentSlot.status = STATUS_HOLD;
                if (defaultDuration === 0) {
                    startTimeForStrage = currentSlot.startTime;
                }
                endTimeForStrage = currentSlot.endTime
            }
            else {
                updateState = false;
            }
            defaultDuration++;
        }
    }

    return { timeJson, updateState, startTimeForStrage, endTimeForStrage, selectedSlotId };

}

const checkIfSlotAvailable = (slot, availableData) => {
    return availableData.filter((value) => {
        return (dayjs(slot.startTime) >= dayjs(value.startTime) && dayjs(slot.endTime) <= dayjs(value.endTime))
    });
}

const createDateMapping = (noOfDaysOfdata = 10, availableData, showOnlyAvailable, duration) => {
    let totalNoOfDaysdata = [];

    for (let i = 0; i < noOfDaysOfdata; i++) {
        let initTime = dayjs().add(i, 'day').startOf('day'),
            len = 0,
            dateObj = {},
            tempArray = [];

        const daysSlotObj = {
            slots: []
        };
        while (len < 96) {
            dateObj = {};
            initTime = dayjs(initTime).toISOString();
            dateObj.startTime = initTime;
            initTime = dayjs(initTime).add(15, 'minutes');
            dateObj.endTime = initTime.toISOString();
            let slotAvailability = checkIfSlotAvailable(dateObj, availableData);

            if (!showOnlyAvailable) {
                if (!slotAvailability.length) {
                    dateObj.status = STATUS_DEFAULT;
                }
                else if (!!slotAvailability.length) {
                    dateObj.status = slotAvailability[0].status;
                    dateObj.eventId = slotAvailability[0].eventId;
                    dateObj.id = slotAvailability[0].id;
                }
            }
            else if (showOnlyAvailable && !!slotAvailability.length && slotAvailability[0].status === STATUS_AVAILABLE) {
                dateObj.status = slotAvailability[0].status;
                dateObj.eventId = slotAvailability[0].eventId;
                dateObj.id = slotAvailability[0].id;
                if (tempArray.length === 0) {
                    tempArray.push(dateObj);
                }
                else if (tempArray[0].id === slotAvailability[0].id && dayjs(slotAvailability[0].startTime) >= dayjs()) {
                    tempArray.push(dateObj);
                }
                else if (tempArray[0].id !== slotAvailability[0].id) {
                    tempArray.length = 0;
                    tempArray.push(dateObj);
                }
            }
            else if (showOnlyAvailable) {
                dateObj = {};
            }
            if (!isEmpty(dateObj) && !showOnlyAvailable) {
                daysSlotObj.slots.push(dateObj);
            }
            else if (!isEmpty(dateObj) && showOnlyAvailable && tempArray.length === duration) {
                const timeRange = {
                    id: tempArray[0].id,
                    eventId: tempArray[0].eventId,
                    status: tempArray[0].status,
                    timeRange: {
                        startTime: tempArray[0].startTime,
                        endTime: tempArray[3].endTime
                    }
                };
                daysSlotObj.slots.push(timeRange);
            }
            len++;
        }
        totalNoOfDaysdata.push(daysSlotObj);
    }

    sessionStorage.setItem(CALENDAR_STORAGE_TEACHER, JSON.stringify(totalNoOfDaysdata));

    return totalNoOfDaysdata;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_UI_FLEXIBLE_CALENDAR: {
            if (action.payload !== 'error') {
                return {
                    ...state,
                    totalNoOfDaysdata: createDateMapping(undefined, state.availableData, action.payload, state.teacherSlotTimeDivider),
                    calendarSelectionError: false,
                    calendarSelectionStartTime: '',
                    calendarSelectionEndTime: '',
                    calendarFecthError: false,
                    selectedSlotId: ''
                }
            }
            else {
                sessionStorage.setItem(CALENDAR_STORAGE_TEACHER, JSON.stringify([]));
                return {
                    ...state,
                    totalNoOfDaysdata: [],
                    calendarFecthError: true,
                    calendarSelectionError: false,
                    calendarSelectionStartTime: '',
                    calendarSelectionEndTime: '',
                    selectedSlotId: ''
                }
            }
        }
        case RESET_UI_FLEXIBLE_CALENDAR: {
            return {
                ...state,
                totalNoOfDaysdata: getStoredCalendarSession(),
                calendarSelectionError: false,
                calendarSelectionStartTime: '',
                calendarSelectionEndTime: '',
                selectedSlotId: ''
            }
        }
        case UI_FLEXIBLE_CALENDAR_SELECTION: {
            const { dayIndex, dateIndex, duration } = action.payload;
            const { timeJson, updateState, startTimeForStrage, endTimeForStrage, selectedSlotId } = selectTimeForAvailability(dayIndex, dateIndex, state.totalNoOfDaysdata, duration);
            if (updateState) {
                return {
                    ...state,
                    totalNoOfDaysdata: timeJson,
                    calendarSelectionStartTime: startTimeForStrage,
                    calendarSelectionEndTime: endTimeForStrage,
                    calendarSelectionError: false,
                    selectedSlotId
                }
            }
            else {
                return {
                    ...state,
                    calendarSelectionError: true,
                    totalNoOfDaysdata: getStoredCalendarSession(),
                    calendarSelectionStartTime: '',
                    calendarSelectionEndTime: '',
                }
            }
        }
        case LOADING_CALENDAR: {
            return {
                ...state,
                loadingCalendar: action.payload
            }
        }
        case BOOKING_IN_PROGRESS: {
            return {
                ...state,
                bookingInProgress: action.payload
            }
        }
        case BOOKING_STATUS: {
            return {
                ...state,
                bookingStatus: action.payload
            }
        }
        case PAYMENT_DETAILS: {
            const details = {
                CHECKSUMHASH: get(action, 'payload.checksum'),
                ...get(action, 'payload.params', {})
            };

            return {
                ...state,
                paymentDetails: details
            }
        }
        case RESET_BOOKING_FLOW: {
            return {
                ...state,
                bookingInProgress: false,
                bookingStatus: ''
            }
        }
        case UPDATE_TEACHER_SLOT_TIME_SELECTION: {
            return {
                ...state,
                teacherSlotTime: action.payload ? Number(action.payload) : state.teacherSlotTime,
                teacherSlotTimeDivider: action.payload ? Math.floor(Number(action.payload) / 15) : state.teacherSlotTimeDivider
            }
        }
        case GET_CALENDAR: {
            return {
                ...state,
                availableData: action.payload.slots
            }
        }
        case GET_MESSAGES: {
            return {
                ...state,
                messages: get(action.payload, 'data')
            }
        }
        case GET_MESSAGES_WITH_ID: {
            let messages = get(action.payload, 'data.data', []);
            let filteredMessages = messages.filter((item) => item.bookingId === Number(get(action.payload, 'id')));

            if (filteredMessages.length === 0) {
                const messagObj = {
                    bookingId: Number(get(action.payload, 'id')),
                    teacherName: get(action.payload, 'name'),
                    chats: []
                };
                messages.push(messagObj);
                filteredMessages.push(messagObj);
            }

            return {
                ...state,
                messages: messages,
                activeMessage: filteredMessages
            }
        }
        case LOADING_MESSAGES: {
            return {
                ...state,
                isLoadingMessages: action.payload
            }
        }
        case SET_ACTIVE_MESSAGE_THREAD: {
            let active = [];
            if (action.payload.id && state.messages.length > 0) {
                active = state.messages.filter((item) => {
                    return item.bookingId === action.payload.id;
                })
            }
            else if (state.messages.length > 0) {
                active = state.messages
            }
            return {
                ...state,
                activeMessage: active
            }
        }
        case MESSAGE_SEND_STATUS: {
            return {
                ...state,
                messageStatus: action.payload
            }
        }
        case SEND_MESSAGES: {
            return {
                ...state,
                activeMessage: [get(action.payload, 'data')]
            }
        }
        default:
            return state
    }
}