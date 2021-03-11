import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Styles = styled.div`
.footer {
    background: #1A1A1A;
    color: #fff;
    padding-top: 34px;
    padding-bottom: 24px;
}

.footer-bottom {
    padding-bottom: 40px;
    align-items: center;
    border-top: 1px solid #ccc;
}

.footer-head, .footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
}

.footer-head {
    display: flex;
    flex-direction: column;
    padding: 0 25px 30px;
}

.footer-head section {
    flex: 1;
}

.footer-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 32px;
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
}

.footer-head section > h2 {
    margin-bottom: 25px;
    font-family: 'lato-bold';
}

.footer-head section h4 {
    margin-bottom: 15px;
    font-family: 'lato-bold';
}

.footer-head section ul li {
    padding: 10px 0;
}

.footer-head section:first-child {
    margin-bottom: 30px;
}

@media screen and (min-width: 1025px) {
    .footer-head section.sub-section {
        display: flex;
        justify-content: space-between;
        flex: 0.3 1 auto;
    }
    .footer-head {
        flex-direction: row;
        padding: 0 0 30px;
    }
    .footer-head section:first-child > p {
        width: 40%;
    }
    .footer-bottom {
        flex-direction: row;
    }
    .social {
        margin-top: 0;
    }

    .footer-head section:first-child {
        margin-bottom: 0;
    }
}
`;

const Footer = () => (
    <Styles>
        <div className='footer'>
            <div className='footer-head'>
                <section>
                    <h2>Conzult</h2>
                    <p>This is a brief description of what the company does, its morals and objectives. Any other generic information can be added here.</p>
                </section>
                <section className='sub-section'>
                    <div className='explore-company'>
                        <h4>Explore</h4>
                        <ul>
                            <li>Sub Link 1</li>
                            <li>Sub Link 2</li>
                            <li>Sub Link 3</li>
                        </ul>
                    </div>
                    <div className='explore-company'>
                        <h4>Company</h4>
                        <ul>
                            <li>Sub Link 1</li>
                            <li>Sub Link 2</li>
                            <li>Sub Link 3</li>
                        </ul>
                    </div>
                </section>
            </div>
            <div className='footer-bottom-container'>
                <div className='footer-bottom'>
                    <div className='logo-copy'>
                        {/* <img src={logo} alt='logo'></img> */}
                        <p>Copyright &copy; DJIT Tech Pvt Ltd, {dayjs().format('YYYY')} </p>
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
                        <a href={() => false}>
                            <i className="fa fa-youtube-play" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Styles>
);


export default Footer;