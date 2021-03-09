import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Calendar from '../common/calendar';
import { toggleModal } from "../../store/actions/joiningModal";
import { getCalendar, resetBookingFlow } from "../../store/actions/booking";
import Alert from 'react-bootstrap/Alert';
import ReactTooltip from 'react-tooltip';
import { getCurrencyFromLocale, getCountryFromLocale } from '../../utils/helpers';

import cookie from '../../utils/cookie';

const Styled = styles.div`
.lo-tc-slot-book {
    max-width: none;
    margin-top: 20px;
    margin: 20px 10px 0;
    border: 1px solid #ddd;
    padding: 20px 24px;
    align-self: flex-start;
    background-color: #fff;
    -webkit-box-shadow: 0px 8px 29px -14px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 8px 29px -14px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 8px 29px -14px rgba(0, 0, 0, 0.75);
}

.lo-tc-slot-book .fa.fa-info-circle {
    cursor: pointer;
}

.lo-tc-slot-book .bold {
    font-size: 1.1rem;
    font-weight: bolder;
    text-transform: uppercase;
}

.lo-tc-slot-book .info-tooltip {
    position: absolute;
    width: 100%;
    text-align: right;
    top: 0;
    right: 24px;
}

.lo-tc-slot-book .selection-course {
    display: flex;
}

.lo-tc-slot-book .selection-course>div:first-child {
    margin-right: 12px;
}

.lo-tc-slot-book .selection-course>div input {
    margin-right: 5px;
}

.lo-tc-slot-book .selection-course>div input, .lo-tc-slot-book .selection-course>div label {
    cursor: pointer;
}

.lo-tc-slot-book+p.slot-book-warning {
    margin: 25px 20px 0;
    max-width: 380px;
    text-align: justify;
}

.lo-tc-slot-book-cont.fixed-price {
    position: absolute;
    right: 32px;
    z-index: 5;
    background-color: #fff;
}

.lo-tc-slot-book .price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}

.lo-tc-slot-book .price p:last-child {
    font-family: 'lato-semibold';
    font-size: 18px;
}

.lo-tc-slot-book .desc {
    padding: 32px 0;
}

.lo-tc-slot-book .btn-custom, .lo-tc-slot-book .btn-custom:hover {
    background: #1dbf73;
    border-color: #1dbf73;
    color: #fff;
    width: 100%;
}

@media screen and (min-width: 1025px) {
    .lo-tc-slot-book {
        max-width: 400px;
        margin-top: 15px;
        padding: 20px 24px;
    }
    .lo-tc-slot-book.no-sticky {
        margin-top: 125px;
    }
    .sticky-div {
        position: sticky;
        top: 100px;
    }
    .lo-tc-slot-book p.slot-book-warning {
        margin: 25px auto 0;
        font-size: 12px;
    }
}
`;

// import './teacherSlotBook.css';

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
        <Styled>
            <div className={`lo-tc-slot-book-cont`} ref={docRef}>
                <ReactTooltip />
                <div className='sticky-div'>
                    {
                        getTileBody()
                    }
                </div>
            </div>
        </Styled>
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