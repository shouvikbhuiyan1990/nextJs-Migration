import React, { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import isEmpty from 'lodash/isEmpty';
import Badge from 'react-bootstrap/Badge'
import Link from 'next/link';
import Modal from '../component/joiningModal';
import RegistrationModal from '../component/registrationModal';
import { toggleModal } from "../../store/actions/joiningModal";
import { userlogin } from "../../store/actions/registration";
import cookie from '../../utils/cookie';
import LeftMenu from '../component/leftMenu';
import PageLoader from './pageLoader';

import { logout } from '../../utils/helpers';
import { checkNotifications, getSuggestions } from '../../store/actions/global';
import { useRouter } from 'next/router';


const Styles = styled.div`
header {
    position: absolute;
    background: transparent;
    z-index: 9;
    width: 100%;
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

.logo-search img {
    max-width: 200px;
    padding-right: 10px;
}

header .profile-img {
    width: 50px;
    height: 50px;
    background-size: cover;
    border-radius: 50%;
    cursor: pointer;
    background-color: #ccc;
    background-image: url('https://via.placeholder.com/450');
    position: relative;
}

header .active-notification {
    position: absolute;
    bottom: 8px;
    right: -5px;
}

header .profile-links {
    position: absolute;
    right: 20px;
    width: 100%;
    max-width: 200px;
    top: 80px;
    user-select: none;
}

header .profile-links::before {
    display: inline-block;
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    top: -7px;
    right: 10px;
    z-index: 2;
}

header .profile-links::after {
    display: inline-block;
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
    top: -8px;
    right: 10px;
}

header .profile-links .profile-info {
    width: 100%;
    padding: 15px 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    background-color: #fff;
}

header .header-row  > .links {
    display: flex;
}

header .header-row > .links > a {
    align-self: center;
}

header .profile-links .profile-info .links a, header.header-fixed .profile-links .profile-info .links a {
    display: block;
    margin: 4px 0;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid #eee;
}

header .profile-links .profile-info a:hover {
    text-decoration: underline;
}

header .profile-links .profile-info a:last-child {
    margin-bottom: 0;
}

header .profile-links .profile-info a:first-child {
    margin-top: 0;
}

header .profile-links .profile-info a, header.header-fixed .profile-links .profile-info a {
    color: #7a7d85;
}

header .profile-links .profile-info a:hover, header.header-fixed .profile-links .profile-info a:hover {
    color: #1dbf73;
}

header .profile-links .profile-info .links {
    display: flex;
    flex-direction: column;
}

header a.become-a-teacher {
    display: inline-block;
    cursor: pointer;
    color: #fff;
}

header a.become-a-teacher:hover {
    color: #fff;
}

.header-row {
    margin: 0 auto;
    min-width: 300px;
    padding: 20px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.header-row a {
    color: #fff;
    margin: 0 10px;
}

.header-row .links a {
    display: none;
}

.header-row .links .become-a-teacher {
    display: block;
}

.btn-custom, .btn-custom:hover {
    background: transparent;
    border-color: #fff;
    color: #fff;
}

a img {
    width: 80px;
}

header form {
    display: none;
}

header.header-fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    color: #404145;
    border-bottom: 1px solid #e4e5e7;
}

.logo-search {
    display: flex;
    align-items: center;
}

.logo-search input[type=search] {
    outline-offset: -2px;
    flex: 1;
    font-size: 16px;
    padding: 7px 7px 9px 44px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
}

header.header-fixed .logo-search button.btn-custom, header.header-fixed .logo-search button.btn-custom:hover {
    background-color: #1dbf73;
    border-radius: 0 4px 4px 0;
    color: #fff;
    border: 1px solid #1dbf73;
    padding-top: 8px;
    padding-bottom: 8px;
}

header.header-fixed form > i {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 11px;
    left: 14px;
}

.mobile-menu {
    width: 24px;
    height: 24px;
}

.mobile-menu i {
    font-size: 1.8rem;
}

.mobile-menu i.white {
    color: #fff;
}


header.header-fixed .header-row a {
    color: #404145;
    text-decoration: none;
}

header.header-fixed .header-row .links a, header .header-row .links a {
    border-bottom: 1px solid;
    padding-bottom: 2px;
    text-decoration: none;
}

header.header-fixed .header-row .links a.active {
    border-bottom: 2px solid #1dbf73;
    font-family: 'lato-bold';
}

header.header-fixed .btn-custom, header.header-fixed .btn-custom:hover {
    background: transparent;
    border-color: #1dbf73;
    color: #1dbf73;
}

@media screen and (min-width: 968px) {
    .header-row {
        max-width: 968px;
        height: 80px;
    }
}

@media screen and (min-width: 1025px) {
    header .profile-links {
        right: 30px;
        top: 75px;
    }
    .mobile-menu {
        display: none;
    }
    header.header-fixed form {
        display: block;
        position: relative;
    }
    .header-row .links a {
        display: inline-block;
    }
    a img {
        width: 200px;
    }
    .header-row {
        max-width: 1400px;
        padding: 0 32px;
    }
}
`;

const Header = () => {
    const cache = new Map();
    const router = useRouter();
    const showModal = useSelector(state => state.joinModal.showModal);
    const imageUrl = useSelector(state => state.joinModal.googleSignupProfile.imageUrl);
    const profileImageUrl = useSelector(state => state.registration.profileImageUrl);
    const isLoggedIn = useSelector(state => state.registration.isLoggedIn);
    const showPageLoader = useSelector(state => state.global.showPageLoader);
    const searchSuggestions = useSelector(state => state.global.searchSuggestions);
    const showRegistrationModal = useSelector(state => state.joinModal.showRegistrationModal);
    const notifications = useSelector(state => state.global.notifications) || [];
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
            router.push(`/find?text=${searchTxt}&tag=all`);
        }
        else {
            router.push(`/find?text=${encodeURIComponent(tag.displayText)}&tag=${tag.tag}`);
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
        if (isEmpty(searchSuggestions)) {
            dispatch(getSuggestions());
        }
    }, [searchSuggestions, dispatch])

    return (
        <Styles>
            <header className={scrollPosition ? 'header-fixed' : (currentPage !== 'home' ? 'header-fixed' : '')}>
                <LeftMenu isOpen={showMobileMenu} />
                <PageLoader show={showPageLoader} />
                <div className='header-row'>
                    <span
                        className='mobile-menu'
                        role='button'
                        aria-roledescription='menu'
                        onClick={(e) => { e.stopPropagation(); setShowMobileMenu(true) }}
                    >
                        <i className={`fa fa-bars ${(scrollPosition || currentPage !== 'home') ? '' : 'white'}`} aria-hidden="true"></i>
                    </span>
                    <div className='logo-search'>
                        <Link href='/'>
                            <a href="/">
                                <img src='/images/logo.png' alt='logo'></img>
                            </a>
                        </Link>
                        <form ref={inputref}>
                            <i className="fa fa-search" aria-hidden="true"></i>
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
                        <Link href='/our-experts' activeclassName='active'>Our Experts</Link>
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
        </Styles>
    );
};

export default Header;