import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import debounce from 'lodash/debounce';



const Styles = styled.div`
.carousal-container {
    position: relative;
    width: 100%;
    max-height: 450px;
    top: 0;
}

.typeahead {
    border: 1px solid #eee;
    border-top: none;
    position: absolute;
    top: 42px;
    z-index: 9;
    background: #fff;
    width: 100%;
    color: #404145;
    padding: 0;
    max-height: 200px;
    overflow: auto;
    -webkit-box-shadow: -1px 20px 15px -11px rgb(0 0 0 / 41%);
    -moz-box-shadow: -1px 20px 15px -11px rgb(0 0 0 / 41%);
    box-shadow: -1px 20px 15px -11px rgb(0 0 0 / 41%);
}

.typeahead p {
    padding: 8px 20px 0;
    cursor: pointer;
    margin: 0;
}

.typeahead p .holder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
}

.typeahead p i {
    transform: rotate3d(1, 1, 1, 40deg);
}

.typeahead p span {
    width: 100%;
    display: block;
}

.typeahead p:hover {
    background-color: #ccc;
    margin-top: -1px;
}

.typeahead p:last-child .holder {
    border-bottom: none;
}

.carousal-content {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    z-index: 7;
    color: #fff;
}

.carousal-content .content {
    max-width: 90%;
    margin: 0 auto;
}

.carousal-content .content .main-content {
    max-width: 500px;
}

.carousal-content .content .main-content h2 {
    font-size: 26px;
    margin-bottom: 22px;
}

.main-content form {
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 22px;
}

.main-content form .input-cont i {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 14px;
    color: #404145;
    font-size: 1rem;
}

.main-content .popular {
    display: none;
    align-items: center;
    font-size: 14px;
}

.main-content .popular ul {
    margin-bottom: 0;
}

.main-content ul {
    display: flex;
    padding-left: 12px;
}

.main-content ul li {
    list-style: none;
    font-size: 14px;
    border: 1px solid #fff;
    border-radius: 40px;
    padding: 2px 16px 0;
    margin: 5px;
}

.main-content ul li:last-child {
    margin-right: 0;
}

.main-content ul li:first-child {
    margin-left: 0;
}

.main-content ul li a {
    text-decoration: none;
    font-size: 14px;
    color: #fff;
}

.main-content input[type=search] {
    outline-offset: -2px;
    flex: 1;
    font-size: 16px;
    padding: 8px 7px 10px 44px;
    border: none;
    border-radius: 4px;
}

.main-content button.btn-custom, .main-content button.btn-custom:hover {
    background-color: #1dbf73;
    border-radius: 4px;
    color: #fff;
    border: 1px solid #1dbf73;
    padding-top: 8px;
    padding-bottom: 8px;
}

.tile {
    min-height: 450px;
}

.first-tile {
    background-color: #023a15;
}

.second-tile {
    background-color: #b64762;
}

.third-tile {
    background-color: #540e1f;
}

.fourth-tile {
    background-color: #023a15;
}

.fifth-tile {
    background-color: #7d1a00;
}

.main-content .large {
    display: none;
}

.input-cont {
    width: 100%;
}

.main-content .small {
    width: 100%;
    flex-direction: column;
}

.main-content .small input[type='search'] {
    width: 100%;
    outline: none;
}

.main-content .small button {
    width: 100%;
    margin-top: 10px;
}

@media screen and (min-width: 750px) {
    .main {
        min-height: 600px;
    }
    .carousal-content .content .main-content {
        max-width: 650px;
        padding: 0 32px;
    }
    .carousal-content .content .main-content h2 {
        font-size: 45px;
    }
}

@media screen and (min-width: 1025px) {
    .main-content .small {
        flex-direction: row;
    }
    .main-content input[type=search] {
        border-radius: 4px 0 0 4px;
    }
    .main-content button.btn-custom, .main-content button.btn-custom:hover {
        width: auto;
        margin: 0;
        border-radius: 0 4px 4px 0;
    }
    .carousal-content .content {
        max-width: 1400px;
    }
    .carousal-container {
        position: absolute;
        max-height: 650px;
    }
    .main-content .popular {
        display: flex;
    }
    .tile {
        min-height: 650px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    /* .first-tile {
        background-image: url("https://via.placeholder.com/1400x650/023a15/FFFFFF");
    }
    .second-tile {
        background-image: url("https://via.placeholder.com/1400x650/b64762/FFFFFF");
    }
    .third-tile {
        background-image: url("https://via.placeholder.com/1400x650/540e1f/FFFFFF");
    } */
}
`;

const Hero = () => {
    const router = useRouter();
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
            router.push(`/find?text=${searchTxt}&tag=all`);
        }
        else {
            router.push(`/find?text=${encodeURIComponent(tag.displayText)}&tag=${tag.tag}`);
        }
    }


    return (
        <Styles>
            <div className='main'>
                <div className='carousal-container'>
                    <div className='carousal-content'>
                        <div className='content'>
                            <div className='main-content'>
                                <h2>Find the perfect <i>Teaching</i> Services for your business</h2>
                                <form className='small'>
                                    <div className='input-cont' ref={inputref}>
                                        <i className="fa fa-search" aria-hidden="true"></i>
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
        </Styles>
    );
};

export default Hero;