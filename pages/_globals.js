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

.calendar-modal .modal-dialog {
    max-width: none;
}

.calendar-modal a, .calendar-modal a:not([href]):not([class]) {
    color: #4a73e8;
    text-decoration: none;
    padding: 0 0 6px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}

.strikethrough {
    position: relative;
}

.strikethrough:before {
    position: absolute;
    content: "";
    left: 0;
    top: 50%;
    right: 0;
    border-top: 2px solid;
    border-color: #dc3545;
    -webkit-transform: rotate(-6deg);
    -moz-transform: rotate(-6deg);
    -ms-transform: rotate(-6deg);
    -o-transform: rotate(-6deg);
    transform: rotate(-6deg);
}

.calendar-modal .btn-holder {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 34px 0;
}

.calendar-modal .btn-holder .buttons {
    flex-direction: column;
    display: flex;
    justify-content: flex-end;
    align-self: center;
    width: 100%;
}

.calendar-modal .btn-holder .buttons button:first-child, .calendar-modal .btn-holder .info-status {
    margin-bottom: 16px;
}

.calendar-modal .btn-holder .info-status .info {
    display: flex;
    align-items: center;
    padding: 4px 0;
    font-size: 14px;
}

.calendar-modal .btn-holder .info-status .info p.color {
    width: 40px;
    height: 5px;
    background-color: #ddd;
    border-radius: 4px;
    margin-right: 18px;
}

.calendar-modal .btn-holder .info-status .info.available p.color {
    background-color: #1dbf73;
}

.calendar-modal .btn-holder .info-status .info.booked p.color {
    background-color: #F0675F;
}

.calendar-modal .modal-content {
    min-height: 80vh;
    position: relative;
}

.calendar-modal .modal-content .loader {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    z-index: 9;
    height: 100%;
}

.calendar-modal .date-holder {
    padding: 25px 15px;
    text-align: center;
    cursor: pointer;
}

.calendar-modal .modal-header .close {
    right: 20px;
}

.calendar-modal .modal-body {
    margin: 0 24px 0;
}

.calendar-modal .day-holder {
    max-height: 400px;
    overflow: auto;
}

.calendar-modal .date-holder-conatiner .slick-current {
    border-bottom: 4px solid #1dbf73;
    font-family: 'lato-bold';
}

.calendar-modal .day-holder .day-separator {
    padding: 16px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
}

.calendar-modal .day-holder .day-separator .day-time {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 16px;
    width: 150px;
}

.calendar-modal .day-holder .day-separator .day-time i {
    margin-right: 8px;
    margin-bottom: 4px;
}

.calendar-modal .day-holder .day-separator:last-child {
    border: none;
}

.calendar-modal .day-holder .day-separator .time-slots .slot-pill {
    width: 30%;
    padding: 4px;
}

.calendar-modal .day-holder.booking-flow .day-separator .time-slots .slot-pill {
    width: 40%;
}

.calendar-modal .day-holder.booking-flow .day-separator .time-slots .slot-pill span {
    width: 140px;
}

.calendar-modal .day-holder .day-separator .time-slots .slot-pill span {
    width: 84px;
    border-radius: 3px;
    border: 1px solid #e0e0e4;
    padding: 5px 0;
    display: inline-block;
    text-align: center;
    color: #2d2d32;
    cursor: pointer;
}

.calendar-modal .day-holder .day-separator .time-slots .slot-pill.available span {
    border-color: #1dbf73;
}

.calendar-modal.modal .buttons button {
    padding: 15px 35px;
}

.calendar-modal .date-holder .slot-availability {
    font-size: 12px;
    color: #1dbf73;
}

.calendar-modal .day-holder.no-date-cont {
    min-height: 250px;
    display: FLEX;
    justify-content: center;
    align-items: center;
}

.calendar-modal .day-holder.no-date-cont .no-date {
    text-align: center;
}

.calendar-modal .day-holder.no-date-cont .no-date i {
    font-size: 36px;
    margin-bottom: 10px;
    color: #F06860;
}

.calendar-modal .day-holder.no-date-cont .no-date p {
    font-size: 16px;
}

.calendar-modal .day-holder .day-separator .time-slots .slot-pill.hold span {
    background-color: #f0f0f5;
    color: #28328c;
    border: 1px solid #28328c;
}

.calendar-modal .day-holder .day-separator .time-slots .slot-pill.booked span {
    border-color: #F0675F;
}

.calendar-modal .day-holder .day-separator .time-slots .slot-pill span:hover {
    background-color: #f0f0f5;
    color: #28328c;
    border: 1px solid #28328c;
}

.calendar-modal .day-holder .day-separator .time-slots {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
}

.calendar-modal .day-holder-container .slick-prev:before, .calendar-modal .day-holder-container .slick-next:before {
    display: none;
}
.feedback-modal .centered-without-space {
    flex-direction: column;
}

.feedback-modal .avatar {
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
    background-size: cover;
    background-repeat: no-repeat;
}

.feedback-modal p {
    margin-bottom: 10px;
}

.feedback-modal .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 9;
}

.feedback-modal .modal-dialog {
    max-width: none;
    position: relative;
}

.feedback-modal .feedback-form {
    text-align: center;
}

.feedback-modal .buttons button:first-child {
    margin-right: 12px;
}

.feedback-modal textarea {
    margin-top: 22px;
    min-height: 150px;
}

.feedback-modal .modal-footer {
    border: none;
}



@media screen and (min-width: 750px) {
    .calendar-modal .day-holder .day-separator .time-slots .slot-pill {
        width: 20%;
    }
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
    .calendar-modal .modal-dialog {
        max-width: none;
        width: 70%;
    }
    .calendar-modal .day-holder .day-separator .day-time {
        justify-content: center;
        margin-bottom: 0;
    }
    .calendar-modal .btn-holder .buttons button:first-child {
        margin-right: 16px;
        margin-bottom: 0;
    }
    .calendar-modal .btn-holder {
        flex-direction: row;
    }
    .calendar-modal .btn-holder .buttons {
        flex-direction: row;
        width: auto;
    }
    .calendar-modal .date-holder-conatiner {
        margin-left: 150px;
    }
    .calendar-modal .day-holder .day-separator {
        flex-direction: row;
    }
    .calendar-modal .day-holder .day-separator .time-slots .slot-pill {
        width: 14.285%;
    }
    .calendar-modal .day-holder.booking-flow .day-separator .time-slots .slot-pill {
        width: 20.285%;
    }
    .feedback-modal .modal-dialog {
        max-width: none;
        width: 55%;
    }
}
`;