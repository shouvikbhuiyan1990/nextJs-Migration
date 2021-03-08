import React from "react";
import Confirm from '../component/confirm';
import ScrollToTopMenu from '../common/scrollToTopOnMount';

const ConfirmationPage = () => {
    return (
        <main>
            <ScrollToTopMenu />
            <Confirm />
        </main>
    );
};

export default ConfirmationPage;