import React from 'react';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import Layout from '../_Layout';
import styled from 'styled-components';
import GlobalFonts from '../_globals';
import CourseDetails from '../../components/containers/courseDetails';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.div`
  font-family: 'lato-regular';
`;

const Cources = () => {
    const router = useRouter()
    const { id } = router.query;

    return (
        <Styles>
            <GlobalFonts />
            <main className='root-main-content'>
                <Layout>
                    <CourseDetails id={id} />
                </Layout>
            </main>
        </Styles>
    );
};

export default Cources;
