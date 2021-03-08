import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FirstForm = ({
    name,
    email,
    updateFormObject,
    goBackToLastStep,
    initRegistrationStepValue
}) => {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required")
    });

    return (
        <Formik
            initialValues={{
                name: name,
                email: email
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
                    <Form.Group controlId="formName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            isInvalid={touched.name && errors.name}
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            disabled
                            isInvalid={touched.email && errors.email}
                            autoComplete="off"
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className='btn-holder'>
                        {initRegistrationStepValue !== 1 &&
                            <Button
                                variant="primary"
                                type="button"
                                disabled={isSubmitting}
                                className="btn-theme-global-cancel"
                                onClick={() => goBackToLastStep(undefined)}
                            >
                                Back
                            </Button>
                        }
                        <Button
                            className='single-button btn-custom'
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}>
                            Next
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

export default FirstForm;