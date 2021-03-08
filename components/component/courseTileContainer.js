import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import CourseTile from './courseTile';
import Form from 'react-bootstrap/Form';
import { getAllCources, sortCources } from '../../store/actions/cources';

import './courseTileContainer.css';

const CourseTileContainer = () => {

    const topRatedCaurse = useSelector(state => state.cources.topRatedCaurse);
    const isCourseLoading = useSelector(state => state.cources.isCourseLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCources());
    }, [dispatch]);

    const onDdClick = (e) => {
        dispatch(sortCources(e.target.value));
    };


    return (
        <div className='courses'>
            {
                isCourseLoading && <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }
            { !isCourseLoading &&
                <React.Fragment>
                    <div className='course-header'>
                        <h5>Top Courses</h5>
                        <div className='filter'>
                            <p>Sort By</p>
                            <Form.Group>
                                <Form.Control as="select" size="md" onChange={onDdClick}>
                                    <option value='rt'>Rating</option>
                                    <option value='phl'>Price(Hight to Low)</option>
                                    <option value='plh'>Price(Low to High)</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='course-tile-container'>
                        {
                            topRatedCaurse && topRatedCaurse.length > 0 &&
                            topRatedCaurse.map((value, index) => <CourseTile {...value} key={value.id} courseId={value.id} />)
                        }
                    </div>
                </React.Fragment>
            }
        </div>
    );
};

export default CourseTileContainer;