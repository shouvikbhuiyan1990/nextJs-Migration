import React, { useState, useRef } from 'react';

import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../store/actions/registration';
import * as Yup from 'yup';

const SecondForm = ({
    updateFormObject,
    goBackToLastStep,
    isStudentFlow
}) => {
    const dispatch = useDispatch();
    const tokenId = useSelector(state => state.joinModal.googleSignupProfile.tokenId);
    const googleId = useSelector(state => state.joinModal.googleSignupProfile.googleId);
    const validationSchema = Yup.object().shape({
        file: Yup.mixed()
            .required("*File is required")
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
                dispatch(uploadImage(imageRef.current.files[0], tokenId, googleId, false, false, isStudentFlow));
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
                <Form onSubmit={handleSubmit} className="mx-auto" >
                    <Row className='centered-without-space'>
                        {imageUrl &&
                            <Col md={5}>
                                <div className="img-preview" style={avatarImgStyle}></div>
                            </Col>
                        }
                        <Form.Group as={Col} md={imageUrl ? "7" : "12"} controlId="formName">
                            <Form.Label>Choose a Profile Picture</Form.Label>
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
                            disabled={isSubmitting}
                            className="btn-theme-global-cancel"
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

export default SecondForm;