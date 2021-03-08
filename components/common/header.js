import React, { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import isEmpty from 'lodash/isEmpty';
import Badge from 'react-bootstrap/Badge'
import { Link, NavLink } from 'react-router-dom';
import Modal from '../component/joiningModal';
import RegistrationModal from '../component/registrationModal';
import { toggleModal } from "../../store/actions/joiningModal";
import { userlogin } from "../../store/actions/registration";
import cookie from '../../utils/cookie';
import LeftMenu from '../component/leftMenu';
import { useLocation } from "react-router-dom";
import PageLoader from './pageLoader';

import logo from '../../images/logo.png';
import search from '../../images/search.svg';
import mobileMenu from '../../images/mobile-menu.svg';
import mobileMenuWhite from '../../images/mobile-menu-white.svg';

import { logout } from '../../utils/helpers';
import { checkNotifications, getSuggestions } from '../../store/actions/global';

import './header.css';

const Header = () => {
    const cache = new Map();
    const history = useHistory();
    const showModal = useSelector(state => state.joinModal.showModal);
    const imageUrl = useSelector(state => state.joinModal.googleSignupProfile.imageUrl);
    const profileImageUrl = useSelector(state => state.registration.profileImageUrl);
    const isLoggedIn = useSelector(state => state.registration.isLoggedIn);
    const showPageLoader = useSelector(state => state.global.showPageLoader);
    const searchSuggestions = useSelector(state => state.global.searchSuggestions);
    const showRegistrationModal = useSelector(state => state.joinModal.showRegistrationModal);
    const notifications = useSelector(state => state.global.notifications) || [];
    const { pathname } = useLocation();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(false);
    const [currentPage, setCurrentPage] = useState('');
    const [displayProfileLinks, setDisplayProfileLinks] = useState(false);
    const dispatch = useDispatch();
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

    useEffect(() => {
        const scrollEvent = () => {
            console.log(document.offsetTop)
            if (filteredList.length > 0 && window.pageYOffset > 150) {
                setFilteredList([]);
            }
        };
        document.addEventListener('scroll', scrollEvent);

        return () => {
            document.removeEventListener('scroll', scrollEvent);
        }
    })


    const getTopPosition = () => {
        if (inputref && inputref.current) {
            // return (Number(inputref.current.clientHeight) - 3)
            return 40;
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

    const logOut = () => {
        dispatch(userlogin(false));
        setDisplayProfileLinks(false);
        logout();
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(checkNotifications(cookie.get('googleAuthId')[0]));
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        if (cookie.get('googleAuthId')[0]) {
            dispatch(userlogin(true));
        }
        const scrollFunc = () => {
            if (window.pageYOffset > 30 && !scrollPosition) {
                setScrollPosition(true);
            }
            else if (window.pageYOffset === 0) {
                setScrollPosition(false);
            }
        };
        const hideMenu = () => {
            setShowMobileMenu(false);
        };
        const hideProfileLinks = () => {
            setDisplayProfileLinks(false);
        };
        window.addEventListener('scroll', scrollFunc);
        window.addEventListener('click', hideMenu);
        window.addEventListener('click', hideProfileLinks);
        return () => {
            window.removeEventListener('scroll', scrollFunc);
            window.removeEventListener('click', hideMenu);
            window.removeEventListener('click', hideProfileLinks);
        }
    });

    useEffect(() => {
        setCurrentPage(pathname === '/' ? 'home' : '');
        if (pathname !== '/') {
            sessionStorage.setItem('lastVisited', window.location.href);
        }
    }, [pathname]);

    useEffect(() => {
        if (isEmpty(searchSuggestions)) {
            dispatch(getSuggestions());
        }
    }, [searchSuggestions, dispatch])

    return (
        <header className={scrollPosition ? 'header-fixed' : (currentPage !== 'home' ? 'header-fixed' : '')}>
            <LeftMenu isOpen={showMobileMenu} />
            <PageLoader show={showPageLoader} />
            <div className='header-row'>
                <img
                    onClick={(e) => { e.stopPropagation(); setShowMobileMenu(true) }}
                    role='button'
                    aria-roledescription='menu'
                    src={(scrollPosition || currentPage !== 'home') ? mobileMenu : mobileMenuWhite} alt='menu icon'
                    className='mobile-menu'
                />
                <div className='logo-search'>
                    <Link to='/'><img src={logo} alt='logo'></img></Link>
                    <form ref={inputref}>
                        <img src={search} alt='search' />
                        <input onChange={searchFunction} type='search' autoComplete='off' placeholder='Search course' />
                        <button onClick={(e) => { e.preventDefault(); gotoSearchPage() }} className='btn btn-custom'>Search</button>
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
                </div>
                <div className='links'>
                    <NavLink to='/our-experts' activeclassName='active'>Our Experts</NavLink>
                    {isLoggedIn &&
                        <React.Fragment>
                            <div onClick={(e) => { e.stopPropagation(); setDisplayProfileLinks(!displayProfileLinks) }} className='profile-img' style={{ backgroundImage: `url(${profileImageUrl || imageUrl || cookie.get('profileImageUrl')[0]})` }}>
                                {notifications.length > 0 &&
                                    <div className='active-notification'></div>
                                }
                            </div>
                        </React.Fragment>
                    }
                    {!isLoggedIn &&
                        <React.Fragment>
                            <a className='become-a-teacher' href onClick={() => dispatch(toggleModal(!showModal, 'signin'))}>Sign In</a>
                            <button className='btn btn-custom' type='button' onClick={() => dispatch(toggleModal(!showModal, 'generic'))}>Sign Up</button>
                        </React.Fragment>
                    }
                    {displayProfileLinks &&
                        <div className='profile-links'>
                            <div className='profile-info'>
                                <div className='links' onClick={(e) => e.stopPropagation()}>
                                    <Link to='/notifications'>
                                        Notifications {notifications.length > 0 && <Badge pill variant="danger">{notifications.length}</Badge>}
                                    </Link>
                                    <Link to='/dashboard'>Dashboard</Link>
                                    <a href onClick={logOut}>Logout</a>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Modal show={showModal} />
                <RegistrationModal show={showRegistrationModal} />
            </div>
        </header>
    );
};

export default Header;