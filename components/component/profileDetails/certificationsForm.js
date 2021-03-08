import React from 'react';
import isEqual from 'lodash/isEqual';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { generateYearsTillToday } from '../../../utils/helpers';

const CertForm = ({
    show,
    certificationsModal,
    certificationsObject,
    formSubmit,
}) => {

    const phoneRegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;

    const validationSchema = Yup.object().shape({
        certification: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string()
                        .required("*Name value is required"),
                    link: Yup.string()
                        .matches(phoneRegExp, "Link is not valid. Ex: https://www.google.com/"),
                })
            )
    });

    const certification = certificationsObject;

    return (
        <Modal
            show={show}
            onHide={certificationsModal}
            centered={true}
            backdrop="static"
            className='highights-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>Edit Certifications</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ certification }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        formSubmit(values, true, 'certification');
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
                            <FieldArray
                                name="certification"
                                render={({ insert, remove, push }) => (
                                    <Form.Row>
                                        {values.certification.length > 0 &&
                                            values.certification.map((course, index) => (
                                                <React.Fragment>
                                                    <Form.Row as={Col} md="12" className={`relative-row ${index === values.certification.length - 1 ? 'last-row' : ''}`}>
                                                        <Form.Group controlId="formMobilesubject" as={Col} md="3">
                                                            <Form.Label>Year*</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                id="selectCourse"
                                                                name={`certification.${index}.year`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.certification[index].year}
                                                                isInvalid={
                                                                    touched.certification && touched.certification[index] && touched.certification[index].year && touched.certification[index].year
                                                                    && errors.certification && errors.certification[index] && errors.certification[index].year && errors.certification[index].year
                                                                }
                                                                custom
                                                            >
                                                                <option value="">--Year--</option>
                                                                {
                                                                    generateYearsTillToday().map((value, index) => (
                                                                        <option value={value} key={index}>{value}</option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.certification && errors.certification[index] ? errors.certification[index].year : ''}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group controlId="formMobilesubject" as={Col} md="5">
                                                            <Form.Label>Certification Name*</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name={`certification.${index}.name`}
                                                                placeholder="Ex: Certification Name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.certification[index].name}
                                                                autoComplete="off"
                                                                isInvalid={
                                                                    touched.certification && touched.certification[index] && touched.certification[index].name && touched.certification[index].name
                                                                    && errors.certification && errors.certification[index] && errors.certification[index].name && errors.certification[index].name
                                                                }
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.patents && errors.patents[index] ? errors.patents[index].name : ''}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group controlId="formMobile" as={Col} md="4">
                                                            <Form.Label>Certification Link</Form.Label>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`certification.${index}.link`}
                                                                    placeholder="Ex: https://www.google.com/"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.certification[index].link}
                                                                    autoComplete="off"
                                                                    isInvalid={
                                                                        touched.certification && touched.certification[index] && touched.certification[index].link && touched.certification[index].link
                                                                        && errors.certification && errors.certification[index] && errors.certification[index].link && errors.certification[index].link
                                                                    }
                                                                />
                                                                <InputGroup.Prepend
                                                                    onClick={() => remove(index)}>
                                                                    <InputGroup.Text id="inputGroupPrepend"><i
                                                                        class="fa fa-minus-circle close-icon"
                                                                        aria-hidden="true"
                                                                    >
                                                                    </i></InputGroup.Text>
                                                                </InputGroup.Prepend>
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.certification && errors.certification[index] ? errors.certification[index].link : ''}
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Form.Row>
                                                </React.Fragment>
                                            ))}
                                        <Form.Group as={Col} md="12">
                                            <Button
                                                variant="primary"
                                                type="button"
                                                onClick={() => push({
                                                    name: '',
                                                    year: '',
                                                    link: ''
                                                })}
                                                className='btn-theme-global'
                                            >
                                                <i
                                                    class="fa fa-plus"
                                                    aria-hidden="true"
                                                >
                                                </i>
                                                    Add Links
                                                </Button>
                                        </Form.Group>
                                    </Form.Row>
                                )}
                            />
                            <div className='btn-holder'>
                                <Button
                                    variant="primary"
                                    type="button"
                                    className='btn-theme-global-cancel'
                                    disabled={isSubmitting}
                                    onClick={certificationsModal}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting || (isEqual(certificationsObject, values.certification))}
                                    className='btn-theme-global'
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )
                    }
                </Formik >
            </Modal.Body>
        </Modal>
    )
};

export default CertForm;