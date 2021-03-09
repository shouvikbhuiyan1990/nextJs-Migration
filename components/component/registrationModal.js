import React, { useState, useEffect, useCallback } from 'react';

import Modal from 'react-bootstrap/Modal';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { toggleRegistrationModal } from "../../store/actions/joiningModal";
import { registerUser, resetRegistrationFlow, registerAsUserType, uploadIdCardandApplyForStudent } from "../../store/actions/registration";
import FirstForm from './registrationForms/form1';
import SecondForm from './registrationForms/form2';
import ThirdForm from './registrationForms/form3';
import OtpForm from './registrationForms/otpForm';
import DescriptionForm from './registrationForms/descriptonForm';
import AddressForm from './registrationForms/addressForm';
import CourseAddForm from './registrationForms/courseAddForm';
import IdCardForm from './registrationForms/idCardForm';
import DecideRoleForm from './registrationForms/decideRoleForm';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const Styles = styled.div`
display:none;
`;



let formObject = {};

const RegistrationModal = () => {
    const showRegistrationModal = useSelector(state => state.joinModal.showRegistrationModal);
    const tokenId = useSelector(state => state.joinModal.googleSignupProfile.tokenId);
    const googleProfile = useSelector(state => state.joinModal.googleSignupProfile);
    const registrationErrorTxt = useSelector(state => state.registration.registrationErrorTxt);
    const registrationRequested = useSelector(state => state.registration.registrationRequested);
    const uploadedImageUrl = useSelector(state => state.registration.uploadedImageUrl);
    const registrationStatus = useSelector(state => state.registration.registrationStatus);
    const isImageUploading = useSelector(state => state.registration.isImageUploading);
    const imageUploadStatus = useSelector(state => state.registration.imageUploadStatus);
    const userTypeInRegistrationFlow = useSelector(state => state.registration.userTypeInRegistrationFlow);
    const initRegistrationStepValue = useSelector(state => state.joinModal.initRegistrationStepValue);

    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const [isStudentFlow, setisStudentFlow] = useState(false);

    useEffect(() => {
        setisStudentFlow(!!(userTypeInRegistrationFlow === 'student'));
    }, [userTypeInRegistrationFlow]);

    useEffect(() => {
        setStep(Number(initRegistrationStepValue));
    }, [initRegistrationStepValue])


    const handleClose = useCallback(() => {
        dispatch(toggleRegistrationModal());
        dispatch(resetRegistrationFlow());
        setStep(0);
    }, [dispatch]);

    useEffect(() => {
        let timeout;
        if (registrationStatus === 'success') {
            timeout = setTimeout(() => {
                handleClose();
            }, 800)
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [registrationStatus, handleClose]);

    const loginAsStudent = () => {
        dispatch(registerAsUserType('student'));
    }

    const loginAsTeacher = () => {
        dispatch(registerAsUserType('teacher'));
    }

    const restartProcess = () => {
        dispatch(resetRegistrationFlow());
        setStep(0);
    }

    const updateFormObject = (obj) => {
        setStep(step + 1);
        if (obj) {
            formObject = { ...formObject, ...JSON.parse(obj) };
        }
    }

    const goBackToLastStep = (skipLast) => {
        !skipLast ? setStep(step - 1) : setStep(step - 2);
    }

    const submitHandler = (file) => {
        formObject.profileUrl = uploadedImageUrl;

        //remove params not needed by the api
        formObject.phoneNumber = formObject.mobile;
        delete formObject.file;
        delete formObject.countryCode;

        //student flow

        if (isStudentFlow) {
            delete formObject.expertise;
            formObject.iDCardUrl = '';
            dispatch(uploadIdCardandApplyForStudent(file, tokenId, googleProfile.googleId, formObject));
        }
        else {
            dispatch(registerUser(JSON.stringify(formObject), tokenId, isStudentFlow));
        }
    }

    return (
        <Styles>
            <Modal
                show={showRegistrationModal}
                onHide={handleClose}
                centered={true}
                className='register-modal'
                backdrop="static"
            >
                {
                    !registrationStatus &&
                    <Modal.Header closeButton>
                        <Modal.Title>Complete Your Profile</Modal.Title>
                    </Modal.Header>
                }
                {
                    registrationStatus === 'success' &&
                    <Modal.Header>
                        <Modal.Title>Registration Completed</Modal.Title>
                    </Modal.Header>
                }
                {
                    registrationStatus === 'error' &&
                    <Modal.Header closeButton>
                        <Modal.Title><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        </Modal.Title>
                    </Modal.Header>
                }
                {
                    !_isEmpty(googleProfile) &&
                    <Modal.Body>
                        {
                            step === 0 &&
                            <DecideRoleForm
                                {...googleProfile}
                                updateFormObject={updateFormObject}
                                loginAsStudent={loginAsStudent}
                                loginAsTeacher={loginAsTeacher}
                            />

                        }
                        {
                            step === 1 &&
                            <FirstForm
                                {...googleProfile}
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                initRegistrationStepValue={initRegistrationStepValue}
                                isStudentFlow={isStudentFlow}
                            />

                        }
                        {
                            step === 2 &&
                            <SecondForm
                                {...googleProfile}
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                isStudentFlow={isStudentFlow}
                            />
                        }
                        {
                            step === 3 &&
                            <ThirdForm
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                imageUploadStatus={imageUploadStatus}
                                isStudentFlow={isStudentFlow}
                            />
                        }
                        {
                            step === 4 &&
                            <OtpForm
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                isStudentFlow={isStudentFlow}
                            />
                        }
                        {
                            step === 5 &&
                            <DescriptionForm
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                imageUploadStatus={imageUploadStatus}
                                disableBackButton
                                isStudentFlow={isStudentFlow}
                            />
                        }
                        {
                            step === 6 &&
                            <AddressForm
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                imageUploadStatus={imageUploadStatus}
                                isStudentFlow={isStudentFlow}
                            />
                        }
                        {
                            step === 7 && !isStudentFlow &&
                            <CourseAddForm
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                submitHandler={submitHandler}
                                imageUploadStatus={imageUploadStatus}
                                isImageUploading={isImageUploading}
                            />
                        }
                        {
                            step === 7 && isStudentFlow &&
                            <IdCardForm
                                updateFormObject={updateFormObject}
                                goBackToLastStep={goBackToLastStep}
                                submitHandler={submitHandler}
                                imageUploadStatus={imageUploadStatus}
                                isImageUploading={isImageUploading}
                            />
                        }
                        {registrationRequested &&
                            <div className='registration-completed centered-without-space'>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        }
                        {registrationStatus === 'error' &&
                            <Alert key="alertOTPFailure" variant={'danger'}>
                                {registrationErrorTxt ? registrationErrorTxt : 'Sorry, we had some trouble onboarding you, please try again after sometime'}
                            </Alert>
                        }
                        {registrationStatus === 'success' &&
                            <div className='registration-completed centered-without-space'>
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                            </div>
                        }

                    </Modal.Body>
                }
                {!registrationStatus &&
                    <Modal.Footer>
                        <p>By joining, you agree to Conzult's <a href={() => false}>Terms of Service</a> as well as to receive occasional emails from us.</p>
                    </Modal.Footer>
                }
                {registrationStatus === 'error' &&
                    <Modal.Footer>
                        <Button onClick={restartProcess} className='single-button' variant="primary" type="button">
                            Restart
                </Button>
                    </Modal.Footer>
                }
            </Modal>
        </Styles>
    )
};

export default RegistrationModal;