import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, setGsignupProfile, setInitStepRegistrationFlow } from "../../store/actions/joiningModal";
import { checkIfExistingUser } from '../../store/actions/registration';
import GoogleLogin from 'react-google-login';
import cookie from '../../utils/cookie';
import Alert from 'react-bootstrap/Alert';
import isEmpty from 'lodash/isEmpty';

// import googleLogo from '../../images/google-signin.svg';

const Styled = styles.div`
display:none;
`;

const JoiningModal = () => {
    const [loginError, setLoginError] = useState(false);
    const showModal = useSelector(state => state.joinModal.showModal);
    const typeOfModal = useSelector(state => state.joinModal.typeOfModal);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(toggleModal());

    const responseGoogle = (res) => {
        if (!isEmpty(res.error)) {
            setLoginError(true);
        }
        else {
            cookie.create('profileImageUrl', res.profileObj.imageUrl);
            cookie.create('userName', res.profileObj.name);
            const googleLoginObject = {
                ...res.profileObj,
                tokenId: res.tokenId
            };
            handleClose();
            if (typeOfModal === 'signin') {
                dispatch(checkIfExistingUser(res.tokenId, res.profileObj.imageUrl, true));
            }
            else {
                dispatch(setInitStepRegistrationFlow(0));
                dispatch(checkIfExistingUser(res.tokenId, res.profileObj.imageUrl));
            }
            dispatch(setGsignupProfile(googleLoginObject));
        }
    }

    return (
        <Styled>
            <Modal
                show={showModal}
                onHide={handleClose}
                centered={true}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Join Conzalt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loginError &&
                        <Alert key="alertLoginFailure" variant={'danger'}>
                            Something went wrong, cookie must be enabled for login
                    </Alert>
                    }
                    <GoogleLogin
                        clientId="510882057934-055u0o8gbjih5su3iivnvbdfko7eqh9d.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className='btn g-sigin'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <img src={'/images/google-signin.svg'} alt='google' />
                                <p>Continue with Google</p>
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    Already a Member? <a href={() => false}>Sign In</a>
                </Modal.Footer>
            </Modal>
        </Styled>
    )
};

export default JoiningModal;