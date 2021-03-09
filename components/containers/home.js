import React from "react";
import Hero from '../component/hero';
import Styles from './container';
import ScrollToTopMenu from '../common/scrollToTopOnMount';
import CourseTileContainer from '../component/courseTileContainer';

const Home = () => {
    return (
        <Styles>
            <main>
                <ScrollToTopMenu />
                <Hero />
                <CourseTileContainer />
            </main>
        </Styles>
    );
};

export default Home;