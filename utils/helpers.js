import cookie from './cookie';
import dayjs from 'dayjs';

export const logout = () => {
    cookie.delete('googleAuthId');
    cookie.delete('profileImageUrl');
    cookie.delete('userType');
    cookie.delete('userName');
    window.location.href = '/';
}

export const CheckIfLoggedIn = () => {
    return !!cookie.get('googleAuthId')[0];
}

export const getCountryFromLocale = () => {
    if (cookie.get('locale')[0] === 'en-US') {
        return 'US';
    }
    return 'IN';
}

export const getCurrencyFromLocale = () => {
    if (cookie.get('locale')[0] === 'en-US') {
        return 'USD';
    }
    return 'INR';
}

export const generateYearsWithFuture = (refYear, refStartYear) => {
    let arr = [];
    let startYear = refYear || 1970;

    const currentYear = refStartYear || Number(dayjs().format('YYYY'));

    while (startYear <= currentYear + 4) {
        arr.push(startYear);
        startYear++;
    }

    return arr.reverse();
}

export const generateYearsTillToday = (refYear, refStartYear) => {
    let arr = [];
    let startYear = refYear || 1970;
    const currentYear = refStartYear || Number(dayjs().format('YYYY'));

    while (startYear <= currentYear) {
        arr.push(startYear);
        startYear++;
    }

    return arr.reverse();
}

export const generateMonths = (yearRef) => {
    let arr = [];
    let startMonth = 0;
    let range = 12;
    if (yearRef === dayjs().get('y').toString()) {
        range = Number(dayjs().get('M')) + 1;
    }
    let monthMapptingArray = [
        {
            key: 1,
            value: 'Jan'
        },
        {
            key: 2,
            value: 'Feb'
        },
        {
            key: 3,
            value: 'Mar'
        },
        {
            key: 4,
            value: 'Apr'
        },
        {
            key: 5,
            value: 'May'
        },
        {
            key: 6,
            value: 'Jun'
        },
        {
            key: 7,
            value: 'Jul'
        },
        {
            key: 8,
            value: 'Aug'
        },
        {
            key: 9,
            value: 'Sep'
        },
        {
            key: 10,
            value: 'Oct'
        },
        {
            key: 11,
            value: 'Nov'
        },
        {
            key: 12,
            value: 'Dec'
        }
    ];

    while (startMonth < range) {
        arr.push(monthMapptingArray[startMonth]);
        startMonth++;
    }

    return arr;
}


export const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}