'use Stritct';

export default {
    get: function (key) {
        if (typeof window !== undefined && typeof document !== undefined && typeof document.cookie !== undefined) {
            let cookieSet = document.cookie.split('; '),
                cookieArray = cookieSet.filter((cookie) => {
                    return cookie.indexOf(`${key}=`) === 0
                }),
                cookie = cookieArray[0];
            return cookie
                ? cookie.split(`${key}=`)[1] !== ''
                    ? cookie.split(`${key}=`)[1].replace(/(^[|\s]+)|([|\s]+$)/g, '').split('|')
                    : []
                : []
        }

        return [];
    },
    create: function (key, value, expiryDays = 90) {
        if (typeof window !== undefined) {
            let currentDate = new Date(),
                expiryDate = new Date(currentDate.getTime() + expiryDays * 24 * 60 * 60 * 1000),
                newCookie = `${key}=${value};path=/;expires=${expiryDate}`;

            document.cookie = newCookie;

            return true;
        }

        return false;
    },

    delete: function (key, domain = null, path = '/') {
        if (typeof window !== undefined) {
            const domainPart = domain ? `domain=${domain};` : '';

            document.cookie = `${key}=;${domainPart}path=${path};expires=Thu, 01 Jan 1970 00:00:01 GMT`;

            return true;
        }

        return false;
    }
}