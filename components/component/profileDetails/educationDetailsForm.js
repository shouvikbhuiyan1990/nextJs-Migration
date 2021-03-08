import React from 'react';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { generateYearsWithFuture, generateYearsTillToday } from '../../../utils/helpers';

const EducationDetails = ({
    show,
    hideEducationModal,
    educationDetails,
    educationDetails: {
        school = '',
        degree = '',
        field = '',
        startyear = '',
        endyear = ''
    },
    formSubmit
}) => {
    const validationSchema = Yup.object().shape({
        school: Yup.string()
            .required("*school is required"),
        startyear: Yup.string()
            .required("*start year is required"),
        endyear: Yup.string()
            .required("*end year is required")
    });

    const checkIfFormIsChanged = (formValues) => {
        const eduCopy = Object.assign({}, educationDetails);
        delete eduCopy.id;
        delete eduCopy.teacherId

        return isEqual(formValues, eduCopy);
    }

    const checkDateRangeValidity = (val) => {
        const startDate = `01/01/${val.startyear}`;
        const endDate = `01/01/${val.endyear}`;
        if (val.startyear && val.endyear && dayjs(endDate) < dayjs(startDate)) {
            return false;
        }

        return true;
    }

    const submitThisForm = (values, isDeleteFlow) => {
        const startDate = `01/01/${values.startyear}`;
        const endDate = `01/01/${values.endyear}`;
        delete values.startyear;
        delete values.endyear;
        values.from = dayjs(startDate).toISOString();
        values.to = dayjs(endDate).toISOString();

        const bodyObject = {
            'educations': [
                { ...values, id: educationDetails.id, teacherId: educationDetails.teacherId, tempId: educationDetails.tempId }
            ]
        };

        const type = isDeleteFlow ? 'delete' : school ? 'edit' : 'new';

        formSubmit(bodyObject, true, 'educations', false, type);
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            onHide={hideEducationModal}
            centered={true}
            className='education-details-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>{!school ? 'Add Education' : 'Edit Education'}</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        school,
                        degree,
                        field,
                        startyear,
                        endyear
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        submitThisForm(values);
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
                            <Form.Group controlId="formSchool">
                                <Form.Label>School*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="school"
                                    placeholder="Ex: National Institute of Technology"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.school}
                                    isInvalid={touched.school && errors.school}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.school}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDegree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="degree"
                                    placeholder="Ex: Bachelor's"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.degree}
                                    isInvalid={touched.degree && errors.degree}
                                />
                            </Form.Group>
                            <Form.Group controlId="formfield">
                                <Form.Label>Field</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="field"
                                    placeholder="Ex: Computer Science"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.field}
                                    isInvalid={touched.field && errors.field}
                                />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group controlId="formCourseDuration" as={Col} md="6">
                                    <Form.Label>Start Year*</Form.Label>
                                    <Form.Control
                                        as="select"
                                        id="selectStartYear"
                                        name="startyear"
                                        value={values.startyear}
                                        onChange={handleChange}
                                        custom
                                        isInvalid={touched.startyear && errors.startyear}
                                    >
                                        <option value="">--Select--</option>
                                        {
                                            generateYearsTillToday(undefined, values.endyear).map((value, index) => (
                                                <option value={value} key={index}>{value}</option>
                                            ))
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.startyear}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPincode" as={Col} md="6">
                                    <Form.Label>End Year (Or Expected)*</Form.Label>
                                    <Form.Control
                                        as="select"
                                        id="selectEndYear"
                                        name="endyear"
                                        value={values.endyear}
                                        onChange={handleChange}
                                        custom
                                        isInvalid={touched.endyear && errors.endyear}
                                    >
                                        <option value="">--Select--</option>
                                        {
                                            generateYearsWithFuture(values.startyear).map((value, index) => (
                                                <option value={value} key={index}>{value}</option>
                                            ))
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.endyear}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            {!checkDateRangeValidity(values) &&
                                <Form.Row>
                                    <Form.Group className='date-range-error' controlId="formErrorDateRange" as={Col} md="12">
                                        <Form.Control.Feedback type="invalid">
                                            Invalid Date Range
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                            }
                            <div className={`btn-holder delete-variation ${!school ? 'justify-center' : ''}`}>
                                {school &&
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className='btn-theme-global-cancel'
                                        onClick={() => submitThisForm(values, true)}
                                    >
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </Button>
                                }
                                <div className='action-buttons'>
                                    <Button
                                        type="button"
                                        className='btn-theme-global-cancel'
                                        disabled={isSubmitting}
                                        onClick={hideEducationModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting || !checkDateRangeValidity(values) || checkIfFormIsChanged(values)}
                                        className='btn-theme-global'
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )
                    }
                </Formik >
            </Modal.Body>
        </Modal>
    )
}

export default EducationDetails;