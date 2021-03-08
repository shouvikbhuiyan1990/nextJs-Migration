import {
    OTP_REQUESTED,
    OTP_GENERATED,
    REGISTRATION_REQUESTED,
    REGISTRATION_STATUS_UPDATE,
    UPDATE_REGISTRATION_ERROR,
    RESET_REGISTRATION_FLOW,
    UPDATE_MOBILE_NUMBER,
    UPDATE_LOGIN_STATUS,
    IMAGE_UPLOADING_STATUS,
    IMAGE_UPLOADING_PROGRESS,
    UPDATE_USER_INFO,
    USER_INFO_LOADING,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_STATUS,
    UPDATE_TEACHER_SLOT_TIME_SELECTION,
    PAGE_LOADER,
    UPDATE_PROFILE_PHOTO,
    API_BASE,
    UPDATE_LOGIN_TOKEN,
    REGISTRATION_FLOW_USER_TYPE
} from '../constant';
import { toggleRegistrationModal } from './joiningModal';
import { togglePageLoader } from './global';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import axios from 'axios';
import cookie from '../../utils/cookie';
import _isEmpty from 'lodash/isEmpty';

export const updateMobileNumber = (value) => {
    return dispatch => {
        dispatch({
            type: UPDATE_MOBILE_NUMBER,
            payload: value
        });
    }
}


export const getOTP = (body, tokenId, isStudentFlow) => {
    const bodyObject = JSON.parse(body);
    const header = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': tokenId
        }
    };
    return async dispatch => {
        dispatch({
            type: OTP_REQUESTED,
            payload: true
        });

        try {

            let url = isStudentFlow ? 'api/v1/student/otp/generate' : 'api/v1/teacher/otp/generate';
            const response = await axios.post(`${API_BASE}${url}`, bodyObject, header);
            dispatch({
                type: OTP_GENERATED,
                payload: response.data.status.toLowerCase()
            });
            if (response.status !== 200)
                dispatch({
                    type: OTP_GENERATED,
                    payload: 'error'
                });
        }
        catch (eror) {
            dispatch({
                type: OTP_GENERATED,
                payload: 'error'
            });
        }

        dispatch({
            type: OTP_REQUESTED,
            payload: false
        });
    }
};




export const uploadIdCardandApplyForStudent = (file, tokenId, googleId, formObject) => {
    const imgHeader = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': tokenId,
            'Content-Type': 'multipart/form-data'
        }
    };

    return async dispatch => {
        try {
            dispatch({
                type: REGISTRATION_REQUESTED,
                payload: true
            });
            const formdataobj = new FormData();

            formdataobj.append('bucketName', 'conzalt-upload');
            formdataobj.append('fileName', `idcard-${file.name}`);
            formdataobj.append('file', file);

            let url = 'api/v1/student/upload/file';

            const { data } = await axios.post(`${API_BASE}${url}`, formdataobj, imgHeader);
            if (isEmpty(data.s3Details)) {
                dispatch({
                    type: REGISTRATION_STATUS_UPDATE,
                    payload: 'error'
                });
                dispatch({
                    type: REGISTRATION_REQUESTED,
                    payload: false
                });
            }
            else if (!isEmpty(data.s3Details)) {
                formObject.iDCardUrl = data.s3Details.Location;
                dispatch(registerUser(JSON.stringify(formObject), tokenId, true));
            }
        }
        catch (eror) {
            dispatch({
                type: REGISTRATION_STATUS_UPDATE,
                payload: 'error'
            });
            dispatch({
                type: REGISTRATION_REQUESTED,
                payload: false
            });
        }
    }
}

export const uploadImage = (file, tokenId, googleId, isImageUpdateFlow, imageFlowBody, isStudentFlow) => {
    const imgHeader = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': tokenId,
            'Content-Type': 'multipart/form-data'
        }
    };

    return async dispatch => {
        try {
            const formdataobj = new FormData();

            formdataobj.append('bucketName', 'conzalt-upload');
            formdataobj.append('fileName', `profile-${file.name}`);
            formdataobj.append('file', file);
            dispatch({
                type: IMAGE_UPLOADING_PROGRESS,
                payload: true
            });

            let url = isStudentFlow ? 'api/v1/student/upload/file' : 'api/v1/teacher/upload/file';

            const { data } = await axios.post(`${API_BASE}${url}`, formdataobj, imgHeader);
            if (isEmpty(data.s3Details)) {
                dispatch({
                    type: IMAGE_UPLOADING_STATUS,
                    payload: { status: 'error' }
                });
            }
            else if (!isEmpty(data.s3Details)) {
                if (isImageUpdateFlow) {
                    dispatch({
                        type: PROFILE_UPDATE_REQUEST,
                        payload: true
                    });
                    delete imageFlowBody.fileToUpload;
                    imageFlowBody["profileUrl"] = data.s3Details.Location;

                    dispatch(updateUserProfile(JSON.stringify(imageFlowBody), tokenId, isStudentFlow));

                }
                dispatch({
                    type: IMAGE_UPLOADING_STATUS,
                    payload: { status: 'success', imgUrl: data.s3Details.Location }
                });
                if (!isImageUpdateFlow) {
                    cookie.create('profileImageUrl', data.s3Details.Location);
                }
            }
            dispatch({
                type: IMAGE_UPLOADING_PROGRESS,
                payload: false
            });
        }
        catch (eror) {
            dispatch({
                type: IMAGE_UPLOADING_STATUS,
                payload: { status: 'error' }
            });
            dispatch({
                type: PROFILE_UPDATE_REQUEST,
                payload: false
            });
            dispatch({
                type: IMAGE_UPLOADING_PROGRESS,
                payload: false
            });
            dispatch({
                type: PAGE_LOADER,
                payload: false
            })
        }
    }
}

export const registerUser = (body, tokenId, isStudentFlow) => {
    const bodyObject = JSON.parse(body);
    const header = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': tokenId
        }
    };
    return async dispatch => {
        dispatch({
            type: REGISTRATION_REQUESTED,
            payload: true
        });

        try {

            let url = isStudentFlow ? 'api/v1/student/apply' : 'api/v1/teacher/apply';
            const response = await axios.post(`${API_BASE}${url}`, bodyObject, header);
            if (response.status === 200 && _isEmpty(response.data.error)) {
                dispatch({
                    type: REGISTRATION_STATUS_UPDATE,
                    payload: 'success'
                });
                dispatch({
                    type: UPDATE_LOGIN_STATUS,
                    payload: true
                });
                cookie.create('googleAuthId', tokenId);
            }
            else if (response.status !== 200 || !_isEmpty(response.data.error)) {
                dispatch({
                    type: REGISTRATION_STATUS_UPDATE,
                    payload: 'error'
                });
                dispatch({
                    type: UPDATE_REGISTRATION_ERROR,
                    payload: response.data.error.displayText
                });
            }
        }
        catch (eror) {
            dispatch({
                type: REGISTRATION_STATUS_UPDATE,
                payload: 'error'
            });
        }

        dispatch({
            type: REGISTRATION_REQUESTED,
            payload: false
        });
    }
};

export const resetRegistrationFlow = () => {
    return dispatch => {
        dispatch({
            type: RESET_REGISTRATION_FLOW
        });
    }
}

export const registerAsUserType = (flow) => {
    return dispatch => {
        dispatch({
            type: REGISTRATION_FLOW_USER_TYPE,
            payload: flow
        });
    }
}

export const userlogin = (value) => {
    return dispatch => {
        dispatch({
            type: UPDATE_LOGIN_STATUS,
            payload: value
        });
    }
}

const checkIfTeacher = (data) => {
    return !isEmpty(data.teacher) || !isEmpty(data.teacherRequest);
}

export const checkIfExistingUser = (loginToken, profileImageUrl, isGenericFlow) => {
    const header = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': loginToken
        }
    };
    return async dispatch => {
        dispatch({
            type: UPDATE_LOGIN_TOKEN,
            payload: loginToken
        });
        dispatch(togglePageLoader(true));
        try {
            const { data } = await axios.get(`${API_BASE}api/v1/common/identify/user`, header);
            if (isEmpty(data.data.student) && isEmpty(data.data.studentRequest) && isEmpty(data.data.teacher) && isEmpty(data.data.teacherRequest) && !isGenericFlow) {
                dispatch(toggleRegistrationModal());
                dispatch(userlogin(false));
            }
            else {
                dispatch({
                    type: UPDATE_PROFILE_PHOTO,
                    payload: get(data, 'data.teacher.profileUrl') || get(data, 'data.student.profileUrl') || profileImageUrl
                });
                cookie.create('googleAuthId', loginToken);
                cookie.create('profileImageUrl', get(data, 'data.teacher.profileUrl') || profileImageUrl);
                dispatch(userlogin(true));
                if (isEmpty(data.data.student) && isEmpty(data.data.studentRequest) && checkIfTeacher(data.data)) {
                    cookie.create('userType', 'teacher');
                }
                else if ((!isEmpty(data.data.student) || !isEmpty(data.data.studentRequest)) && !checkIfTeacher(data.data)) {
                    cookie.create('userType', 'student');
                }
                else if ((!isEmpty(data.data.student) || !isEmpty(data.data.studentRequest)) && checkIfTeacher(data.data)) {
                    cookie.create('userType', 'teacher_student');
                }
                // if (sessionStorage.getItem('lastVisited')) {
                //     window.location.href = sessionStorage.getItem('lastVisited');
                // }
                window.location.href = '/dashboard/feeds';
            }
        }
        catch (eror) {
            console.log('error');
        }

        dispatch(togglePageLoader(false));
    }
}

const getImageUrl = (data) => {
    if (!isEmpty(data.teacher)) {
        return data.teacher.profileUrl
    }
    else if (!isEmpty(data.teacherRequest)) {
        return data.teacherRequest.profileUrl
    }
    else if (!isEmpty(data.student)) {
        return data.student.profileUrl;
    }
    else if (!isEmpty(data.studentRequest)) {
        return data.studentRequest.profileUrl;
    }
}

export const checkIfProfileExists = (loginToken) => {
    const header = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': loginToken
        }
    };
    return async dispatch => {
        dispatch({
            type: USER_INFO_LOADING,
            payload: true
        });

        try {
            const { data } = await axios.get(`${API_BASE}api/v1/common/identify/user`, header);

            dispatch({
                type: UPDATE_USER_INFO,
                payload: data.data
            });

            dispatch({
                type: UPDATE_TEACHER_SLOT_TIME_SELECTION,
                payload: get(data.data, 'teacher.slotTime') || get(data.data, 'student.slotTime')
            });

            dispatch({
                type: IMAGE_UPLOADING_STATUS,
                payload: { status: 'success', imgUrl: getImageUrl(data.data) }
            });
        }
        catch (error) {
            dispatch({
                type: UPDATE_USER_INFO,
                payload: {
                    error: 'error'
                }
            });
        }

        dispatch({
            type: USER_INFO_LOADING,
            payload: false
        });
    }
}





export const updateUserProfile = (body, tokenId, isStudent) => {
    const bodyObject = JSON.parse(body);
    const header = {
        headers: {
            'authorization': 'Basic Y29uemFsdDpjb256YWx0',
            'id-token': tokenId
        }
    };
    return async dispatch => {
        dispatch({
            type: PROFILE_UPDATE_REQUEST,
            payload: true
        });
        dispatch({
            type: PAGE_LOADER,
            payload: true
        })

        try {
            const url = isStudent ? 'api/v1/student/update/student' : 'api/v1/teacher/update/teacher';
            const response = await axios.post(`${API_BASE}${url}`, bodyObject, header);
            if (response.status === 200 && response.data.status && response.data.status.toLowerCase() === 'success') {
                dispatch({
                    type: PROFILE_UPDATE_STATUS,
                    payload: 'success'
                });
                dispatch(checkIfProfileExists(tokenId));
            }

            if (response.status !== 200 || !_isEmpty(response.data.error))
                dispatch({
                    type: PROFILE_UPDATE_STATUS,
                    payload: 'error'
                });
        }
        catch (eror) {
            dispatch({
                type: PROFILE_UPDATE_STATUS,
                payload: 'error'
            });
        }

        dispatch({
            type: PROFILE_UPDATE_REQUEST,
            payload: false
        });
        dispatch({
            type: PAGE_LOADER,
            payload: false
        })
    }
};

export const resetProfileUpdateStatus = (value) => {
    return dispatch => {
        dispatch({
            type: PROFILE_UPDATE_STATUS,
            payload: value
        });
    }
}