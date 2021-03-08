import React, { Component } from "react";
import Slider from "react-slick";
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DateHolder from './dateHolder';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DayHolder from './dayHolder';
import { selectTimeSlotInFlexibleCalendar, resetUICalendar } from '../../../store/actions/booking';


var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

class CalendarMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    selectTimeForAvailability = (dayIndex, dateIndex, time) => {
        const { selectTimeSlotInFlexibleCalendar, teacherSlotTime } = this.props;

        selectTimeSlotInFlexibleCalendar(dayIndex, dateIndex, this.hourMapping(teacherSlotTime));
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    hourMapping = (value) => {
        return Number(Math.floor(value / 15));
    }

    hourMappingWithText = (value) => {
        switch (value) {
            case 120:
                return '2 Hours';
            case 90:
                return '1.5 Hours';
            case 60:
                return '1 Hour';
            case 45:
                return '45 Minutes';
            case 30:
                return '30 Minutes';
            case 15:
                return '15 Minutes';
            default:
                return '1 Hour';
        }
    }

    render() {
        const { totalNoOfDaysdata, calendarSelectionError, teacherSlotTime } = this.props;

        return (
            <div>
                {calendarSelectionError &&
                    <Alert key="alertOTPFailure" variant={'danger'} ref={(ref) => this.errorRef = ref}>
                        Your time selection is wrong, please select a time as per your slot preference, the selected time has to be within the same day. If a slot is already booked, you cannot make any changes to that.
                    </Alert>
                }
                {!this.props.bookingCalendar &&
                    <p>You can select <span className='bold'>{this.hourMappingWithText(teacherSlotTime)}</span> slot at a time to mark your availability. <Link to={`/dashboard`}>You can change this preference</Link></p>
                }
                <Slider
                    infinite={true}
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className='date-holder-conatiner'
                    beforeChange={() => { this.props.resetUICalendar() }}
                    responsive={[
                        {
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,

                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]}
                >
                    {
                        totalNoOfDaysdata.map((value, index) => (
                            <DateHolder
                                currentDate={dayjs().add(index, 'day')}
                                slots={value.slots}
                                isBookingCalendar={this.props.bookingCalendar}
                                hourMapping={this.hourMapping(teacherSlotTime)}
                            />
                        ))
                    }
                </Slider>
                <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                    className='day-holder-container'
                >
                    {
                        totalNoOfDaysdata.map((value, index) => (
                            <DayHolder
                                dayIndex={index}
                                slots={value.slots}
                                isBookingCalendar={this.props.bookingCalendar}
                                selectTime={this.selectTimeForAvailability}
                            />
                        ))
                    }
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    totalNoOfDaysdata: state.booking.totalNoOfDaysdata,
    calendarSelectionStartTime: state.booking.calendarSelectionStartTime,
    calendarSelectionEndTime: state.booking.calendarSelectionEndTime,
    calendarSelectionError: state.booking.calendarSelectionError,
    teacherSlotTime: state.booking.teacherSlotTime
})

const mapDispatchToProps = dispatch => bindActionCreators({
    selectTimeSlotInFlexibleCalendar,
    resetUICalendar
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarMain)