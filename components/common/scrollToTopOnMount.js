import React, { useEffect } from 'react';

const ScrollToTopOnMount = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <React.Fragment></React.Fragment>
}

export default ScrollToTopOnMount;