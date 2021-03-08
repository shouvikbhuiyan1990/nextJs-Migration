import {
    GET_ALL_COURSES,
    SORT_COURSE,
    LOADING_COURSE,
    GET_COURSE_BY_ID,
    GET_TEACHER_DETAILS,
    LOADING_ALL_COURSE_BY_TEACHER,
    ALL_COURSE_BY_TEACHER,
    LOADING_TEACHER_DETAILS,
    UPDATING_COURSE
} from '../constant';
import { getCountryFromLocale } from '../../utils/helpers';

const initialState = {
    allCources: {},
    topRatedCaurse: [],
    isCourseLoading: false,
    courseByTeacher: [],
    teacheDeatails: {},
    isTeachersDetailsLoading: false,
    allCourseByTeacher: {},
    loadingAllCourseByTeacher: false,
    courseUpdating: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATING_COURSE: {
            return {
                ...state,
                courseUpdating: action.payload
            }
        }
        case LOADING_ALL_COURSE_BY_TEACHER: {
            return {
                ...state,
                loadingAllCourseByTeacher: action.payload
            }
        }
        case ALL_COURSE_BY_TEACHER: {
            return {
                ...state,
                allCourseByTeacher: action.payload
            }
        }
        case GET_ALL_COURSES: {
            const cources = action.payload.topRatedCaurse;
            cources.sort(function (a, b) {
                var keyA = a.rating,
                    keyB = b.rating;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            return {
                ...state,
                allCources: action.payload,
                topRatedCaurse: cources
            }
        }
        case LOADING_COURSE: {
            return {
                ...state,
                isCourseLoading: action.payload
            }
        }
        case GET_COURSE_BY_ID: {
            return {
                ...state,
                courseByTecher: action.payload
            }
        }
        case GET_TEACHER_DETAILS: {
            return {
                ...state,
                teacheDeatails: action.payload
            }
        }
        case LOADING_TEACHER_DETAILS: {
            return {
                ...state,
                isTeachersDetailsLoading: action.payload
            }
        }
        case SORT_COURSE: {
            const cources = [...state.topRatedCaurse];
            if (action.payload.toLowerCase() === 'rt') {

                cources.sort(function (a, b) {
                    var keyA = a.rating,
                        keyB = b.rating;
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
            }
            else if (action.payload.toLowerCase() === 'plh') {
                cources.sort(function (a, b) {
                    var keyA = a.pricing[getCountryFromLocale()].price,
                        keyB = b.pricing[getCountryFromLocale()].price;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
            }
            else {
                cources.sort(function (a, b) {
                    var keyA = a.pricing[getCountryFromLocale()].price,
                        keyB = b.pricing[getCountryFromLocale()].price;
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
            }

            return {
                ...state,
                topRatedCaurse: cources
            }
        }
        default:
            return state
    }
}