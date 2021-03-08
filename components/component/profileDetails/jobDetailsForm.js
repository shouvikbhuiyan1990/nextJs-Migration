import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { generateMonths, generateYearsTillToday } from '../../../utils/helpers';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';

const JobDetails = ({
    show,
    hideJobDetailsModal,
    experienceDetails,
    experienceDetails: {
        company = '',
        title = '',
        startYear = '',
        startMonth = '',
        endMonth = '',
        endYear = '',
    },
    formSubmit
}) => {
    const validationSchema = Yup.object().shape({
        company: Yup.string()
            .required("*Company name is required"),
        title: Yup.string()
            .required("*Please enter your title"),
        startYear: Yup.string()
            .required("*Start year is required"),
        startMonth: Yup.string()
            .required("*Start month is required"),
        endYear: Yup.string()
            .required("*End year is required"),
        endMonth: Yup.string()
            .required("*End month is required")
    });

    const checkIfFormIsChanged = (formValues) => {
        const expCopy = Object.assign({}, experienceDetails);
        delete expCopy.id;
        delete expCopy.teacherId;

        return isEqual(formValues, expCopy);
    }

    const submitThisForm = (values, isDeleteFlow) => {
        const startDate = `${values.startMonth}/01/${values.startYear}`;
        const endDate = `${values.endMonth}/01/${values.endYear}`;
        delete values.startMonth;
        delete values.startYear;
        delete values.endMonth;
        delete values.endYear;
        values.from = dayjs(startDate).toISOString();
        if (values.isPresent) {
            values.to = ''
        }
        else {
            values.to = dayjs(endDate).toISOString();
        }

        delete values.isPresent;

        const bodyObject = {
            'experiences': [
                { ...values, id: experienceDetails.id, teacherId: experienceDetails.teacherId, tempId: experienceDetails.tempId }
            ]
        };

        const type = isDeleteFlow ? 'delete' : company ? 'edit' : 'new';

        formSubmit(bodyObject, true, 'experiences', false, type);
    }

    const checkDateRangeValidity = (val) => {
        const startDate = `01/${val.startMonth}/${val.startYear}`;
        const endDate = `01/${val.endMonth}/${val.endYear}`;
        if (val.startMonth && val.endMonth && val.startYear && val.endYear && dayjs(endDate) < dayjs(startDate)) {
            return false;
        }
        else if ((dayjs(startDate) > dayjs()) || (dayjs(endDate) > dayjs())) {
            return false;
        }

        return true;
    }


    return (
        <Modal
            show={show}
            onHide={hideJobDetailsModal}
            centered={true}
            backdrop="static"
            className='job-details-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>{!company ? 'Add Experience' : 'Edit Experience'}</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        company,
                        title,
                        startYear,
                        startMonth,
                        endMonth,
                        endYear,
                        isPresent: false
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
                        isSubmitting }) => {
                        const handleCheckBoxChange = (e) => {
                            if (e.target.value === 'false') {
                                values.endMonth = Number(dayjs().format('M')) + 1;
                                values.endYear = dayjs().format('YYYY');
                            }
                            handleChange(e);
                        }
                        return (
                            <Form onSubmit={handleSubmit} className="mx-auto">
                                <Form.Group controlId="formPosition">
                                    <Form.Label>Position*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Ex: Relationship Manager"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        isInvalid={touched.title && errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formCompany">
                                    <Form.Label>Company Name*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="company"
                                        placeholder="Ex: Conzult"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company}
                                        isInvalid={touched.company && errors.company}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.company}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        type="checkbox"
                                        label="Currently Working here"
                                        name="isPresent"
                                        value={values.isPresent}
                                        onChange={handleCheckBoxChange}
                                    />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group controlId="formStartDate" as={Col} md="6">
                                        <Form.Label>Start Date*</Form.Label>
                                        <Form.Row>
                                            <Form.Group controlId="formCourseDuration" as={Col} md="6">
                                                <Form.Control
                                                    as="select"
                                                    id="selectstartMonth"
                                                    name="startMonth"
                                                    value={values.startMonth}
                                                    onChange={handleChange}
                                                    custom
                                                    isInvalid={touched.startMonth && errors.startMonth}
                                                >
                                                    <option value="">Month</option>
                                                    {
                                                        generateMonths(values.startYear).map((value, index) => (
                                                            <option value={value.key} key={index}>{value.value}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.startMonth}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="formCourseDuration" as={Col} md="6">
                                                <Form.Control
                                                    as="select"
                                                    id="selectStartYear"
                                                    name="startYear"
                                                    value={values.startYear}
                                                    onChange={handleChange}
                                                    custom
                                                    isInvalid={touched.startYear && errors.startYear}
                                                >
                                                    <option value="">Year</option>
                                                    {
                                                        generateYearsTillToday(undefined, values.endYear).map((value, index) => (
                                                            <option value={value} key={index}>{value}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.startYear}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group controlId="formEndDate" as={Col} md="6">
                                        <Form.Label>End Date*</Form.Label>
                                        {values.isPresent &&
                                            <div>
                                                <Form.Label>Present</Form.Label>
                                            </div>
                                        }
                                        {!values.isPresent &&
                                            <Form.Row>
                                                <Form.Group controlId="formCourseDuration" as={Col} md="6">
                                                    <Form.Control
                                                        as="select"
                                                        id="selectendMonth"
                                                        name="endMonth"
                                                        value={values.endMonth}
                                                        onChange={handleChange}
                                                        custom
                                                        isInvalid={touched.endMonth && errors.endMonth}
                                                    >
                                                        <option value="">Month</option>
                                                        {
                                                            generateMonths(values.endYear).map((value, index) => (
                                                                <option value={value.key} key={index}>{value.value}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.endMonth}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="formCourseDuration" as={Col} md="6">
                                                    <Form.Control
                                                        as="select"
                                                        id="selectendYear"
                                                        name="endYear"
                                                        value={values.endYear}
                                                        onChange={handleChange}
                                                        custom
                                                        isInvalid={touched.endYear && errors.endYear}
                                                    >
                                                        <option value="">Year</option>
                                                        {
                                                            generateYearsTillToday(values.startYear).map((value, index) => (
                                                                <option value={value} key={index}>{value}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.endYear}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Form.Row>
                                        }
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
                                <div className={`btn-holder delete-variation ${!company ? 'justify-center' : ''}`}>
                                    {company &&
                                        <Button
                                            type="button"
                                            className='btn-theme-global-cancel'
                                            onClick={() => submitThisForm(values, true)}
                                        >
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </Button>
                                    }
                                    <div className='action-buttons'>
                                        <Button
                                            variant="primary"
                                            type="button"
                                            className='btn-theme-global-cancel'
                                            disabled={isSubmitting}
                                            onClick={hideJobDetailsModal}
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
                    }
                </Formik >
            </Modal.Body>
        </Modal>
    )
}

export default JobDetails;