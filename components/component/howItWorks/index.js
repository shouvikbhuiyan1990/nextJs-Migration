import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
background-color: #023a15;
color: #fff;
text-align: center;
padding: 30px 0;
h2 {
    font-family: 'lato-bold';
    margin-bottom: 40px;
    font-size: 2.2rem;
}
h3 {
    font-size: 1.6rem;
    font-family: 'lato-bold';
}
.container {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
}
ol {
    counter-reset: my-awesome-counter;
    list-style: none;
    text-align: left;
    padding-left: 0;
}
ol li {
    margin: 30px 0 40px 30px;
    counter-increment: my-awesome-counter;
    position: relative;
    padding-left: 30px;
    font-size: 1.4rem;
}
ol li::before {
    content: counter(my-awesome-counter);
    color: #fff;
    font-size: 2rem;
    left: -20px;
    font-family: 'lato-bold';
    position: absolute;
    font-size: 1.6rem;
    top: -3px;
    text-align: center;
}
section {
    flex: 1;
}
section:first-child {
    margin-bottom: 20px;
}
@media screen and (min-width: 1025px) {
    padding: 50px 0;
    ol {
        padding: 0 40px;
    }
    .container {
        flex-direction: row;
        justify-content: space-between;
    }
    section:first-child {
        margin-bottom: 0;
        border-right: 1px solid #fff;
    }
    section:last-child ol {
        padding-left: 80px;
    }
}
`;

const IntroBanner = () => {
    return (
        <Styles>
            <h2>How it works ?</h2>
            <div className='container'>
                <section>
                    <h3>Learners</h3>
                    <ol>
                        <li>Simple sign-up to start exploring</li>
                        <li>Add preferences and create profile</li>
                        <li>Choose the expert and schedule video call</li>
                    </ol>
                </section>
                <section>
                    <h3>Experts</h3>
                    <ol>
                        <li>Simple sign-up</li>
                        <li>Add your expertise and related details</li>
                        <li>Design your course pages and publish to get started</li>
                    </ol>
                </section>
            </div>
        </Styles>
    )
}

export default IntroBanner;