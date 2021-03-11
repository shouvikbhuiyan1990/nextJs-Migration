import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
display: flex;
flex-direction: column;
margin: 50px auto;
max-width: 1400px;
.icon {
    padding: 10px 30px 0;
    margin-bottom: 10px;
}
.icon i {
    font-size: 2.8rem;
}
.child {
    flex: 1;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 0 20px;
}
.child:first-child {
    margin-left: 0;
}
.child:last-child {
    margin-right: 0;
    margin-bottom: 0;
}
.child .head {
    font-size: 1.6rem;
    font-family: 'lato-bold';
}
@media screen and (min-width: 1025px) {
    flex-direction: row;
    .icon {
        margin-bottom: 0;
    }
    .child {
        flex-direction: row;
        margin-bottom: 0;
        margin: 0 20px;
        align-items: flex-start;
        text-align: left;
        padding: 0;
    }
}
`;

const IntroBanner = () => {
    return (
        <Styles>
            <div className='child'>
                <div className='icon'>
                    <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <div className='text'>
                    <h2 className='head'>Expert Connect</h2>
                    <p>Get the right guidance through easy reach and direct connect with experts</p>
                </div>
            </div>
            <div className='child'>
                <div className='icon'>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                </div>
                <div className='text'>
                    <h2 className='head'>Personal website</h2>
                    <p>Stay updated and strengthen your profile by highlighting the right skills</p>
                </div>
            </div>
            <div className='child'>
                <div className='icon'>
                    <i className="fa fa-child" aria-hidden="true"></i>
                </div>
                <div className='text'>
                    <h2 className='head'>Faster learning</h2>
                    <p>Learn and grow faster, you don’t need to get stuck anywhere anymore</p>
                </div>
            </div>
        </Styles>
    )
}

export default IntroBanner;