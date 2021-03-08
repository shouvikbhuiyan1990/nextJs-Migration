import React from 'react';

import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import OtpTimer from '../../common/otpTimer';
import { getOTP } from '../../../store/actions/registration';

const OtpForm = ({
    updateFormObject,
    goBackToLastStep,
    isStudentFlow
}) => {

    const otpRegex = /^[1-9][0-9]{5}$/;

    const generatedOtp = useSelector(state => state.registration.generatedOtp);
    const otpRequested = useSelector(state => state.registration.otpRequested);
    const mobileNumber = useSelector(state => state.registration.mobileNumber);
    const tokenId = useSelector(state => state.joinModal.googleSignupProfile.tokenId);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        otp: Yup.string()
            .required("*OTP is required")
            .min(6, "OTP Must be of 6 characters")
            .matches(otpRegex, "*Invalid OTP")
    });

    return (
        <Formik
            initialValues={{
                otp: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                updateFormObject(JSON.stringify(values, null, 2));
            }}
        >
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="mx-auto">
                    <Form.Group controlId="formOtp">
                        <Form.Control
                            type="text"
                            name="otp"
                            placeholder="OTP"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.otp}
                            isInvalid={touched.otp && errors.otp}
                            maxLength="6"
                            autoComplete="off"
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.otp}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {otpRequested &&
                        <div className='otp-genereting-intermediator centered-without-space'>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            <p>Generating OTP</p>
                        </div>
                    }
                    {!otpRequested &&
                        <div className='otp-genereting-intermediator centered-without-space'>
                            <OtpTimer
                                className="resend-otp-btn"
                                defaultTimeInMinutes={2}
                                icon={<i className="fa fa-repeat" aria-hidden="true"></i>}
                                cb={() => dispatch(getOTP(JSON.stringify({ "mobile": mobileNumber }, null, 2), tokenId, isStudentFlow))}
                            />
                        </div>
                    }
                    {generatedOtp === 'error' &&
                        <Alert key="alertOTPFailure" variant={'danger'}>
                            Sorry, we failed to generate an OTP, Please try again
                            </Alert>
                    }
                    <div className='btn-holder'>
                        <Button
                            variant="primary"
                            type="button"
                            className="btn-theme-global-cancel"
                            disabled={isSubmitting || otpRequested}
                            onClick={() => goBackToLastStep(undefined)}
                        >
                            Back
                            </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting || otpRequested || generatedOtp === 'error'}
                            className='btn-custom'
                        >
                            Next
                            </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

export default OtpForm;