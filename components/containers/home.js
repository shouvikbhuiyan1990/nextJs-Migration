import React from "react";
import Hero from '../component/hero';
import IntroBanner from '../component/introBanner';
import SideImageBanner from '../component/introBanner/sideImageBanner';
import HowItWorks from '../component/howItWorks';
import Styles from './container';
import ScrollToTopMenu from '../common/scrollToTopOnMount';
import CourseTileContainer from '../component/courseTileContainer';

const Home = () => {
    return (
        <Styles>
            <main>
                <ScrollToTopMenu />
                <Hero />
                <IntroBanner />
                <HowItWorks />
                <SideImageBanner />
                <CourseTileContainer />
            </main>
        </Styles>
    );
};

export default Home;