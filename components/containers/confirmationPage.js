import React from "react";
import Confirm from '../component/confirm';
import ScrollToTopMenu from '../common/scrollToTopOnMount';
import Styles from './container';

const ConfirmationPage = () => {
    return (
        <Styles>
            <main>
                <ScrollToTopMenu />
                <Confirm />
            </main>
        </Styles>
    );
};

export default ConfirmationPage;