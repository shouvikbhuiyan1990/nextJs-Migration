import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const DescriptionForm = ({
    goBackToLastStep,
    updateFormObject,
    disableBackButton,
    imageUploadStatus
}) => {

    const validationSchema = Yup.object().shape({
        remarks: Yup.string()
            .min(2, "*Remarks must have at least 2 characters")
            .max(80, "*Remarks must be less than 80 characters")
            .required("*Remarks number is required"),
        description: Yup.string()
            .min(20, "*Description must have at least 20 characters")
            .required("*Description is required")
    });

    return (
        <Formik
            initialValues={{
                remarks: '',
                description: ''
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
                    <Form.Group controlId="formRemarks">
                        <Form.Control
                            type="tel"
                            name="remarks"
                            placeholder="Remarks"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.remarks}
                            isInvalid={touched.remarks && errors.remarks}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.remarks}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            isInvalid={touched.description && errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className='btn-holder'>
                        <Button
                            variant="primary"
                            type="button"
                            disabled={isSubmitting}
                            className="btn-theme-global-cancel"
                            onClick={
                                disableBackButton ?
                                    () => goBackToLastStep(true) :
                                    goBackToLastStep
                            }
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

export default DescriptionForm;