import {
    PAGE_LOADER,
    SHOW_FEEDBACK,
    SEARCH_PAGE_LOADING,
    TOGGLE_FEEDBACK,
    FEEDBACK_STATUS,
    GET_EVENTS,
    GET_SUGGESTIONS,
    GET_EVENT_STATUS,
    GET_NOTIFICATIONS,
    GET_EXPERTS_LIST,
    EXPERTS_LIST_LOADING,
    GET_SEARCH_RESULTS
} from '../constant';
import get from 'lodash/get';

const initialState = {
    showPageLoader: false,
    showFeedback: false,
    pendingFeedbackList: [],
    feedbackStatus: '',
    notifications: [],
    allEvents: {},
    eventFetchStatus: '',
    searchSuggestions: [],
    searchResults: [],
    errorInSearch: false,
    isSearchLoading: false,
    experts: [],
    errorInexperts: false,
    isExpertsLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PAGE_LOADER: {
            return {
                ...state,
                showPageLoader: action.payload
            }
        }
        case GET_SUGGESTIONS: {
            return {
                ...state,
                searchSuggestions: action.payload
            }
        }
        case GET_SEARCH_RESULTS: {
            return {
                ...state,
                searchResults: get(action, 'payload.results', []),
                errorInSearch: get(action, 'payload.error', false)
            }
        }
        case SEARCH_PAGE_LOADING: {
            return {
                ...state,
                isSearchLoading: action.payload
            }
        }
        case GET_EXPERTS_LIST: {
            return {
                ...state,
                experts: get(action, 'payload.results', []),
                errorInexperts: get(action, 'payload.error', false)
            }
        }
        case EXPERTS_LIST_LOADING: {
            return {
                ...state,
                isExpertsLoading: action.payload
            }
        }
        case SHOW_FEEDBACK: {
            const feedbackArray = action.payload ?
                action.payload.filter((item) => item.status === 'pending') :
                [];
            return {
                ...state,
                showFeedback: feedbackArray.length > 0,
                feedbackDetails: feedbackArray[0],
                pendingFeedbackList: feedbackArray
            }
        }
        case GET_EVENTS: {
            return {
                ...state,
                allEvents: action.payload
            }
        }
        case GET_EVENT_STATUS: {
            return {
                ...state,
                eventFetchStatus: action.payload
            }
        }
        case GET_NOTIFICATIONS: {
            const notificationArr = action.payload ?
                action.payload.filter((item) => item.status === 'pending') :
                [];
            return {
                ...state,
                notifications: notificationArr
            }
        }
        case TOGGLE_FEEDBACK: {
            let feedbackArrCopy = state.pendingFeedbackList.slice(0);
            feedbackArrCopy.shift();
            return {
                ...state,
                showFeedback: feedbackArrCopy.length > 0,
                feedbackDetails: feedbackArrCopy[0],
                pendingFeedbackList: feedbackArrCopy
            }
        }
        case FEEDBACK_STATUS: {
            return {
                ...state,
                feedbackStatus: action.payload
            }
        }
        default:
            return state
    }
}