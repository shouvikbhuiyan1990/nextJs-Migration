import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Styles = styled.div`
.footer {
    border-top: 1px solid #e4e5e7;
    padding-top: 34px;
    padding-bottom: 24px;
}

.footer-bottom-container {
    border-top: 1px solid #e4e5e7;
}

.footer-bottom {
    padding-bottom: 40px;
}

.footer-head, .footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
}

.footer-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 32px;
}

.footer .footer-head ul li {
    list-style: none;
}

.footer .footer-head ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    justify-content: space-between;
}

.footer img {
    max-width: 100px;
}

.social {
    margin-top: 24px;
}

.social i {
    font-size: 1.6rem;
}

.social img {
    width: 20px;
    height: 22px;
}

.social a {
    padding-right: 12px;
}

.social a:last-child {
    padding-right: 0;
}

.logo-copy {
    display: flex;
    align-items: center;
}

.logo-copy p {
    margin: 0;
    margin-left: 16px;
}

@media screen and (min-width: 1025px) {
    .footer {
        padding-top: 64px;
    }
    .footer .footer-head ul {
        flex-direction: row;
    }
    .footer-bottom {
        flex-direction: row;
    }
    .social {
        margin-top: 0;
    }
}
`;

const Footer = () => (
    <Styles>
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
                        {/* <img src={logo} alt='logo'></img> */}
                        <p>&copy; Conzalt, {dayjs().format('YYYY')} </p>
                    </div>
                    <div className='social'>
                        <a href={() => false}>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href={() => false}>
                            <i className="fa fa-facebook-official" aria-hidden="true"></i>
                        </a>
                        <a href={() => false}>
                            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                        </a>
                        <a href={() => false}>
                            <i className="fa fa-pinterest-square" aria-hidden="true"></i>
                        </a>
                        <a href={() => false}>
                            <i className="fa fa-twitter-square" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Styles>
);


export default Footer;