import axios from 'axios';
import dayjs from 'dayjs';
import {
    API_BASE,
    GET_CALENDAR,
    LOADING_CALENDAR,
    CREATE_UI_FLEXIBLE_CALENDAR,
    UI_FLEXIBLE_CALENDAR_SELECTION,
    RESET_UI_FLEXIBLE_CALENDAR,
    BOOKING_IN_PROGRESS,
    RESET_BOOKING_FLOW,
    BOOKING_STATUS,
    PAYMENT_DETAILS,
    GET_MESSAGES,
    SEND_MESSAGES,
    MESSAGE_SEND_STATUS,
    LOADING_MESSAGES,
    GET_MESSAGES_WITH_ID,
    SET_ACTIVE_MESSAGE_THREAD,
    PAGE_LOADER
} from '../constant';
import isEmpty from 'lodash/isEmpty';
import { get } from 'lodash';

export const createFlexibleCalendar = (showOnlyAvailable) => {
    return dispatch => {
        dispatch({
            type: CREATE_UI_FLEXIBLE_CALENDAR,
            payload: showOnlyAvailable
        });
    }
}

export const resetBookingFlow = () => {
    return dispatch => {
        dispatch({
            type: RESET_BOOKING_FLOW
        });
    }
}

export const getAllMessages = (loginToken, id, name) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': loginToken
            }
        };

        const url = `${API_BASE}api/v1/common/fetch/messages`;

        dispatch({
            type: LOADING_MESSAGES,
            payload: true
        });
        try {
            // const response = await axios.get(`/api/calendar.json`, header);
            const { data } = await axios.get(url, header);

            if (!id) {
                dispatch({
                    type: GET_MESSAGES,
                    payload: data
                });
                dispatch(setActiveMessageThread());
            }
            else {
                dispatch({
                    type: GET_MESSAGES_WITH_ID,
                    payload: {
                        data,
                        id,
                        name
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        dispatch({
            type: LOADING_MESSAGES,
            payload: false
        });
    }
}

export const sendMessage = (loginToken, body) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': loginToken
            }
        };

        const url = `${API_BASE}api/v1/common/send/message`;

        dispatch({
            type: MESSAGE_SEND_STATUS,
            payload: 'loading'
        });
        try {
            const { data } = await axios.post(url, body, header);

            if (!isEmpty(data.error)) {
                dispatch({
                    type: MESSAGE_SEND_STATUS,
                    payload: 'error'
                });
            }
            else {
                dispatch({
                    type: SEND_MESSAGES,
                    payload: data
                });
                dispatch({
                    type: MESSAGE_SEND_STATUS,
                    payload: 'success'
                });
            }
        }
        catch (e) {
            dispatch({
                type: MESSAGE_SEND_STATUS,
                payload: 'error'
            });
        }
    }
}

export const resetUICalendar = () => {
    return dispatch => {
        dispatch({
            type: RESET_UI_FLEXIBLE_CALENDAR
        });
    }
}

export const setActiveMessageThread = (id) => {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_MESSAGE_THREAD,
            payload: { id }
        });
    }
}

export const selectTimeSlotInFlexibleCalendar = (dayIndex, dateIndex, duration) => {
    return dispatch => {
        dispatch({
            type: RESET_UI_FLEXIBLE_CALENDAR
        });
        dispatch({
            type: UI_FLEXIBLE_CALENDAR_SELECTION,
            payload: { dayIndex, dateIndex, duration }
        });
    }
}

export const getCalendar = (loginToken, teacherId) => {
    const apiStartTime = dayjs().toISOString();
    const apiEndTime = dayjs().add(10, 'day').endOf('day').toISOString();
    let url = '';
    return async dispatch => {
        dispatch({
            type: PAGE_LOADER,
            payload: true
        });
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': loginToken
            }
        };
        if (teacherId) {
            url = `${API_BASE}api/v1/student/fetch/slots?teacherId=${teacherId}&startTime=${apiStartTime}&endTime=${apiEndTime}`;
            // url = '/api/calendar.json';
        }
        else {
            url = `${API_BASE}api/v1/teacher/fetch/slots?startTime=${apiStartTime}&endTime=${apiEndTime}`;
        }

        dispatch({
            type: LOADING_CALENDAR,
            payload: true
        });
        try {
            // const response = await axios.get(`/api/calendar.json`, header);
            const { data } = await axios.get(url, header);
            dispatch({
                type: GET_CALENDAR,
                payload: data
            });

            if (isEmpty(data.error)) {
                dispatch(createFlexibleCalendar(!!teacherId));
            }
            else if (!isEmpty(data.error)) {
                dispatch(createFlexibleCalendar('error'));
            }
        }
        catch (e) {
            console.log(e);
        }

        dispatch({
            type: LOADING_CALENDAR,
            payload: false
        });
        dispatch({
            type: PAGE_LOADER,
            payload: false
        });
    }
};

export const updateCalendar = (loginToken, body, deleteFlow, deleteId) => {
    let bodyObject = {
        slots: []
    };
    bodyObject.slots.push({
        startTime: body.calendarSelectionStartTime,
        endTime: body.calendarSelectionEndTime
    });

    return async dispatch => {
        dispatch({
            type: LOADING_CALENDAR,
            payload: true
        });
        dispatch({
            type: PAGE_LOADER,
            payload: true
        });
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': loginToken
            }
        };
        let url = '';

        if (deleteFlow) {
            url = `${API_BASE}api/v1/teacher/delete/slots`;
            bodyObject = {
                slotIds: [deleteId]
            }
        }
        else {
            url = `${API_BASE}api/v1/teacher/create/slots`;
        }
        try {
            await axios.post(url, bodyObject, header);
            dispatch(getCalendar(loginToken));
        }
        catch (e) {
            console.log(e);
        }
        dispatch({
            type: LOADING_CALENDAR,
            payload: false
        });
        dispatch({
            type: PAGE_LOADER,
            payload: false
        });
    }
};

export const bookSlot = (loginToken, body) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': loginToken
            }
        };
        let url = '';
        dispatch({
            type: BOOKING_IN_PROGRESS,
            payload: true
        });
        dispatch({
            type: PAGE_LOADER,
            payload: true
        });

        dispatch({
            type: BOOKING_STATUS,
            payload: 'loading'
        });

        url = `${API_BASE}api/v1/student/create/booking`;

        try {
            const { data } = await axios.post(url, body, header);

            if (!isEmpty(data.error)) {
                dispatch({
                    type: BOOKING_STATUS,
                    payload: 'error'
                });
            }
            else {
                dispatch({
                    type: BOOKING_STATUS,
                    payload: 'success'
                });
                dispatch({
                    type: PAYMENT_DETAILS,
                    payload: get(data, 'data.paymentData', {})
                });
            }

            // dispatch(getCalendar(loginToken));
        }
        catch (e) {
            dispatch({
                type: BOOKING_STATUS,
                payload: 'error'
            });
            console.log(e);
        }
        dispatch({
            type: BOOKING_IN_PROGRESS,
            payload: false
        });
        dispatch({
            type: PAGE_LOADER,
            payload: false
        });
    }
};