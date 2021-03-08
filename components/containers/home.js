import React from "react";
import Hero from '../component/hero';
import ScrollToTopMenu from '../common/scrollToTopOnMount';
import CourseTileContainer from '../component/courseTileContainer';

const Home = () => {
    return (
        <main>
            <ScrollToTopMenu />
            <Hero />
            <CourseTileContainer />
        </main>
    );
};

export default Home;