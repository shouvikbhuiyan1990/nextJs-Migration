import React, { useState } from 'react';
import get from 'lodash/get';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import StarRatings from 'react-star-ratings';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { toogleFeedback, postFeedbacks } from '../../../store/actions/global';
import cookie from '../../../utils/cookie';
import dayjs from 'dayjs';

const FeedBack = ({
    isTeacher
}) => {
    const dispatch = useDispatch();
    const showFeedback = useSelector(state => state.global.showFeedback);
    const feedbackDetails = useSelector(state => state.global.feedbackDetails) || {};
    const feedbackStatus = useSelector(state => state.global.feedbackStatus);
    const [rating, setRating] = useState(0);
    const [feedbackTxt, setFeedbackTxt] = useState('');

    const feedBackSubmit = () => {
        const bodyObject = {
            bookingId: feedbackDetails.id,
            rating,
            feedbacks: [
                {
                    msg: feedbackTxt
                }
            ]
        };

        dispatch(postFeedbacks(cookie.get('googleAuthId')[0], bodyObject, isTeacher));
        setRating(0);
        setFeedbackTxt('');
    }

    const resetFeedbackForm = () => {
        setRating(0);
        setFeedbackTxt('');
        dispatch(toogleFeedback());
    }

    const changeRating = (value) => {
        setRating(value);
    }

    return (
        <Modal
            show={showFeedback}
            onHide={() => dispatch(toogleFeedback())}
            centered={true}
            className='feedback-modal'
            backdrop="static"
        >
            {
                feedbackStatus === 'loading' && <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }
            <Modal.Header closeButton>
                {`${get(feedbackDetails, 'teacher.name') || get(feedbackDetails, 'student.name')}'s Feedback`}
            </Modal.Header>
            <Modal.Body>
                <div className='feedback-form'>
                    <div className='centered-without-space'>
                        <div className='avatar' style={{ backgroundImage: `url(${get(feedbackDetails, 'teacher.profileUrl') || get(feedbackDetails, 'student.profileUrl')})` }}></div>
                        <h5>{`${get(feedbackDetails, 'course.subject') || ''}`}</h5>
                        <p>Course taken at {dayjs(feedbackDetails.startTime).format('DD/MM/YYYY hh:mma')}</p>
                        <StarRatings
                            rating={rating}
                            starRatedColor="#ffbf00"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension='45px'
                            starSpacing="5px"
                        />
                    </div>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Ex: What went good or what went bad"
                        onChange={(e) => { setFeedbackTxt(e.target.value) }}
                        value={feedbackTxt}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='buttons'>
                    <Button
                        type="button"
                        className='btn-theme-global'
                        disabled={!rating}
                        onClick={feedBackSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        className='btn-theme-global-cancel'
                        onClick={() => resetFeedbackForm()}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default FeedBack;