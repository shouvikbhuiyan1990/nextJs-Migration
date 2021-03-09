import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import CourseTile from './courseTile';
import Form from 'react-bootstrap/Form';
import { getAllCources, sortCources } from '../../store/actions/cources';


const Styles = styled.div`
.courses {
    max-width: 1440px;
    margin: 50px auto;
    padding: 0 16px;
}

.course-header {
    padding: 0;
    display: flex;
    flex-direction: column;
}

.filter {
    display: flex;
    align-items: center;
}

.course-header .form-group {
    margin-bottom: 0;
    border: none;
}

.course-header .form-group option {
    background-color: #fff;
    padding: 30px 15px;
}

.course-header .form-group .form-control {
    border: none;
}

h5 {
    color: #404145;
    font-size: 18px;
}

.filter p {
    font-size: 14px;
    margin-right: 3px;
}

.filter .form-control {
    font-size: 14px;
}

.courses .course-tile-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
}

@media screen and (min-width: 968px) {
    .courses .course-tile-container {
        grid-template-columns: 1fr 1fr;
    }
    .course-header {
        padding: 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}

@media screen and (min-width: 1025px) {
    .courses .course-tile-container {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .courses {
        padding: 0 32px;
        margin: 100px auto;
    }
    .course-header {
        margin-bottom: 20px;
    }
    h5 {
        font-size: 20px;
    }
    .filter p {
        font-size: 18px;
    }
    .filter .form-control {
        font-size: 18px;
        max-width: 150px;
    }
}
`;

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
        <Styles>
            <div className='courses'>
                {
                    isCourseLoading && <div className='loader'>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                {!isCourseLoading &&
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
        </Styles>
    );
};

export default CourseTileContainer;