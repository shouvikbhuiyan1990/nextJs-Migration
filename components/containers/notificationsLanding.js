import React from "react";
import get from 'lodash/get';
import ScrollToTopMenu from '../common/scrollToTopOnMount';
import { useSelector } from "react-redux";

const Home = () => {
    const notifications = useSelector(state => state.global.notifications) || [];
    return (
        <main>
            <ScrollToTopMenu />
            <div className='notifications-landing'>
                {
                    notifications.map((item) => (
                        <div className='tile' onClick={() => window.location.href = '/dashboard'}>
                            <p>
                                Provide {`${get(item, 'teacher.name') || get(item, 'student.name')}'s Feedback`} for {`${get(item, 'course.subject') || ''}`}
                            </p>
                        </div>
                    ))
                }
                {
                    notifications.length === 0 &&
                    <h3>All Caught Up! No New Notifications</h3>
                }
            </div>
        </main>
    );
};

export default Home;