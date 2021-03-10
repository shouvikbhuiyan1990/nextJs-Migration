import React, { useState, useEffect, useRef } from 'react';
import cookie from '../../../utils/cookie';
import get from 'lodash/get';
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { setActiveMessageThread, sendMessage } from '../../../store/actions/booking';
// import ReactQuill from 'react-quill';
import UserTile from './userTile';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IndMessages from './individualMessages';
// import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const Styles = styled.div`.messaging-landing {
    height: calc(100vh - 360px);
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    -webkit-box-shadow: -1px 0px 12px 5px rgb(0 0 0 / 7%);
    -moz-box-shadow: -1px 0px 12px 5px rgb(0 0 0 / 7%);
    box-shadow: -1px 0px 12px 5px rgb(0 0 0 / 7%);
}

.messaging-landing .head {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
}

.messaging-landing .head.content {
    flex-direction: row;
    align-items: center;
}

.messaging-landing .head.content .back-arrow {
    margin-right: 12px;
    cursor: pointer;
}

.messaging-landing .head.content p:last-child {
    font-size: 0.8rem;
}

.messaging-landing .heading {
    font-family: 'lato-bold';
    font-size: 1.2rem;
    margin: 0;
}

.messaging-landing .user-info-msg {
    display: none;
    transition: all 0.1s linear;
}

.messaging-landing .user-info-msg.display {
    display: block;
}

.messaging-landing .user-tile-msg {
    display: flex;
    cursor: pointer;
}

.messaging-landing .user-tile-msg:hover, .messaging-landing .user-tile-msg.active {
    background-color: #e6e9ec;
    font-weight: bold;
    font-family: 'lato-bold';
}

.messaging-landing .user-tile-msg .avatar-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
}

.messaging-landing .user-tile-msg:last-child .user-info-id {
    border: none;
}

.messaging-landing .user-tile-msg .user-info-id .name-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.messaging-landing .user-tile-msg .user-info-id .name-header p:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    padding-right: 10px;
}

.messaging-landing .user-tile-msg .user-info-id {
    padding: 20px 8px;
    border-bottom: 1px solid #e6e9ec;
    overflow: hidden;
    flex-grow: 1;
}

.messaging-landing .error-msg {
    padding: 0 20px;
    background-color: #dc3545;
    color: #fff;
    height: 0;
    box-sizing: border-box;
    transition: all 0.5s linear;
}

.messaging-landing .error-msg p {
    padding: 5px 0;
}

.messaging-landing .error-msg.show {
    height: auto;
}

.messaging-landing .user-info-msg {
    height: calc(100vh - 360px);
    overflow: auto;
    border: none;
    border-right: 1px solid #ccc;
    height: 100%;
    flex: 1;
}

.messaging-landing .message-body {
    flex-direction: column;
    transition: all 0.1s linear;
    flex: 0;
    overflow: hidden;
    display: flex;
    position: relative;
}

.messaging-landing .message-body .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
}

.messaging-landing .message-body.display {
    flex: 1;
}

.messaging-landing .message-body .msg-content {
    flex: 1;
}

.messaging-landing .message-body .msg-send {
    position: relative;
}

.messaging-landing .message-body .msg-send textarea {
    min-height: 50px;
    border: none;
    border-top: 2px solid #e6e9ec;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    resize: none;
}

.messaging-landing .message-body .msg-send textarea:focus {
    border-top: 3px solid #1dbf73;
}

.messaging-landing .message-body .btn-hold {
    padding: 6px 8px;
    background-color: #e6e9ec;
    text-align: right;
}

.messaging-landing .msg-content {
    padding: 10px 20px;
    max-height: 100vh;
    overflow: auto;
}

.messaging-landing .ind-messages {
    display: flex;
    margin-bottom: 20px;
}

.messaging-landing .ind-messages>div:first-child {
    flex: 0 1 auto;
    margin-right: 12px;
}

@media screen and (min-width: 750px) {}

.messaging-landing .ind-messages>div:last-child {
    flex: 1;
}

@media screen and (min-width: 1025px) {
    .messaging-landing .head.content {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    .messaging-landing .head.content .back-arrow {
        display: none;
    }
    .messaging-landing {
        height: calc(100vh - 100px);
    }
    .messaging-landing .message-body .btn-hold {
        padding: 20px 10px;
    }
    .messaging-landing .message-body .msg-send textarea {
        min-height: 200px;
    }
    .messaging-landing .user-info-msg, .messaging-landing .message-body {
        display: block;
    }
    .messaging-landing .message-body {
        flex: 1;
        overflow: auto;
    }
    .messaging-landing .user-info-msg {
        flex: 0 1 30%;
        height: calc(100vh - 100px);
    }
    .messaging-landing .message-body {
        display: flex;
    }
    .messaging-landing .msg-content {
        height: auto;
        max-height: 100vh;
    }
}`;

const Messages = ({
    messages = []
}) => {
    const dispatch = useDispatch();
    const scrollRef = useRef('');
    const [feedback, setFeedback] = useState("");
    const [showMobileMessageContent, setMobileMessageContent] = useState(false);
    const activeMessage = useSelector(state => state.booking.activeMessage);
    const messageStatus = useSelector(state => state.booking.messageStatus);

    const getDetails = () => {
        if (activeMessage[0]?.chatAs === 'teacher') {
            return {
                name: activeMessage[0]?.studentName || '',
                image: activeMessage[0]?.studentImg || "https://randomuser.me/api/portraits/lego/3.jpg"
            };
        }
        else if (activeMessage[0]?.chatAs === 'student') {
            return {
                name: activeMessage[0]?.teacherName || '',
                image: activeMessage[0]?.teacherImg || "https://randomuser.me/api/portraits/lego/3.jpg"
            };
        }
        return {
            name: '',
            image: "https://randomuser.me/api/portraits/lego/3.jpg"
        };
    }

    const getList = () => {
        return messages.map((item) => (
            <UserTile
                {...item}
                toggleMessageContent={toggleMessageContent}
                showMobileMessageContent={showMobileMessageContent}
                activeId={get(activeMessage, '[0].bookingId')}
            />
        ));
    }

    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [activeMessage])

    const toggleMessageContent = (id) => {
        dispatch(setActiveMessageThread(id));
        setMobileMessageContent(!showMobileMessageContent);
    }


    const prepareToSendMessage = () => {
        const body = {
            "bookingId": get(activeMessage, '[0].bookingId'),
            "message": feedback.trim()
        }
        setFeedback("");
        dispatch(sendMessage(cookie.get('googleAuthId')[0], body));
    }

    const postMessageOnEnter = (e) => {
        if (e.keyCode === 13) {
            prepareToSendMessage();
            e.preventDefault();
            return false;
        }

        return true;
    }

    const onMessageTextChange = (e) => {
        setFeedback(e.target.value);
    }

    return (
        <Styles>
            <div className='messaging-landing'>
                <div className={`user-info-msg ${!showMobileMessageContent ? 'display' : ''}`}>
                    <div className='head'>
                        <h4 className='heading'>Messaging</h4>
                    </div>
                    {
                        getList()
                    }
                </div>
                <div className={`message-body ${showMobileMessageContent ? 'display' : ''}`}>
                    {messageStatus === 'loading' && <div className='loader'>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                    }
                    <div className='head content'>
                        <div className='back-arrow' onClick={toggleMessageContent}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className='bold'>{getDetails().name}</p>
                            <p>Order Id: #{get(activeMessage, '[0].bookingId')}</p>
                        </div>
                    </div>
                    <div className={`error-msg ${messageStatus === 'error' ? 'show' : ''}`}>
                        <p>We could not deliver your messge</p>
                    </div>
                    <div className='msg-content'>
                        {
                            activeMessage[0] && activeMessage[0].chats && activeMessage[0].chats.map((item) => (
                                <IndMessages
                                    {...activeMessage[0]}
                                    {...item}
                                    profile={"https://randomuser.me/api/portraits/lego/3.jpg"}
                                />
                            ))
                        }

                        <div ref={scrollRef}></div>
                    </div>
                    <div className='msg-send'>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Send feedback"
                            onChange={onMessageTextChange}
                            onKeyDown={postMessageOnEnter}
                            value={feedback}
                        />
                        {/* <ReactQuill
                        value={feedback}
                        onChange={(e) => { setFeedback(e) }}
                        placeholder="Send feedback"
                    /> */}
                    </div>
                    <div className='btn-hold'>
                        <Button
                            className='btn-theme-global'
                            disabled={!feedback}
                            onClick={prepareToSendMessage}
                        >
                            Send
                    </Button>
                    </div>
                </div>
            </div>
        </Styles>
    )
}

export default Messages;