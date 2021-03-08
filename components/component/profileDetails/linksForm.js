import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const IntroductionForm = ({
    show,
    formSubmit,
    hideLinksModal,
    linkedInUrl,
    otherLinks
}) => {
    const linksRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;

    const validationSchema = Yup.object().shape({
        linkedInUrl: Yup.string()
            .required("*LinkedIn url is required")
            .matches(linksRegex, "Link is not valid. Ex: https://www.google.com/"),
        otherLinks: Yup.string()
            .matches(linksRegex, "Link is not valid. Ex: https://www.google.com/")
    });

    return (
        <Modal
            show={show}
            onHide={hideLinksModal}
            centered={true}
            backdrop="static"
            className='link-details-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>Edit External Links</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        linkedInUrl,
                        otherLinks
                    }}
                    validationSchema={validationSchema}
                    onSubmit={
                        (values) => {
                            let obj = {};
                            if (linkedInUrl !== values['linkedInUrl']) {
                                obj['linkedInUrl'] = values['linkedInUrl'];
                            }
                            else if (otherLinks !== values['otherLinks']) {
                                obj['otherLinks'] = values['otherLinks'];
                            }
                            formSubmit(obj)
                        }
                    }
                >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting }) => (
                        <Form onSubmit={handleSubmit} className="mx-auto">
                            <Form.Group controlId="formlinkedInUrl">
                                <Form.Label>LinkedIn Url*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="linkedInUrl"
                                    placeholder="LinkedIn Profile Url"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.linkedInUrl}
                                    isInvalid={touched.linkedInUrl && errors.linkedInUrl}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.linkedInUrl}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formotherLinks">
                                <Form.Label>Other Links</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="otherLinks"
                                    placeholder="Any other profile url in ext websites to showcase in profile"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.otherLinks}
                                    isInvalid={touched.otherLinks && errors.otherLinks}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.otherLinks}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className='btn-holder'>
                                <Button
                                    variant="primary"
                                    type="button"
                                    className='btn-theme-global-cancel'
                                    disabled={isSubmitting}
                                    onClick={hideLinksModal}
                                >
                                    Cancel
                            </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting || (values.linkedInUrl === linkedInUrl && values.otherLinks === otherLinks)}
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
}

export default IntroductionForm;