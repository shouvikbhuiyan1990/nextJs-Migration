import React, { useCallback, useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import debounce from 'lodash/debounce';

import search from '../../images/search.svg';
import './hero.css';

const Hero = () => {
    const cache = new Map();
    const history = useHistory();
    const { uniqueSubject } = useSelector(state => state.cources.allCources);
    const searchSuggestions = useSelector(state => state.global.searchSuggestions);
    const [searchTxt, setSearchTxt] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const inputref = useRef("");

    const searchFunction = (e) => {
        setSearchTxt(e.target.value);
    };

    const debouncedSearch = useCallback(debounce(async (value) => {
        let finalList = [];

        if (value) {
            if (cache.get(value)) {
                setFilteredList(cache.get(value));
            }
            else {
                const regexPattern = new RegExp(value, "gmi");

                for (let i in searchSuggestions) {
                    let list = [];
                    if (searchSuggestions.hasOwnProperty(i) && searchSuggestions[i].length > 0) {
                        searchSuggestions[i].forEach((item) => {
                            if (regexPattern.test(item)) {
                                list.push({
                                    displayText: item,
                                    tag: i
                                });
                            }
                        })
                    }
                    finalList = [...finalList, ...list];
                }
                cache.set(value, finalList)
                setFilteredList(finalList);
            }
        }
        else {
            setFilteredList([]);
        }
    }, 500), [searchSuggestions]);

    useEffect(() => {
        debouncedSearch(searchTxt);
    }, [searchTxt, debouncedSearch]);


    const getTopPosition = () => {
        if (inputref && inputref.current) {
            return (Number(inputref.current.clientHeight) - 3)
        }
        return 0;
    }

    const gotoSearchPage = (tag) => {
        if (!tag) {
            history.push(`/find?text=${searchTxt}&tag=all`);
        }
        else {
            history.push(`/find?text=${encodeURIComponent(tag.displayText)}&tag=${tag.tag}`);
        }
    }


    return (
        <div className='main'>
            <div className='carousal-container'>
                <div className='carousal-content'>
                    <div className='content'>
                        <div className='main-content'>
                            <h2>Find the perfect <i>Teaching</i> Services for your business</h2>
                            <form className='small'>
                                <div className='input-cont' ref={inputref}>
                                    <img src={search} alt='search' />
                                    <input onChange={searchFunction} type='search' autoComplete='off' placeholder='Try searching for course' />
                                </div>
                                <button className='btn btn-custom' onClick={() => gotoSearchPage()}>Search</button>
                                {filteredList.length > 0 &&
                                    <div className='typeahead' style={{ top: `${getTopPosition()}px` }}>
                                        {
                                            filteredList.map((item) => {
                                                return (
                                                    <p onClick={() => gotoSearchPage(item)}>
                                                        <div className='holder'>
                                                            <span>{item.displayText}</span>
                                                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                                                        </div>
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </form>
                            {uniqueSubject && uniqueSubject.length > 0 &&
                                <div className='popular'>
                                    <p>Popular:</p>
                                    <ul>
                                        {
                                            uniqueSubject && uniqueSubject.length > 0 &&
                                            uniqueSubject.map((value, index) => {
                                                return (
                                                    <li>
                                                        <a href={() => false}>{value.subject}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Carousel
                    interval={5000}
                    indicators={false}
                    controls={false}
                >
                    <Carousel.Item>
                        <div className='d-block w-100 first-tile tile'></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='d-block w-100 second-tile tile'></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='d-block w-100 third-tile tile'></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='d-block w-100 fourth-tile tile'></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='d-block w-100 fifth-tile tile'></div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default Hero;