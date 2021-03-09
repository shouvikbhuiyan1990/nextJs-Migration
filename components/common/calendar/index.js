import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import get from 'lodash/get';
import CalenderBody from './calendarBody';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import GoogleCalendar from '../googleCalendar';
import { updateCalendar, bookSlot } from "../../../store/actions/booking";
import cookie from '../../../utils/cookie';


const Calendar = ({
    showInPopup,
    showCalendar,
    toggleCalendar,
    noOfDaysOfdata = 10,
    data,
    courseId
}) => {
    const [getGoogleCal, setGoogleCal] = useState(false);
    const dispatch = useDispatch();
    const calendarSelectionStartTime = useSelector(state => state.booking.calendarSelectionStartTime);
    const calendarSelectionEndTime = useSelector(state => state.booking.calendarSelectionEndTime);
    const selectedSlotId = useSelector(state => state.booking.selectedSlotId);
    const calendarFecthError = useSelector(state => state.booking.calendarFecthError);
    const bookingStatus = useSelector(state => state.booking.bookingStatus);

    const bookTime = () => {
        setGoogleCal(!getGoogleCal);
    }

    const onSuccessOfCalendar = (event) => {
        setGoogleCal(!getGoogleCal);
        let entryPoints = get(event, 'conferenceData.entryPoints');
        entryPoints = entryPoints ? entryPoints.filter((item) => item.entryPointType === 'video') : [];
        const body = {
            "courseId": courseId,
            "slotId": selectedSlotId,
            "pricingCountry": "IN",
            "meetLink": entryPoints[0].uri || event.htmlLink
        };
        sessionStorage.setItem('calendarLink', event.htmlLink);
        sessionStorage.setItem('calendarEventId', event.id);

        dispatch(bookSlot(cookie.get('googleAuthId')[0], body));
    }

    const onErrorOfCalendar = (event) => {
        setGoogleCal(false);
    }

    if (showInPopup && !calendarFecthError) {
        return (
            <Modal
                show={showCalendar}
                onHide={toggleCalendar}
                centered={true}
                className='calendar-modal'
                backdrop="static"
            >
                {
                    bookingStatus === 'loading' && <div className='loader'>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                <GoogleCalendar
                    initCalendar={getGoogleCal}
                    onSuccess={onSuccessOfCalendar}
                    onError={onErrorOfCalendar}
                    startTime={calendarSelectionStartTime}
                    endTime={calendarSelectionEndTime}
                    isError={bookingStatus === 'error'}
                />
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <CalenderBody
                        availableData={data}
                        noOfDaysOfdata={noOfDaysOfdata}
                        bookingCalendar
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className='buttons'>
                        <Button
                            type="button"
                            className='btn-theme-global'
                            disabled={!selectedSlotId}
                            onClick={bookTime}
                        >
                            Book Slot
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
    else if (!calendarFecthError) {
        return (
            <div className='calendar-modal'>
                <CalenderBody
                    availableData={data}
                    noOfDaysOfdata={noOfDaysOfdata}
                />
                <div className='btn-holder'>
                    <div className='info-status'>
                        <div className='info available'>
                            <p className='color'></p>
                            <p className='status'>Available</p>
                        </div>
                        <div className='info booked'>
                            <p className='color'></p>
                            <p className='status'>Booked</p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <Button
                            variant="danger"
                            type="button"
                            className='btn-theme-global-cancel'
                            disabled={!selectedSlotId}
                            onClick={() => { dispatch(updateCalendar(cookie.get('googleAuthId')[0], { calendarSelectionStartTime, calendarSelectionEndTime }, true, selectedSlotId)) }}
                        >
                            Mark Unavailable
                        </Button>
                        <Button
                            variant="danger"
                            type="button"
                            className='btn-theme-global'
                            disabled={!calendarSelectionStartTime && !calendarSelectionEndTime}
                            onClick={() => { dispatch(updateCalendar(cookie.get('googleAuthId')[0], { calendarSelectionStartTime, calendarSelectionEndTime }, false)) }}
                        >
                            Mark Available
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
    else if (calendarFecthError) {
        return (
            <Alert key={"WarningPendingProfile"} variant={"warning"}>
                Unable to load calendar data. Check if your profile is approved by admin. If already approved, please refresh the page and try again.
            </Alert>
        )
    }
}

export default Calendar;