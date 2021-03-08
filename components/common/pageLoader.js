import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './pageLoader.css';

const PageLoader = ({
    show
}) => {
    if (show) {
        return (
            <div className='page-loader'>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }
    else
        return <React.Fragment></React.Fragment>
};

export default PageLoader;
