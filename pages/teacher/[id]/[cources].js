import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../_Layout';
import CourseLandingByUser from '../../../components/containers/courseLandingPageByUser';
import styled from 'styled-components';
import GlobalFonts from '../../_globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.body`
  font-family: 'lato-regular';
`;


const Teacher = () => {
    const router = useRouter()
    const { id } = router.query;

    return (
        <Styles>
            <GlobalFonts />
            <main className='root-main-content'>
                <Layout>
                    <CourseLandingByUser id={id} />
                </Layout>
            </main>
        </Styles>
    );
};

export default Teacher;