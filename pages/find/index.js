import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../_Layout';
import styled from 'styled-components';
import SearchLandingPage from '../../components/containers/searchLandingPage';
import GlobalFonts from '../_globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.body`
  font-family: 'lato-regular';
`;


const Find = () => {
    const router = useRouter()
    const { text, tag } = router.query;

    return (
        <Styles>
            <GlobalFonts />
            <main className='root-main-content'>
                <Layout>
                    <SearchLandingPage text={text} tag={tag} />
                </Layout>
            </main>
        </Styles>
    );
};

export default Find;
