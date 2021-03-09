import React from 'react';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import Layout from '../../_Layout';
import styled from 'styled-components';
import GlobalFonts from '../../_globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.body`
  font-family: 'lato-regular';
`;



const Details = dynamic(
    () => {
        return import("../../../components/containers/courseLandingPageByUser");
    },
    { ssr: false }
);

const Teacher = () => {
    const router = useRouter()
    const { id } = router.query;

    return (
        <Styles>
            <GlobalFonts />
            <main className='root-main-content'>
                <Layout>
                    <Details id={id} />
                </Layout>
            </main>
        </Styles>
    );
};

export default Teacher;
