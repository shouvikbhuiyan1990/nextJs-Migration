import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Styles = styled.div`
.page-loader {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 1090;
}
`;

const PageLoader = ({
    show
}) => {
    if (show) {
        return (
            <Styles>
                <div className='page-loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </Styles>
        )
    }
    else
        return <React.Fragment></React.Fragment>
};

export default PageLoader;
