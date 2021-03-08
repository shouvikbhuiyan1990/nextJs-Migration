import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import { getSearchResults } from '../../store/actions/global';
import { useLocation } from 'react-router-dom';
import ScrollToTopOnMount from '../common/scrollToTopOnMount';
import Spinner from 'react-bootstrap/Spinner';
import CourseTile from '../component/courseTile';

import './container.css';

const SearchLandingPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    let courses = useSelector(state => state.global.searchResults);
    const isSearchLoading = useSelector(state => state.global.isSearchLoading);
    const errorInSearch = useSelector(state => state.global.errorInSearch);

    useEffect(() => {
        let query = new URLSearchParams(location.search);
        dispatch(getSearchResults(decodeURIComponent(query.get('text')), query.get('tag')));
    }, [dispatch, location]);

    return (
        <main>
            <ScrollToTopOnMount />
            <div className='search-landing-user'>
                {errorInSearch &&
                    <Alert key="alertImageUploadFailure" variant={'danger'}>
                        Unable to load results. Please try after some time.
                    </Alert>
                }
                {!errorInSearch &&
                    <h4>{`${courses.length} Results`}</h4>
                }
                {courses.length === 0 && !errorInSearch && !isSearchLoading &&
                    <Alert key="alertImageUploadFailure" variant={'warning'}>
                        No results found. Please modify your search.
                    </Alert>
                }
                {isSearchLoading && <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                }
                <div className='courses-container-all'>
                    {
                        courses && courses.length > 0 &&
                        courses.map((value, index) => <CourseTile profileUrl={value.iconUrl} {...value} key={value.id} courseId={value.id} />)
                    }
                </div>
            </div>
        </main>
    );
};

export default SearchLandingPage;