import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const DecidingRoleForm = ({
    updateFormObject,
    loginAsStudent,
    loginAsTeacher
}) => {
    return (
        <Formik>
            {({
                handleSubmit,
            }) => (
                <Form onSubmit={handleSubmit} className="mx-auto">
                    <div className='btn-holder custom'>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={() => { loginAsTeacher(); updateFormObject() }}
                        >
                            <i className="fa fa-book" aria-hidden="true"></i> I am a Teacher
                        </Button>
                        <Button
                            className='single-button btn-custom'
                            variant="primary"
                            type="button"
                            onClick={() => { loginAsStudent(); updateFormObject(); }}
                        >
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i> I am a Student
                    </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default DecidingRoleForm;