import React from 'react';
import Layout from './_Layout';
import Notifications from '../components/containers/notificationsLanding';
import styled from 'styled-components';
import GlobalFonts from './_globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.div`
  font-family: 'lato-regular';
`;


const Experts = () => {

    return (
        <Styles>
            <GlobalFonts />
            <main className='root-main-content'>
                <Layout>
                    <Notifications />
                </Layout>
            </main>
        </Styles>
    );
};

export default Experts;
