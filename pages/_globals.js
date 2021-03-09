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

.modal-title.h4 {
    flex: 1;
    text-align: center;
    color: #404145;
}

.modal-header .close {
    position: absolute;
    right: 6%;
    top: 16px;
}

.register-modal .modal-header {
    align-items: center;
    font-family: 'lato-bold';
    border-bottom: none;
    margin-bottom: 10px;
}

.register-modal .modal-footer {
    justify-content: center;
    font-size: 12px;
    color: #b5b6ba;
    line-height: 1.1;
}

.register-modal .img-preview {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

.register-modal .img-preview-id {
    width: 100%;
    height: 150px;
    background-size: cover;
    background-repeat: no-repeat;
}

.register-modal input[type="file"] {
    color: transparent;
}

.img-upload {
    position: relative;
}

.img-upload .uploader-loader {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 10;
}

.register-modal .form-file {
    position: relative;
}

.modal-content {
    position: absolute;
    top: 0;
    bottom: 0;
}

.register-modal .otp-genereting-intermediator button.resend-otp-btn, .register-modal .otp-genereting-intermediator button.resend-otp-btn:hover {
    width: auto;
    color: #404145;
    border: 1px solid #ddd;
    padding: 10px 15px;
}

.register-modal .otp-genereting-intermediator button.resend-otp-btn:disabled {
    cursor: not-allowed;
}

.register-modal .otp-genereting-intermediator button.resend-otp-btn i {
    margin-right: 5px;
}

.register-modal .verify-mob .spinner-border {
    width: 20px;
    height: 20px;
    margin-left: 10px;
}

.register-modal .relative-row {
    position: relative;
}

.register-modal .close-icon {
    position: absolute;
    right: 0;
    top: 8px;
}

.register-modal .registration-completed i {
    font-size: 80px;
    color: #1dbf73;
}

.register-modal .modal-body button.add-btn {
    width: auto;
    padding: 10px 12px 7px;
    font-size: 14px;
}

.register-modal .modal-body button.add-btn i {
    margin-right: 6px;
}

.modal-footer a {
    color: #1dbf73;
}

.register-modal .btn-custom, .register-modal .btn-custom:hover {
    padding: 12px 24px;
    background-color: #1dbf73;
    color: #fff;
}

.g-sigin {
    display: flex;
    font-family: 'lato-semibold';
    align-items: center;
    width: 100%;
    border: 1px solid #e4e5e7;
    color: #7a7d85;
    border-radius: 4px;
    padding: 12px 30px 12px 16px;
}

.g-sigin img {
    width: 30px;
    height: 30px;
}

.g-sigin p {
    flex: 1;
}

.register-modal .btn-holder {
    justify-content: center;
    display: flex;
    margin: 50px 0 10px;
    align-items: center;
}

.register-modal .btn-holder>button {
    flex: 1;
}

.register-modal .btn-holder>button:first-child {
    margin-right: 30px;
}

.register-modal .modal-body button {
    width: 100%;
    padding: 12px 24px;
}

.register-modal .modal-body button.single-button {
    margin: 10px 0;
}

.register-modal .modal-dialog {
    max-width: 744px;
    max-height: calc(100vh - 64px);
}

.register-modal .btn-holder.custom {
    margin: 10px 0;
}

.register-modal .btn-holder.custom button, .register-modal .btn-holder.custom button:hover {
    background-color: transparent;
    color: #1d1d1d;
    border: 1px solid #1d1d1d;
}

.register-modal .btn-holder.custom button i {
    font-size: 1.1rem;
    margin-right: 4px;
}
.modal-title.h4 {
    flex: 1;
    text-align: center;
    color: #404145;
}

.modal-header .close {
    position: absolute;
    right: 6%;
    top: 16px;
}

.modal-header {
    align-items: center;
    font-family: 'lato-bold';
    border-bottom: none;
}

.modal-footer {
    justify-content: center;
    font-size: 14px;
}

.modal-content {
    position: absolute;
    top: 0;
    bottom: 0;
}

.modal-footer a {
    color: #1dbf73;
}

.g-sigin {
    display: flex;
    font-family: 'lato-semibold';
    align-items: center;
    width: 100%;
    border: 1px solid #e4e5e7;
    color: #7a7d85;
    border-radius: 4px;
    padding: 12px 30px 12px 16px;
}

.g-sigin img {
    width: 30px;
    height: 30px;
}

.g-sigin p {
    flex: 1;
}


@media screen and (min-width: 1025px) {
	.events-container .heading {
		font-size: 2rem;
	}
	.root-main-content {
		min-height: 100vh;
	}
	.register-modal .modal-dialog {
        max-width: 550px;
    }
    .modal-content {
        position: relative;
        top: auto;
        bottom: auto;
    }
    .modal-body {
        padding: 0 36px 24px;
    }
}
`;