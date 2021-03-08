import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import isEqual from 'lodash/isEqual';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const IntroductionForm = ({
    show,
    hideIntroModal,
    intro,
    intro: {
        name = '',
        slotTime = '',
        description = '',
        remarks = '',
        country = '',
        profileUrl = ''
    },
    formSubmit,
    isStudent
}) => {
    const optionsArray = [
        {
            key: 120,
            value: '2 Hours'
        },
        {
            key: 90,
            value: '1.5 Hours'
        },
        {
            key: 60,
            value: '1 Hours'
        },
        {
            key: 45,
            value: '45 Minutes'
        },
        {
            key: 30,
            value: '30 Minutes',
        },
        {
            key: 15,
            value: '15 Minutes'
        }
    ];
    const [imageUrl, setImgaeUrl] = useState(profileUrl);
    const imageRef = useRef('');
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("*Name is required"),
        slotTime: Yup.string()
            .required("*Slot Time is required"),
        remarks: Yup.string()
            .required("*Remarks is required"),
        description: Yup.string()
            .required("*Description is required"),
        country: Yup.string()
            .required("*Country is required")
    });

    useEffect(() => {
        setImgaeUrl(profileUrl)
    }, [profileUrl]);


    const checkIfFormIsChanged = (formValues) => {
        const introCopy = Object.assign({}, intro);
        delete introCopy.profileUrl;

        return (isEqual(formValues, introCopy) || (typeof (formValues.file) !== 'undefined' && formValues.file === ""));
    }

    return (
        <Modal
            show={show}
            onHide={hideIntroModal}
            centered={true}
            backdrop="static"
            className='intro-details-modal general-details-modal'
        >
            <Modal.Header closeButton>
                <p>Edit Introduction</p>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name,
                        slotTime: slotTime || "60",
                        description,
                        remarks,
                        country
                    }}
                    validationSchema={validationSchema}
                    onSubmit={
                        (values) => {
                            let obj = {};
                            for (let i in values) {
                                if (intro[i] !== values[i]) {
                                    obj[i] = values[i];
                                }
                            }
                            if (obj.file) {
                                delete obj.file;
                                obj.fileToUpload = imageRef.current.files[0];
                                formSubmit(obj, false, "", true);
                            }
                            else if (!obj.file) {
                                formSubmit(obj)
                            }
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
                            <div className='profile-picture'>
                                <div className='avatar' style={{ backgroundImage: `url(${imageUrl || profileUrl})` }}></div>
                                <div>
                                    <label for="file-upload" className="custom-file-upload">
                                        <i className="fa fa-cloud-upload"></i> Change Picture
                                    </label>
                                    <Form.File
                                        name="file"
                                        id="file-upload"
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
                                                setImgaeUrl(profileUrl);
                                            }
                                        }}
                                        isInvalid={!!errors.file}
                                        onBlur={handleBlur}
                                        value={values.file}
                                        ref={imageRef}
                                        feedback={errors.file}
                                        feedbackTooltip
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                            <Form.Group controlId="formName">
                                <Form.Label>Name*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Ex: John Wick"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    isInvalid={touched.name && errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formRemarks">
                                <Form.Label>Remarks*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="remarks"
                                    placeholder="Ex: I am a Jedi"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.remarks}
                                    isInvalid={touched.remarks && errors.remarks}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.remarks}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description*</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder="Ex: Some Good Things About Myself"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    isInvalid={touched.description && errors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Row>
                                {!isStudent &&
                                    <Form.Group controlId="formSlotTime" as={Col} md="6">
                                        <Form.Label>Slot Time*</Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="selectslotTime"
                                            name="slotTime"
                                            value={values.slotTime}
                                            onChange={handleChange}
                                            custom
                                            isInvalid={touched.slotTime && errors.slotTime}
                                        >
                                            <option value="">--Select--</option>
                                            {
                                                optionsArray.map((value, index) => <option key={index} value={value.key}>{value.value}</option>)
                                            }
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.slotTime}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }
                                <Form.Group controlId="formCountry" as={Col} md={isStudent ? "12" : "6"}>
                                    <Form.Label>Country*</Form.Label>
                                    <Form.Control
                                        as="select"
                                        id="selectcountry"
                                        name="country"
                                        value={values.country}
                                        onChange={handleChange}
                                        custom
                                        isInvalid={touched.country && errors.country}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="India">India</option>
                                        <option value="US">USA</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <div className='btn-holder'>
                                <Button
                                    variant="primary"
                                    type="button"
                                    className='btn-theme-global-cancel'
                                    disabled={isSubmitting}
                                    onClick={hideIntroModal}
                                >
                                    Cancel
                            </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting || checkIfFormIsChanged(values)}
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
        </Modal >
    )
}

export default IntroductionForm;