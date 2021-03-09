import React from 'react';
import Link from 'next/link'
import Hero from '../components/component/hero';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import styled from 'styled-components';
import GlobalFonts from './globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.body`
  font-family: 'lato-regular';
`;


const PlaceHolderComponent = (props) => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
)

const Index = () => {

  return (
    <Styles>
      <GlobalFonts />
      <main className='root-main-content'>
        <Link href="/">
          <PlaceHolderComponent>
            <Hero />
          </PlaceHolderComponent>
        </Link>
      </main>
    </Styles>
  );
};

export default Index;
