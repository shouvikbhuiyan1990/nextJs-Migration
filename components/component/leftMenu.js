import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import { toggleModal } from "../../store/actions/joiningModal";

const Styles = styled.div`
.frinmash-menu {
    background: #fff;
    position: fixed;
    padding: 20px 20px 0 22px;
}

.frinmash-menu-vertical {
    width: 240px;
    height: 100%;
    top: 0;
    z-index: 1000;
}

.frinmash-menu-left {
    left: -250px;
}

.frinmash-menu-left.frinmash-menu-open {
    left: 0px;
    -webkit-box-shadow: 19px 7px 49px -19px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 19px 7px 49px -19px rgba(0, 0, 0, 0.75);
    box-shadow: 19px 7px 49px -19px rgba(0, 0, 0, 0.75);
}

.frinmash-menu.frinmash-menu-vertical a {
    display: inline-block;
    padding: 1.2rem 0;
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 1px solid;
    color: #404145;
}

.frinmash-menu.frinmash-menu-vertical a.active {
    font-family: 'lato-bold';
    border-width: 2px;
    border-color: #1dbf73;
}

.frinmash-menu, .frinmash-menu-push {
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.frinmash-menu .btn-custom, .frinmash-menu .btn-custom:hover {
    padding: 12px 24px;
    background-color: #1dbf73;
    color: #fff;
}
`;

const LeftMenu = ({
    isOpen
}) => {

    const showModal = useSelector(state => state.joinModal.showModal);
    const dispatch = useDispatch();

    return (
        <Styles>
            <nav className={`frinmash-menu frinmash-menu-vertical frinmash-menu-left ${isOpen ? 'frinmash-menu-open' : ''}`} id='frinmash-menu'>
                <button onClick={() => dispatch(toggleModal(!showModal))} className='btn btn-custom'>Join Conzult</button>
                <Link href='/our-experts' activeclassName='active'>Our Experts</Link>
            </nav>
        </Styles>
    )
};

export default LeftMenu;