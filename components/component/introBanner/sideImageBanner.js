import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
display: flex;
flex-direction: column;
margin: 50px auto;
max-width: 1400px;
.child {
    flex: 1;
    margin-bottom: 20px;
    padding: 0 20px;
}
.child .head {
    font-size: 1.6rem;
    font-family: 'lato-bold';
}
.child .text {
    margin-bottom: 45px;
}
.child.icon {
    display: none;
}
.child:last-child {
    position: relative;
}
p.quote {
   font-size: 1.4rem;
   font-family: 'lato-semibold';
}
@media screen and (min-width: 1025px) {
    flex-direction: row;
    .icon {
        margin-bottom: 0;
    }
    .child {
        margin-bottom: 0;
        margin: 0 20px;
        padding: 0;
    }
    .child.icon {
        display: block;
        max-width: 40%;
    }
    .child.icon img {
        max-width: 100%;
    }
}
`;

const IntroBanner = () => {
    return (
        <Styles>
            <div className='child icon'>
                <img src="https://via.placeholder.com/550x650" alt="info-banner"></img>
            </div>
            <div className='child'>
                <div className='text'>
                    <h2 className='head'>Limited time, unlimited opportunities</h2>
                    <p>Explore the world of unlimited possibilities in minutes and start writing your success story today by learning the right skills with the limited time you got.</p>
                </div>
                <div className='text'>
                    <h2 className='head'>Anytime, anywhere</h2>
                    <p>Your learning need not stop irrespective of time and place. Schedule your classes and access your contents at your convenience.</p>
                </div>
                <div className='text'>
                    <h2 className='head'>Show what you got</h2>
                    <p>Create your true reflection by showcasing the relevant skills in your profile and highlight your credibility by answering the questions, that matter.</p>
                </div>
                <p className='quote'><i>“You must either modify your dreams or magnify your skills”</i></p>
            </div>
        </Styles>
    )
}

export default IntroBanner;