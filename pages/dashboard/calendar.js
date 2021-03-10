import React from 'react';
import dynamic from "next/dynamic";
import Layout from '../_Layout';
import styled from 'styled-components';
import GlobalFonts from '../_globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.div`
  font-family: 'lato-regular';
`;

const Calendar = dynamic(
    () => {
        return import("../../components/containers/userDashboard/teacherCalendar");
    },
    { ssr: false }
);


const Index = () => {

    return (
        <Styles>
            <GlobalFonts />
            <main className='root-main-content'>
                <Layout>
                    <Calendar />
                </Layout>
            </main>
        </Styles>
    );
};

export default Index;
