import React from 'react';

import { Formik, FieldArray } from 'formik';
import isEqual from 'lodash/isEqual';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const HighlightsForm = ({
    show,
    hideHighlightsModal,
    highlightsObject,
    formSubmit,
}) => {

    const phoneRegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;

    const validationSchema = Yup.object().shape({
        accomplishments: Yup.array()
            .of(
                Yup.object().shape({
                    value: Yup.string()
                        .required("*Link value is required")
                        .matches(phoneRegExp, "Link is not valid. Ex: https://www.google.com/")
                })
            )
    });

    const accomplishments = highlightsObject;

    return (
        <Modal
            show={show}
            onHide={hideHighlightsModal}
            centered={true}
            backdrop="static"
            className='highights-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>Links to Highlight</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ accomplishments }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        formSubmit(values, true, 'accomplishments');
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
                                name="accomplishments"
                                render={({ insert, remove, push }) => (
                                    <Form.Row>
                                        {values.accomplishments.length > 0 &&
                                            values.accomplishments.map((course, index) => (
                                                <React.Fragment>
                                                    <Form.Row as={Col} md="12" className={`relative-row ${index === values.accomplishments.length - 1 ? 'last-row' : ''}`}>
                                                        <Form.Group controlId="formMobilesubject" as={Col} md="5">
                                                            <Form.Label>Type</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                id="selectCourse"
                                                                name={`accomplishments.${index}.type`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.accomplishments[index].type}
                                                                custom
                                                            >
                                                                <option value="link">Link</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId="formMobile" as={Col} md="7">
                                                            <Form.Label>Link Text</Form.Label>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`accomplishments.${index}.value`}
                                                                    placeholder="Ex: https://www.google.com/"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.accomplishments[index].value}
                                                                    autoComplete="off"
                                                                    isInvalid={
                                                                        touched.accomplishments && touched.accomplishments[index] && touched.accomplishments[index].value && touched.accomplishments[index].value
                                                                        && errors.accomplishments && errors.accomplishments[index] && errors.accomplishments[index].value && errors.accomplishments[index].value
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
                                                                    {errors.accomplishments && errors.accomplishments[index] ? errors.accomplishments[index].value : ''}
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
                                                    type: 'link',
                                                    value: ''
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
                                    onClick={hideHighlightsModal}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting || (isEqual(highlightsObject, values.accomplishments))}
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

export default HighlightsForm;