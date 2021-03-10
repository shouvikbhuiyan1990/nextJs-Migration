import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckIfLoggedIn } from '../../../utils/helpers';

const DashboardHoc = (WrappedComponent) => {
    function HOC(props) {
        const router = useRouter();
        useEffect(() => {
            if (!CheckIfLoggedIn()) {
                router.replace('/');
            }
        }, []);
        return <WrappedComponent {...props} />
    }

    return HOC;
}

export default DashboardHoc;