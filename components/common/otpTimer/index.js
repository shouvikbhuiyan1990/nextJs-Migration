import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
.otpTime .text {
    margin-left: 6px;
}
`;

const OtpTimer = ({
    defaultTimeInMinutes = 2,
    cb = () => { },
    className,
    icon
}) => {
    const [time, setTime] = useState(parseInt(defaultTimeInMinutes * 60));

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        if (time === 0)
            clearInterval(interval);
        return () => {
            clearInterval(interval);
        }
    }, [time]);

    const makeDoubleDigit = (digit) => {
        if (digit.toString().length === 1)
            return `0${digit}`;
        else
            return digit;
    }

    const resendOtp = () => {
        setTime(parseInt(defaultTimeInMinutes * 60));
        cb();
    }

    return (
        <Styles>
            <button disabled={time > 0} className={`otpTime ${className}`} onClick={resendOtp}>
                {icon && icon}
                {time > 0 &&
                    <React.Fragment>
                        <span>{time > 60 ? parseInt(time / 60) : 0}</span>:
                    <span>{time > 60 ? makeDoubleDigit(time % 60) : makeDoubleDigit(time)}</span>
                    </React.Fragment>
                }
                <span className='text'>
                    Resend
            </span>
            </button>
        </Styles>
    )
}

export default OtpTimer;