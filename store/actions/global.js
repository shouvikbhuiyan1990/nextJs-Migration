import {
    PAGE_LOADER,
    SHOW_FEEDBACK,
    TOGGLE_FEEDBACK,
    FEEDBACK_STATUS,
    GET_NOTIFICATIONS,
    GET_SUGGESTIONS,
    GET_SEARCH_RESULTS,
    GET_EVENTS,
    GET_EVENT_STATUS,
    SEARCH_PAGE_LOADING,
    EXPERTS_LIST_LOADING,
    GET_EXPERTS_LIST,
    API_BASE
} from '../constant';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

export const getOurExperts = (text, tag) => {
    return async dispatch => {
        const url = `${API_BASE}api/v1/home/teachers/list`;
        dispatch({
            type: EXPERTS_LIST_LOADING,
            payload: true
        });

        try {
            const { data } = await axios.get(url);

            if (isEmpty(data.error)) {
                dispatch({
                    type: GET_EXPERTS_LIST,
                    payload: {
                        results: get(data, 'teachers', []),
                        error: false
                    }
                });
            }
            else {
                dispatch({
                    type: GET_EXPERTS_LIST,
                    payload: {
                        results: [],
                        error: true
                    }
                });
            }
            dispatch({
                type: EXPERTS_LIST_LOADING,
                payload: false
            });
        }
        catch (e) {
            dispatch({
                type: GET_EXPERTS_LIST,
                payload: {
                    results: [],
                    error: true
                }
            });
            dispatch({
                type: EXPERTS_LIST_LOADING,
                payload: false
            });
        }
    }
}

export const getSearchResults = (text, tag) => {
    return async dispatch => {
        const url = `${API_BASE}api/v1/home/search?value=${text}&tag=${tag}`;
        dispatch({
            type: SEARCH_PAGE_LOADING,
            payload: true
        });

        try {
            const { data } = await axios.get(url);

            if (isEmpty(data.error)) {
                dispatch({
                    type: GET_SEARCH_RESULTS,
                    payload: {
                        results: get(data, 'courses', []),
                        error: false
                    }
                });
            }
            else {
                dispatch({
                    type: GET_SEARCH_RESULTS,
                    payload: {
                        results: [],
                        error: true
                    }
                });
            }
            dispatch({
                type: SEARCH_PAGE_LOADING,
                payload: false
            });
        }
        catch (e) {
            dispatch({
                type: GET_SEARCH_RESULTS,
                payload: {
                    results: [],
                    error: true
                }
            });
            dispatch({
                type: SEARCH_PAGE_LOADING,
                payload: false
            });
        }
    }
}

export const getSuggestions = (param, isTeacher) => {
    return async dispatch => {
        const url = `${API_BASE}api/v1/home/autocomplete/search`;

        try {
            const { data } = await axios.get(url);

            dispatch({
                type: GET_SUGGESTIONS,
                payload: get(data, 'data', [])
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}

export const getEvents = (param, isTeacher) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': param
            }
        };
        const url = isTeacher ? `${API_BASE}api/v1/teacher/fetch/events` : `${API_BASE}api/v1/student/fetch/events`;

        dispatch({
            type: GET_EVENT_STATUS,
            payload: 'loading'
        });

        try {
            const { data } = await axios.get(url, header);

            dispatch({
                type: GET_EVENTS,
                payload: data.events
            });
        }
        catch (e) {
            dispatch({
                type: GET_EVENT_STATUS,
                payload: 'error'
            });
        }
        dispatch({
            type: GET_EVENT_STATUS,
            payload: ''
        });
    }
}

export const checkNotifications = (param) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': param
            }
        };

        const { data } = await axios.get(`${API_BASE}api/v1/common/identify/user`, header);
        const isTeacher = !isEmpty(data.data.teacher) || !isEmpty(data.data.teacherRequest);
        const url = isTeacher ? `${API_BASE}api/v1/teacher/fetch/pending/ratings` : `${API_BASE}api/v1/student/fetch/pending/ratings`;
        const response = await axios.get(url, header);

        dispatch({
            type: GET_NOTIFICATIONS,
            payload: response.data && response.data.events ? response.data.events : []
        });
    }
}

export const togglePageLoader = (value) => {
    return dispatch => {
        dispatch({
            type: PAGE_LOADER,
            payload: value
        })
    }
};

export const getFeedbacks = (param, isTeacher) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': param
            }
        };
        const url = isTeacher ? `${API_BASE}api/v1/teacher/fetch/pending/ratings` : `${API_BASE}api/v1/student/fetch/pending/ratings`;

        dispatch({
            type: FEEDBACK_STATUS,
            payload: 'loading'
        });

        try {
            const { data } = await axios.get(url, header);

            dispatch({
                type: SHOW_FEEDBACK,
                payload: data.events
            });
        }
        catch (e) {
            dispatch({
                type: FEEDBACK_STATUS,
                payload: 'error'
            });
        }
        dispatch({
            type: FEEDBACK_STATUS,
            payload: ''
        });
    }
}

export const postFeedbacks = (param, bodyObject, isTeacher) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': param
            }
        };
        dispatch({
            type: FEEDBACK_STATUS,
            payload: 'loading'
        });

        const url = isTeacher ? `${API_BASE}api/v1/teacher/provide/feedbacks` : `${API_BASE}api/v1/student/provide/feedbacks`;

        try {
            await axios.post(url, bodyObject, header);
            dispatch(getFeedbacks(param, isTeacher));
            dispatch(checkNotifications(param));
        }
        catch (e) {
            dispatch({
                type: FEEDBACK_STATUS,
                payload: 'error'
            });
        }
    }
}

export const toogleFeedback = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_FEEDBACK
        })
    }
}