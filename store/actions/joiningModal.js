import {
    MODAL_TOGGLE,
    REGISTRATION_MODAL_TOGGLE,
    SET_G_SIGNUP_PROFILE,
    UPDATE_REGISTRATION_STEP
} from '../constant';

import { userlogin } from './registration';

import cookie from '../../utils/cookie';

export const toggleModal = (data, type) => {
    return dispatch => {
        dispatch({
            type: MODAL_TOGGLE,
            payload: { data, type }
        })
    }
};


export const toggleRegistrationModal = (data) => {
    return dispatch => {
        dispatch({
            type: REGISTRATION_MODAL_TOGGLE,
            payload: data
        })
    }
};


export const setGsignupProfile = (data, token) => {
    return dispatch => {
        dispatch({
            type: SET_G_SIGNUP_PROFILE,
            payload: data
        });

        if (token) {
            dispatch(userlogin(true));
            cookie.create('googleAuthId', token);
        }
    }
};

export const setInitStepRegistrationFlow = (data) => {
    return dispatch => {
        dispatch({
            type: UPDATE_REGISTRATION_STEP,
            payload: data
        });
    }
}