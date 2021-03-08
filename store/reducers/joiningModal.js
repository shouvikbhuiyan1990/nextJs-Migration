import {
    MODAL_TOGGLE,
    REGISTRATION_MODAL_TOGGLE,
    SET_G_SIGNUP_PROFILE,
    UPDATE_REGISTRATION_STEP
} from '../constant';

const initialState = {
    showModal: false,
    showRegistrationModal: false,
    googleSignupProfile: {},
    typeOfModal: '',
    initRegistrationStepValue: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MODAL_TOGGLE: {
            return {
                ...state,
                showModal: !state.showModal,
                typeOfModal: action.payload.type
            }
        }
        case REGISTRATION_MODAL_TOGGLE: {
            return {
                ...state,
                showRegistrationModal: !state.showRegistrationModal
            }
        }
        case SET_G_SIGNUP_PROFILE: {
            return {
                ...state,
                googleSignupProfile: { ...action.payload }
            }
        }
        case UPDATE_REGISTRATION_STEP: {
            return {
                ...state,
                initRegistrationStepValue: action.payload
            }
        }
        default:
            return state
    }
}