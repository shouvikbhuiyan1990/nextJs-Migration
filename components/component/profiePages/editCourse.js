import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addUpdateNewCourse } from '../../../store/actions/cources';
import cookie from '../../../utils/cookie';
import { roundToTwo } from '../../../utils/helpers';

const EditCourse = ({
    showForm,
    hideEditForm,
    courseFields,
    teacherName,
    isRequestFlow,
    isCourseAddForm,

}) => {
    const dispatch = useDispatch();

    const priceFormat = /^(\d*[.]\d*|\d*)?$/;

    const validationSchema = Yup.object().shape({
        subject: Yup.string()
            .required("*Subject is required"),
        description: Yup.string()
            .min(20, "*Description should be longer than 20 characters")
            .required("*Description is required"),
        price1: Yup.string()
            .required("*Price is required")
            .matches(priceFormat, "Price format not valid, formatting not allowed"),
        price2: Yup.string()
            .required("*Price is required")
            .matches(priceFormat, "Price format not valid, formatting not allowed"),
        currency: Yup.string()
            .required("*Select a currency"),
        currency2: Yup.string()
            .required("*Select a currency")
    });

    const hideForm = () => {
        setImageUrl('');
        hideEditForm();
    }

    useEffect(() => {
        setImageUrl(courseFields.iconUrl)
    }, [courseFields.iconUrl]);

    const imageRef = useRef('');
    const [imageUrl, setImageUrl] = useState(courseFields.iconUrl);

    return (
        <Modal
            show={showForm}
            onHide={hideForm}
            centered={true}
            className='edit-course-modal'
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>{isCourseAddForm ? 'Add Course' : 'Edit Course'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        subject: courseFields.subject || 'Math',
                        topic: courseFields.topic,
                        description: courseFields.description,
                        price1: courseFields.pricing && courseFields.pricing.IN ? courseFields.pricing.IN.price : '',
                        price2: courseFields.pricing && courseFields.pricing.US ? courseFields.pricing.US.price : '',
                        currency: 'IN',
                        currency2: 'USD'
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        if (isCourseAddForm) {
                            dispatch(addUpdateNewCourse(cookie.get('googleAuthId')[0], JSON.stringify(values), imageRef.current.files[0], teacherName, false));
                        }
                        else {
                            let updateObj = {
                                updateData: {}
                            };

                            for (let i in values) {
                                if (courseFields[i] !== values[i]) {
                                    updateObj.updateData[i] = values[i];
                                }
                            }
                            isRequestFlow ? updateObj.requestId = courseFields.id : updateObj.courseId = courseFields.courseId || courseFields.id;
                            if (updateObj.updateData.price1 || updateObj.updateData.price2) {
                                updateObj.updateData.pricing = {};
                            }
                            if (updateObj.updateData.price1) {
                                updateObj.updateData.pricing['IN'] = {};
                                updateObj.updateData.pricing['IN'].price = roundToTwo(updateObj.updateData.price1);
                            }
                            if (updateObj.updateData.price2) {
                                updateObj.updateData.pricing['US'] = {};
                                updateObj.updateData.pricing['US'].price = roundToTwo(updateObj.updateData.price2);
                            }
                            delete updateObj.updateData.file;
                            delete updateObj.updateData.currency;
                            delete updateObj.updateData.currency2;
                            delete updateObj.updateData.price1;
                            delete updateObj.updateData.price2;
                            dispatch(addUpdateNewCourse(cookie.get('googleAuthId')[0], JSON.stringify(updateObj), imageRef.current.files[0], teacherName, true, isRequestFlow));
                        }
                        // hideEditForm();
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
                            <Form.Group controlId="formNameIamage">
                                {(imageUrl || courseFields.iconUrl) &&
                                    <div className='image-preview' style={{ backgroundImage: `url(${imageUrl || courseFields.iconUrl})` }}></div>
                                }
                                <Form.File
                                    name="file"
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (e.target.files[0]) {
                                            var file = e.target.files[0];
                                            var reader = new FileReader();
                                            reader.readAsDataURL(file);

                                            reader.onloadend = (e) => {
                                                setImageUrl([reader.result]);
                                            }
                                        }
                                        else {
                                            setImageUrl('');
                                        }
                                    }}
                                    isInvalid={!!errors.file}
                                    onBlur={handleBlur}
                                    value={values.file}
                                    ref={imageRef}
                                    feedback={errors.file}
                                    id="validationFormik107"
                                    feedbackTooltip
                                    accept="image/*"
                                />
                            </Form.Group>
                            <Form.Group controlId="formdPricing" as={Row} style={{ marginBottom: 0 }}>
                                <Form.Group controlId="formdPricing" as={Col} md="8">
                                    <Form.Group controlId="formName">
                                        <Form.Control
                                            as="select"
                                            id="selectMobileSubject"
                                            name="subject"
                                            value={values.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.subject && errors.subject}
                                            custom
                                        >
                                            <option value="Math">Math</option>
                                            <option value="Physics">Physics</option>
                                            <option value="Geo">Geo</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.subject}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group controlId="formdPricing" as={Col} md="4">
                                    <Form.Group controlId="formName">
                                        <Form.Control
                                            type="text"
                                            name="topic"
                                            placeholder="Topic"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.topic}
                                            isInvalid={touched.topic && errors.topic}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.topic}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group controlId="formdDescription">
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    isInvalid={touched.description && errors.description}
                                    autoComplete="off"
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formdPricing" as={Row}>
                                <Form.Group controlId="formdPricing" as={Col} md="4">
                                    <Form.Control
                                        as="select"
                                        id="selectMobilecurrency"
                                        name="currency"
                                        value={values.currency}
                                        onChange={handleChange}
                                        isInvalid={touched.currency && errors.currency}
                                        onBlur={handleBlur}
                                        custom
                                    >
                                        <option value="IN">INR</option>
                                        <option value="USD">USD</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.currency}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formdPrice" as={Col} md="8">
                                    <Form.Control
                                        type="text"
                                        name="price1"
                                        placeholder="Price"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price1}
                                        isInvalid={touched.price1 && errors.price1}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price1}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group controlId="formdPricing" as={Row}>
                                <Form.Group controlId="formdPricing" as={Col} md="4">
                                    <Form.Control
                                        as="select"
                                        id="selectMobilecurrency"
                                        name="currency2"
                                        value={values.currency2}
                                        onChange={handleChange}
                                        isInvalid={touched.currency2 && errors.currency2}
                                        onBlur={handleBlur}
                                        custom
                                    >
                                        <option value="USD">USD</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.currency2}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formdPrice" as={Col} md="8">
                                    <Form.Control
                                        type="text"
                                        name="price2"
                                        placeholder="Price"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price2}
                                        isInvalid={touched.price2 && errors.price2}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price2}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                            <Button className='btn-theme-global' variant="primary" type="submit" disabled={isSubmitting}>
                                {isCourseAddForm ? 'Add Course' : 'Update Course'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

EditCourse.defaultProps = {
    courseFields: {
        pricing: {
            IN: {
                Price: ''
            }
        }
    }
};

export default EditCourse;