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

const PatentForm = ({
    show,
    patentsModal,
    patentsObject,
    formSubmit,
}) => {

    const linksRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;

    const validationSchema = Yup.object().shape({
        patents: Yup.array()
            .of(
                Yup.object().shape({
                    link: Yup.string()
                        .matches(linksRegex, "Link is not valid. Ex: https://www.google.com/"),
                    name: Yup.string()
                        .required("*Patent name is required")
                })
            )
    });

    const patents = patentsObject;

    return (
        <Modal
            show={show}
            onHide={patentsModal}
            centered={true}
            backdrop="static"
            className='highights-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>Edit patents</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ patents }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        formSubmit(values, true, 'patents');
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
                                name="patents"
                                render={({ insert, remove, push }) => (
                                    <Form.Row>
                                        {values.patents.length > 0 &&
                                            values.patents.map((course, index) => (
                                                <React.Fragment>
                                                    <Form.Row as={Col} md="12" className={`relative-row ${index === values.patents.length - 1 ? 'last-row' : ''}`}>
                                                        <Form.Group controlId="formMobilesubject" as={Col} md="3">
                                                            <Form.Label>Year*</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                id="selectCourse"
                                                                name={`patents.${index}.year`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.patents[index].year}
                                                                isInvalid={
                                                                    touched.patents && touched.patents[index] && touched.patents[index].year && touched.patents[index].year
                                                                    && errors.patents && errors.patents[index] && errors.patents[index].year && errors.patents[index].year
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
                                                                {errors.patents && errors.patents[index] ? errors.patents[index].year : ''}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group controlId="formMobilesubject" as={Col} md="5">
                                                            <Form.Label>Patent Name*</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name={`patents.${index}.name`}
                                                                placeholder="Ex: Patent Name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.patents[index].name}
                                                                autoComplete="off"
                                                                isInvalid={
                                                                    touched.patents && touched.patents[index] && touched.patents[index].name && touched.patents[index].name
                                                                    && errors.patents && errors.patents[index] && errors.patents[index].name && errors.patents[index].name
                                                                }
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.patents && errors.patents[index] ? errors.patents[index].name : ''}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group controlId="formMobile" as={Col} md="4">
                                                            <Form.Label>Link Text</Form.Label>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`patents.${index}.link`}
                                                                    placeholder="Ex: https://www.google.com/"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.patents[index].link}
                                                                    autoComplete="off"
                                                                    isInvalid={
                                                                        touched.patents && touched.patents[index] && touched.patents[index].link && touched.patents[index].link
                                                                        && errors.patents && errors.patents[index] && errors.patents[index].link && errors.patents[index].link
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
                                                                    {errors.patents && errors.patents[index] ? errors.patents[index].link : ''}
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
                                                    year: '',
                                                    name: '',
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
                                    onClick={patentsModal}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting || (isEqual(patentsObject, values.patents))}
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

export default PatentForm;