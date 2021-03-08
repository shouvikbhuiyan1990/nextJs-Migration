import React from 'react';
import Link from 'next/link'
import Accounts from '../components/component/accounts';
import Header from '../components/common/header';
import styled from 'styled-components';
import GlobalFonts from './globals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Styles = styled.body`
  font-family: 'lato-regular';
`;


const PlaceHolderComponent = () => {
  
}

const Index = () => {

  return (
    <Styles>
      <GlobalFonts />
      <main className='root-main-content'>
        <Link href="/">
          <>
          <Header/>
          <Accounts />
          </>
        </Link>
      </main>
    </Styles>
  );
};

export default Index;