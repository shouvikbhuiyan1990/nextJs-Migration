import {
    OTP_REQUESTED,
    OTP_GENERATED,
    REGISTRATION_REQUESTED,
    REGISTRATION_STATUS_UPDATE,
    RESET_REGISTRATION_FLOW,
    UPDATE_REGISTRATION_ERROR,
    UPDATE_MOBILE_NUMBER,
    UPDATE_LOGIN_STATUS,
    IMAGE_UPLOADING_STATUS,
    IMAGE_UPLOADING_PROGRESS,
    UPDATE_USER_INFO,
    USER_INFO_LOADING,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_STATUS,
    UPDATE_PROFILE_PHOTO,
    UPDATE_LOGIN_TOKEN,
    REGISTRATION_FLOW_USER_TYPE
} from '../constant';

const initialState = {
    otpRequested: false,
    registrationRequested: false,
    generatedOtp: '',
    registrationStatus: '',
    registrationErrorTxt: '',
    mobileNumber: '',
    isLoggedIn: false,
    isImageUploading: false,
    imageUploadStatus: '',
    profileImageUrl: '',
    uploadedImageUrl: '',
    isUserInfoLoading: false,
    userInfo: {},
    isProfileUpdating: false,
    profileUpdateStatus: '',
    loginToken: '',
    userTypeInRegistrationFlow: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO: {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        case REGISTRATION_FLOW_USER_TYPE: {
            return {
                ...state,
                userTypeInRegistrationFlow: action.payload
            }
        }
        case PROFILE_UPDATE_REQUEST: {
            return {
                ...state,
                isProfileUpdating: action.payload
            }
        }
        case PROFILE_UPDATE_STATUS: {
            return {
                ...state,
                profileUpdateStatus: action.payload
            }
        }
        case USER_INFO_LOADING: {
            return {
                ...state,
                isUserInfoLoading: action.payload
            }
        }
        case OTP_REQUESTED: {
            return {
                ...state,
                otpRequested: action.payload
            }
        }
        case IMAGE_UPLOADING_STATUS: {
            return {
                ...state,
                imageUploadStatus: action.payload.status,
                uploadedImageUrl: action.payload.imgUrl
            }
        }
        case UPDATE_LOGIN_TOKEN: {
            return {
                ...state,
                loginToken: action.payload
            }
        }
        case UPDATE_PROFILE_PHOTO: {
            return {
                ...state,
                profileImageUrl: action.payload
            }
        }
        case IMAGE_UPLOADING_PROGRESS: {
            return {
                ...state,
                isImageUploading: action.payload
            }
        }
        case UPDATE_LOGIN_STATUS: {
            return {
                ...state,
                isLoggedIn: action.payload
            }
        }
        case OTP_GENERATED: {
            return {
                ...state,
                generatedOtp: action.payload
            }
        }
        case REGISTRATION_REQUESTED: {
            return {
                ...state,
                registrationRequested: action.payload
            }
        }
        case REGISTRATION_STATUS_UPDATE: {
            return {
                ...state,
                registrationStatus: action.payload
            }
        }
        case UPDATE_REGISTRATION_ERROR: {
            return {
                ...state,
                registrationErrorTxt: action.payload
            }
        }
        case RESET_REGISTRATION_FLOW: {
            return {
                ...state,
                otpRequested: false,
                registrationRequested: false,
                generatedOtp: '',
                registrationStatus: '',
                registrationErrorTxt: ''
            }
        }
        case UPDATE_MOBILE_NUMBER: {
            return {
                ...state,
                mobileNumber: action.payload,
            }
        }
        default:
            return state
    }
}