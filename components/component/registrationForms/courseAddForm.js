import React from 'react';

import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const CourseAddForm = ({
    goBackToLastStep,
    updateFormObject,
    submitHandler,
    imageUploadStatus,
    isImageUploading
}) => {

    const validationSchema = Yup.object().shape({
        expertise: Yup.array()
            .of(
                Yup.object().shape({
                    subject: Yup.string().required("*Subject is required"),
                })
            )
            .min(1, "Courses is >= 1")
    });

    const expertise = [{
        subject: 'Math',
        topic: ''
    }];

    return (
        <Formik
            initialValues={{ expertise }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                updateFormObject(JSON.stringify(values, null, 2));
                submitHandler()
            }}
        >
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="mx-auto img-upload">
                    {imageUploadStatus === 'error' &&
                        <Alert key="alertImageUploadFailure" variant={'danger'}>
                            {'Image Uploading failed, Please try to upload the image again'}
                        </Alert>
                    }
                    {isImageUploading &&
                        <div className='uploader-loader'>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    }
                    <FieldArray
                        name="expertise"
                        render={({ insert, remove, push }) => (
                            <Form.Row>
                                {values.expertise.length > 0 &&
                                    values.expertise.map((course, index) => (
                                        <React.Fragment>
                                            <Form.Row as={Col} md="11" className='relative-row'>

                                                <Form.Group controlId="formMobilesubject" as={Col} md="5">
                                                    <Form.Control
                                                        as="select"
                                                        id="selectCourse"
                                                        name={`expertise.${index}.subject`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.expertise[index].subject}
                                                        custom
                                                    >
                                                        <option value="math">Math</option>
                                                        <option value="geo">Geo</option>
                                                        <option value="physics">Physics</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="formMobile" as={Col} md="7">
                                                    <Form.Control
                                                        type="text"
                                                        name={`expertise.${index}.topic`}
                                                        placeholder="Topic"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.expertise[index].topic}
                                                        autoComplete="off"
                                                        isInvalid={
                                                            touched.expertise && touched.expertise[index] && touched.expertise[index].topic && touched.expertise[index].topic
                                                            && errors.expertise && errors.expertise[index] && errors.expertise[index].topic && errors.expertise[index].topic
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.expertise && errors.expertise[index] ? errors.expertise[index].topic : ''}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Form.Row>
                                            {values.expertise.length > 1 &&
                                                <Form.Row as={Col} md="1">
                                                    <i
                                                        onClick={() => remove(index)}
                                                        class="fa fa-minus-circle close-icon"
                                                        aria-hidden="true"
                                                    >
                                                    </i>
                                                </Form.Row>
                                            }
                                        </React.Fragment>
                                    ))}
                                <Col md="12">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        onClick={() => push({
                                            subject: 'Math',
                                            topic: ''
                                        })}
                                        className='btn-custom add-btn'
                                    >
                                        <i
                                            class="fa fa-plus"
                                            aria-hidden="true"
                                        >
                                        </i>
                                                    Add Courses
                                    </Button>
                                </Col>
                            </Form.Row>
                        )}
                    />
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
                            disabled={isSubmitting || imageUploadStatus === 'error'}
                            className='btn-custom'
                        >
                            Submit
                            </Button>
                    </div>
                </Form>
            )
            }
        </Formik >
    )
};

export default CourseAddForm;