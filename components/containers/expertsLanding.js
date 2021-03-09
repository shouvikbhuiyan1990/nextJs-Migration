import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import { getOurExperts } from '../../store/actions/global';
import ScrollToTopOnMount from '../common/scrollToTopOnMount';
import Spinner from 'react-bootstrap/Spinner';
import ExpertCard from '../component/experts/card';
import Styles from './container';

const ExpertsLandingPage = () => {

    const dispatch = useDispatch();
    let experts = useSelector(state => state.global.experts);
    const isExpertsLoading = useSelector(state => state.global.isExpertsLoading);
    const errorInexperts = useSelector(state => state.global.errorInexperts);

    useEffect(() => {
        dispatch(getOurExperts());
    }, [dispatch]);

    return (
        <Styles>
            <ScrollToTopOnMount />
            <div className='search-landing-user'>
                <h2 style={{ marginBottom: '40px' }}>Our Team of Experts</h2>
                {errorInexperts &&
                    <Alert key="alertExpertsLoadFailure" variant={'danger'}>
                        Unable to load. Please try after some time.
                    </Alert>
                }
                {isExpertsLoading && <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                }
                <div className='courses-container-all'>
                    {
                        experts.map((item) => <ExpertCard {...item} />)
                    }
                </div>
            </div>
        </Styles>
    );
};

export default ExpertsLandingPage;