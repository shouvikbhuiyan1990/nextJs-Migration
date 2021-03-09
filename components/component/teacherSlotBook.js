import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Calendar from '../common/calendar';
import { toggleModal } from "../../store/actions/joiningModal";
import { getCalendar, resetBookingFlow } from "../../store/actions/booking";
import Alert from 'react-bootstrap/Alert';
import ReactTooltip from 'react-tooltip';
import { getCurrencyFromLocale, getCountryFromLocale } from '../../utils/helpers';

import cookie from '../../utils/cookie';

import './teacherSlotBook.css';

const TeacherSlotBook = ({
    pricing,
    teacherId,
    isApprovedStudent,
    id
}) => {
    const docRef = useRef('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const showModal = useSelector(state => state.joinModal.showModal);
    const isLoggedIn = useSelector(state => state.registration.isLoggedIn);
    const calendarDataAll = useSelector(state => state.booking.availableData);
    const bookingStatus = useSelector(state => state.booking.bookingStatus);
    const paymentDetails = useSelector(state => state.booking.paymentDetails);
    let tileIterator = isApprovedStudent ? 2 : 1;



    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    function isObj(val) {
        return typeof val === 'object'
    }

    const stringifyValue = useCallback((val) => {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }, []);

    const buildForm = useCallback(({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form;
    }, [stringifyValue]);

    const post = useCallback((details) => {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }, [buildForm]);

    const bookASlot = () => {
        dispatch(resetBookingFlow());
        if (!isLoggedIn) {
            dispatch(toggleModal(!showModal, 'signin'))
        }
        else {
            dispatch(getCalendar(cookie.get('googleAuthId')[0], teacherId));
            setDisplayCalendar(true);
        }
    }

    useEffect(() => {
        if (bookingStatus === 'error') {
            setDisplayCalendar(false);
        }
        else if (bookingStatus === 'success') {
            sessionStorage.setItem('isBookingFlow', true);
            const information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: paymentDetails
            };

            post(information);
        }
    }, [bookingStatus, history, displayCalendar, post, paymentDetails])




    useEffect(() => {
        if (bookingStatus === 'error' && window.gapi) {
            window.gapi.client.calendar.events.delete({
                "calendarId": "primary",
                "eventId": sessionStorage.getItem('calendarEventId')
            })
                .then(function (response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                },
                    function (err) { console.error("Execute error", err); });
        }
    }, [bookingStatus]);

    const getTypeText = (index) => {
        if (index === 2) {
            return 'This price is applicable for assessment type booking';
        }
        else {
            return 'This price is applicable for full course booking';
        }
    }

    const getTileBody = () => {
        let returnHtml = [];
        while (tileIterator > 0) {
            returnHtml.push(

                <div className={`lo-tc-slot-book ${(tileIterator === 2 || !isApprovedStudent) ? 'no-sticky' : ''}`}>
                    {bookingStatus === 'error' &&
                        <Alert key="alertOTPFailure" variant={'danger'}>
                            Booking Failed, Please Try Again Later.
                        </Alert>
                    }
                    <Calendar
                        showInPopup
                        showCalendar={displayCalendar}
                        toggleCalendar={() => setDisplayCalendar(!displayCalendar)}
                        data={calendarDataAll}
                        courseId={id}
                    />
                    {/* <div className='info-tooltip'>
                        <i className="fa fa-info-circle" aria-hidden="true"  data-tip="we will use google calendar to set meetings, if access is not given for calendar, we will be unable to complete your booking"></i>
                    </div> */}
                    {!isApprovedStudent &&
                        < div className='price'>
                            <p>Price  <i className="fa fa-info-circle" aria-hidden="true" data-tip={"we need your google calendar access for booking"}></i></p>
                            <p>{`${getCurrencyFromLocale()} ${pricing[getCountryFromLocale()].price}`}</p>
                        </div>
                    }
                    {isApprovedStudent &&
                        <div className='price'>
                            <p>Price <i className="fa fa-info-circle" aria-hidden="true" data-tip={getTypeText(tileIterator)}></i></p>
                            {tileIterator === 2 &&
                                <div className='double-price'>
                                    <p className='strikethrough'>{`${getCurrencyFromLocale()} ${pricing[getCountryFromLocale()].price}`}</p>
                                    <p>{`${getCurrencyFromLocale()} ${pricing[`ASSMNT_${getCountryFromLocale()}`] ? pricing[`ASSMNT_${getCountryFromLocale()}`].price : 0}`}</p>
                                </div>
                            }
                            {tileIterator === 1 && <p>{`${getCurrencyFromLocale()} ${pricing[getCountryFromLocale()].price}`}</p>}
                        </div>
                    }
                    {!isApprovedStudent && <p className='desc'>Book a slot with Teacher Now. For booking a slot select an available time from teacher's calendar</p>}
                    {isApprovedStudent && tileIterator === 2 && <p className='desc'>Book <span className='bold'>assessment </span>with Teacher Now. For booking a slot select an available time from teacher's calendar</p>}
                    {isApprovedStudent && tileIterator === 1 && <p className='desc'>Book <span className='bold'>full course </span>with Teacher Now. For booking a slot select an available time from teacher's calendar</p>}
                    <div className='btn-holder'>
                        <button onClick={bookASlot} className='btn btn-custom'>Book Now</button>
                    </div>
                </div>
            );
            tileIterator--;
        }

        return returnHtml;
    }

    return (
        <div className={`lo-tc-slot-book-cont`} ref={docRef}>
            <ReactTooltip />
            <div className='sticky-div'>
                {
                    getTileBody()
                }
            </div>
        </div >
    )
};

export default TeacherSlotBook;


TeacherSlotBook.defaultProps = {
    pricing: {
        IN: {},
        US: {},
        ASSMNT_IN: {},
        ASSMNT_US: {}
    }
}