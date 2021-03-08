import React, { useState, useRef } from 'react';

import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const IDCardForm = ({
    goBackToLastStep,
    updateFormObject,
    imageUploadStatus,
    isImageUploading,
    submitHandler
}) => {
    const validationSchema = Yup.object().shape({
        file: Yup.mixed()
            .required("*Id card is mandatory for creating a student profile.")
    });
    const imageRef = useRef('');

    const [imageUrl, setImgaeUrl] = useState('');

    var avatarImgStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover'
    };


    return (
        <Formik
            initialValues={{
                file: undefined
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                submitHandler(imageRef.current.files[0]);

                updateFormObject();
            }}
        >
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="mx-auto" >
                    {imageUploadStatus === 'error' &&
                        <Alert key="alertImageUploadFailure" variant={'danger'}>
                            {'Profile Image Uploading failed, Please try to upload the image again'}
                        </Alert>
                    }
                    {isImageUploading &&
                        <div className='uploader-loader'>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    }
                    <Row className='centered-without-space'>
                        {imageUrl &&
                            <Col md={12}>
                                <div className="img-preview-id" style={avatarImgStyle}></div>
                            </Col>
                        }
                        <Form.Group as={Col} md={12} controlId="formName">
                            <Form.Label>Upload Id Card Image</Form.Label>
                            <Form.File
                                name="file"
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.files[0]) {
                                        var file = e.target.files[0];
                                        var reader = new FileReader();
                                        reader.readAsDataURL(file);

                                        reader.onloadend = (e) => {
                                            setImgaeUrl([reader.result]);
                                        }
                                    }
                                    else {
                                        setImgaeUrl('');
                                    }
                                }}
                                isInvalid={!!errors.file}
                                onBlur={handleBlur}
                                value={values.file}
                                ref={imageRef}
                                feedback={errors.file}
                                id="validationFormik107"
                                feedbackTooltip
                                accept="image/*"
                            />
                        </Form.Group>
                    </Row>
                    <div className='btn-holder'>
                        <Button
                            variant="primary"
                            type="button"
                            className="btn-theme-global-cancel"
                            disabled={isSubmitting}
                            onClick={() => goBackToLastStep(undefined)}
                        >
                            Back
                            </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
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

export default IDCardForm;