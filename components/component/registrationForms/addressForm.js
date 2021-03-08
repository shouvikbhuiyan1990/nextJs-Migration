import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const AddressForm = ({
    goBackToLastStep,
    updateFormObject,
    imageUploadStatus
}) => {


    const piCodeRegex = /^[1-9][0-9]{5}$/;

    const validationSchema = Yup.object().shape({
        address: Yup.string()
            .required("*Address is required"),
        pinCode: Yup.string()
            .matches(piCodeRegex, "*Invalid Pincode")
            .required("*Pincode is required"),
        city: Yup.string()
            .required("*City is required")
    });

    return (
        <Formik
            initialValues={{
                address: '',
                country: 'India',
                pinCode: '',
                city: ''
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
                    {imageUploadStatus === 'error' &&
                        <Alert key="alertImageUploadFailure" variant={'danger'}>
                            {'Image Uploading failed, Please try to upload the image again'}
                        </Alert>
                    }
                    <Form.Group controlId="formAddress">
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            isInvalid={touched.address && errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group controlId="formCity" as={Col} md="6">
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                isInvalid={touched.city && errors.city}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPincode" as={Col} md="6">
                            <Form.Control
                                type="text"
                                name="pinCode"
                                placeholder="pincode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pinCode}
                                isInvalid={touched.pinCode && errors.pinCode}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.pinCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formMobileCountry">
                        <Form.Control
                            as="select"
                            id="selectMobileCountry"
                            name="country"
                            value={values.country}
                            custom
                            isInvalid={touched.country && errors.country}
                        >
                            <option value="India">India</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
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
            )
            }
        </Formik >
    )
};

export default AddressForm;