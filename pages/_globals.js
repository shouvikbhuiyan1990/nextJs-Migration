import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@font-face {
	font-family: 'lato-regular';
	src: url('/fonts/Lato-Regular.ttf');
}

@font-face {
	font-family: 'lato-bold';
	src: url('/fonts/Lato-Bold.ttf');
}

@font-face {
	font-family: 'lato-semibold';
	src: url('/fonts/Lato-Black.ttf');
}

html {
	scroll-behavior: smooth;
}

* {
	box-sizing: border-box;
}

p{
	margin: 0;
}

ul li {
    list-style: none;
}

body {
	font-family: 'lato-regular';
	color: #5A5858;
}

.bold {
	font-family: 'lato-bold';
}

.loader {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

button[disabled] {
	cursor: not-allowed;
}

button.share-btn {
	border: 1px solid #c5c6c9;
	color: #7a7d85;
	display: flex;
	align-items: center;
	justify-content: center;
}

a {
	text-decoration: underline;
	color: #1dbf73;
}

button.share-btn i {
	margin-right: 6px;
	color: #1dbf73;
}

.centered-with-space {
	display: flex;
	align-items: center;
	justify-content: center;
	justify-content: space-between;
}

.centered-without-space {
	display: flex !important;
	align-items: center;
	justify-content: center;
}

.heading {
	margin-bottom: 22px;
}

.no-result {
	color: #6a6a6b;
	padding-left: 10px;
}

.events-container {
	position: relative;
}

.events-container .heading {
	font-size: 1.6rem;
}

.events-container .loader {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	z-index: 11;
	background-color: rgba(255, 255, 255, 0.3);
}

.avatar {
	background-size: cover;
	border-radius: 50%;
}

.active-notification {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: #dc3545;
	border: 2px solid white;
	-webkit-box-shadow: -1px 2px 6px 2px rgb(0 0 0 / 41%);
	-moz-box-shadow: -1px 2px 6px 2px rgb(0 0 0 / 41%);
	box-shadow: -1px 2px 6px 2px rgb(0 0 0 / 41%);
}

.slick-list>.slick-track {
	margin-left: 0;
}

#root .slick-prev:before, #root .slick-next:before, .modal-open .slick-prev:before, .modal-open .slick-next:before {
	color: #414141;
}

#root button.btn-theme-global, #root button.btn-theme-global:hover, #root button.btn-theme-global:active, #root button.btn-theme-global[disabled], button.btn-theme-global, button.btn-theme-global:hover, button.btn-theme-global:active, button.btn-theme-global[disabled] {
	background-color: #1dbf73 !important;
	color: #fff !important;
	border: 1px solid #1dbf73 !important;
}

.modal-open .modal-header .close {
	right: 3%;
}

#root button.btn-theme-global-cancel, #root button.btn-theme-global-cancel:hover, button.btn-theme-global-cancel, button.btn-theme-global-cancel:hover, #root button.btn-theme-global-cancel:active, button.btn-theme-global-cancel:active {
	background-color: #fff !important;
	color: #293845 !important;
	border: 1px solid #293845 !important;
}

#root button.global-link-btn {
	background: none;
	border: none;
	color: #4a73e8;
	text-decoration: none;
	padding: 10px 0 0px;
	border-bottom: 1px solid #4a73e8;
	outline: none;
}

@media screen and (min-width: 1025px) {
	.events-container .heading {
		font-size: 2rem;
	}
	.root-main-content {
		min-height: 100vh;
	}
`;