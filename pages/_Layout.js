
import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const Layout = (props) => (
    <>
        <Header />
        {props.children}
        <Footer />
    </>
);

export default Layout;