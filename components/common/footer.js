import React from 'react';
import dayjs from 'dayjs';

import logo from '../../images/logo.png';
import twLogo from '../../images/twitter-logo.svg';
import fbLogo from '../../images/facebook-logo.svg';
import insLogo from '../../images/instagram-logo.svg';
import pinLogo from '../../images/pinterest-logo.svg';
import lnLogo from '../../images/linkdn-logo.svg';

import './footer.css';

const Footer = () => (
    <div className='footer'>
        <div className='footer-head'>
            <ul>
                <li>Categories</li>
                <li>About</li>
                <li>Support</li>
                <li>Community</li>
                <li>More from us</li>
            </ul>
        </div>
        <div className='footer-bottom-container'>
            <div className='footer-bottom'>
                <div className='logo-copy'>
                    <img src={logo} alt='logo'></img>
                    <p>&copy; Conzalt, {dayjs().format('YYYY')} </p>
                </div>
                <div className='social'>
                    <a href={() => false}>
                        <img src={twLogo} alt='twitter' />
                    </a>
                    <a href={() => false}>
                        <img src={lnLogo} alt='linkedin' />
                    </a>
                    <a href={() => false}>
                        <img src={fbLogo} alt='facebook' />
                    </a>
                    <a href={() => false}>
                        <img src={pinLogo} alt='pinterest' />
                    </a>
                    <a href={() => false}>
                        <img src={insLogo} alt='Instagram' />
                    </a>
                </div>
            </div>
        </div>
    </div>
);


export default Footer;