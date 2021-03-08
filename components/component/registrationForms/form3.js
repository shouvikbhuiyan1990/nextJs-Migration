import React from 'react';

import { Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { getOTP, updateMobileNumber } from '../../../store/actions/registration';

const ThirdForm = ({
    goBackToLastStep,
    updateFormObject,
    imageUploadStatus,
    isStudentFlow
}) => {

    const dispatch = useDispatch();
    const phoneRegExp = /^[789]\d{9}$/;
    const tokenId = useSelector(state => state.joinModal.googleSignupProfile.tokenId);


    const validationSchema = Yup.object().shape({
        mobile: Yup.string()
            .required("*Mobile number is required")
            .matches(phoneRegExp, "*Mobile number is not valid")
    });

    return (
        <Formik
            initialValues={{
                mobile: '',
                countryCode: '+91'
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(getOTP(JSON.stringify(values, null, 2), tokenId, isStudentFlow));
                dispatch(updateMobileNumber(values.mobile));
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
                    {imageUploadStatus === 'error' &&
                        <Alert key="alertImageUploadFailure" variant={'danger'}>
                            {'Image Uploading failed, Please try to upload the image again'}
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="formMobileCountry" as={Col} md="3">
                            <Form.Control
                                as="select"
                                id="selectMobileCountryCode"
                                name="countryCode"
                                value={values.countryCode}
                                custom
                            >
                                <option value="+91">+91</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMobile" as={Col} md="9">
                            <Form.Control
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobile}
                                isInvalid={touched.mobile && errors.mobile}
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.mobile}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div className='btn-holder'>
                        <Button
                            variant="primary"
                            type="button"
                            disabled={isSubmitting}
                            className="btn-theme-global-cancel"
                            onClick={() => goBackToLastStep(undefined)}
                        >
                            Back
                            </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting || imageUploadStatus === 'error'}
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

export default ThirdForm;