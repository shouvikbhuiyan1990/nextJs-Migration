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

import './index.css';

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
    )
}

export default Messages;