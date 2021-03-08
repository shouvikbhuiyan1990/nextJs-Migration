import axios from 'axios';
import get from 'lodash/get';
import { roundToTwo } from '../../utils/helpers';
import {
    GET_ALL_COURSES,
    SORT_COURSE,
    API_BASE,
    LOADING_COURSE,
    GET_COURSE_BY_ID,
    GET_TEACHER_DETAILS,
    LOADING_TEACHER_DETAILS,
    LOADING_ALL_COURSE_BY_TEACHER,
    ALL_COURSE_BY_TEACHER,
    UPDATING_COURSE,
    UPDATE_TEACHER_SLOT_TIME_SELECTION,
    PAGE_LOADER
} from '../constant';


const uploadImage = (file, tokenId, imageName) => {
    const imgHeader = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': tokenId,
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const formdataobj = new FormData();

        formdataobj.append('bucketName', 'conzalt-upload');
        formdataobj.append('fileName', `course-${imageName}-${file.name}`);
        formdataobj.append('file', file);

        return axios.post(`${API_BASE}api/v1/teacher/upload/file`, formdataobj, imgHeader);
    }
    catch (eror) {
        console.log('error');
    }
};

export const getAllCources = (data) => {
    return dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0'
            }
        };
        dispatch({
            type: LOADING_COURSE,
            payload: true
        });
        axios.get(`${API_BASE}api/v1/home/tamplate/cources`, header)
            .then(function (response) {
                dispatch({
                    type: LOADING_COURSE,
                    payload: false
                });
                dispatch({
                    type: GET_ALL_COURSES,
                    payload: response.data.data
                })
            })
            .catch(function (error) {
                dispatch({
                    type: LOADING_COURSE,
                    payload: false
                });
                console.log(error);
            })
    }
};




export const getCourseByTecherId = (param) => {
    return dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0'
            }
        };
        dispatch({
            type: LOADING_COURSE,
            payload: true
        });
        axios.get(`${API_BASE}api/v1/home/course/${param}`, header)
            .then(function (response) {
                dispatch({
                    type: LOADING_COURSE,
                    payload: false
                });

                dispatch({
                    type: GET_COURSE_BY_ID,
                    payload: response.data.data
                });
                dispatch({
                    type: UPDATE_TEACHER_SLOT_TIME_SELECTION,
                    payload: get(response.data, 'data.teacher.slotTime')
                });
            })
            .catch(function (error) {
                dispatch({
                    type: LOADING_COURSE,
                    payload: false
                });
                console.log(error);
            })
    }
};


export const getTeacherDetails = (param, isStudent) => {
    let errorObj = {
        errorCode: '400'
    };
    return dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0'
            }
        };
        dispatch({
            type: LOADING_TEACHER_DETAILS,
            payload: true
        });
        const url = isStudent ? `api/v1/home/student/${param}` : `api/v1/home/teacher/${param}`;
        axios.get(`${API_BASE}${url}`, header)
            .then(function (response) {
                dispatch({
                    type: LOADING_TEACHER_DETAILS,
                    payload: false
                });

                dispatch({
                    type: GET_TEACHER_DETAILS,
                    payload: response.data.data || response.data.error
                });
            })
            .catch(function (error) {
                dispatch({
                    type: LOADING_TEACHER_DETAILS,
                    payload: false
                });
                dispatch({
                    type: GET_TEACHER_DETAILS,
                    payload: errorObj
                });
            })
    }
};


export const sortCources = (param) => {
    return dispatch => {
        dispatch({
            type: SORT_COURSE,
            payload: param
        })
    }
};




export const getCoursesByUserTeacherDetails = (param) => {
    return dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': param
            }
        };
        dispatch({
            type: LOADING_ALL_COURSE_BY_TEACHER,
            payload: true
        });
        axios.get(`${API_BASE}api/v1/teacher/getMyDetails`, header)
            .then(function (response) {
                dispatch({
                    type: LOADING_ALL_COURSE_BY_TEACHER,
                    payload: false
                });

                dispatch({
                    type: ALL_COURSE_BY_TEACHER,
                    payload: response.data.data
                })
            })
            .catch(function (error) {
                dispatch({
                    type: LOADING_ALL_COURSE_BY_TEACHER,
                    payload: false
                });
                console.log(error);
            })
    }
};


export const addUpdateNewCourse = (tokenId, uploadBody, file, teacherName, isUpdateFlow, isRequest) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': tokenId
            }
        };
        dispatch({
            type: UPDATING_COURSE,
            payload: true
        });
        dispatch({
            type: PAGE_LOADER,
            payload: true
        });
        try {
            uploadBody = JSON.parse(uploadBody);
            if (file) {
                const { data } = await uploadImage(file, tokenId, teacherName);
                if (uploadBody.updateData) {
                    uploadBody.updateData.iconUrl = data.s3Details.Location;
                }
                else {
                    uploadBody.iconUrl = data.s3Details.Location;
                }
            }

            if (!isUpdateFlow) {
                uploadBody.pricing = {};
                uploadBody.pricing['IN'] = {};
                uploadBody.pricing['US'] = {};
                uploadBody.pricing['IN'].price = roundToTwo(uploadBody.price1);
                uploadBody.pricing['US'].price = roundToTwo(uploadBody.price2);
                uploadBody.teacherName = teacherName;
                uploadBody.topic = uploadBody.topic || '';
                delete uploadBody.file;
                delete uploadBody.currency;
                delete uploadBody.currency2;
                delete uploadBody.price1;
                delete uploadBody.price2;
                uploadBody = JSON.stringify(uploadBody);
                await axios.post(`${API_BASE}api/v1/teacher/add/course`, JSON.parse(uploadBody), header);
            }
            else if (isUpdateFlow && isRequest) {
                uploadBody = JSON.stringify(uploadBody);
                await axios.post(`${API_BASE}api/v1/teacher/update/course/request`, JSON.parse(uploadBody), header);
            }
            else if (isUpdateFlow && !isRequest) {
                uploadBody = JSON.stringify(uploadBody);
                await axios.post(`${API_BASE}api/v1/teacher/update/course`, JSON.parse(uploadBody), header);
            }
            dispatch(getCoursesByUserTeacherDetails(tokenId));
        }
        catch (e) {
            console.log(e);
        }

        dispatch({
            type: UPDATING_COURSE,
            payload: false
        });
        dispatch({
            type: PAGE_LOADER,
            payload: false
        })
    }
};


export const deleteCourse = (tokenId, uploadBody, isRequest) => {
    return async dispatch => {
        const header = {
            headers: {
                'authorization': 'Basic Y29uemFsdDpjb256YWx0',
                'id-token': tokenId
            }
        };
        dispatch({
            type: UPDATING_COURSE,
            payload: true
        });
        dispatch({
            type: PAGE_LOADER,
            payload: true
        });
        try {
            if (isRequest) {
                await axios.post(`${API_BASE}api/v1/teacher/delete/course/request`, JSON.parse(uploadBody), header);
            }
            else {
                await axios.post(`${API_BASE}api/v1/teacher/delete/course`, JSON.parse(uploadBody), header);
            }
            dispatch(getCoursesByUserTeacherDetails(tokenId));
        }
        catch (e) {
            console.log(e);
        }

        dispatch({
            type: UPDATING_COURSE,
            payload: false
        });
        dispatch({
            type: PAGE_LOADER,
            payload: false
        })
    }
};
