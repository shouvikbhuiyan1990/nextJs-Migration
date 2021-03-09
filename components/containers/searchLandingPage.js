import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import { getSearchResults } from '../../store/actions/global';
import { useLocation } from 'react-router-dom';
import ScrollToTopOnMount from '../common/scrollToTopOnMount';
import Spinner from 'react-bootstrap/Spinner';
import CourseTile from '../component/courseTile';

import Styles from './container';

const SearchLandingPage = ({
    text,
    tag
}) => {

    const dispatch = useDispatch();
    let courses = useSelector(state => state.global.searchResults);
    const isSearchLoading = useSelector(state => state.global.isSearchLoading);
    const errorInSearch = useSelector(state => state.global.errorInSearch);

    useEffect(() => {
        dispatch(getSearchResults(text, tag));
    }, [dispatch]);

    return (
        <Styles>
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
        </Styles>
    );
};

export default SearchLandingPage;