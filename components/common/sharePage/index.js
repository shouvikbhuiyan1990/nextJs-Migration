import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import './index.css';


const SharePage = (props) => {
    let url = '';

    if (process.env.NODE_ENV === 'development') {
        url = 'www.google.com';
    }
    else {
        url = props.url;
    }

    const WrapShareButtons = styled.div`
        text-align: center;
    `;

    if (!props.noModal) {
        return (
            <Modal
                show={props.show}
                onHide={props.setDisplay}
                centered={true}
                className='share-page-modal'
            >
                <Modal.Header closeButton>
                    <p>Share This Page</p>
                </Modal.Header>
                <Modal.Body>
                    <WrapShareButtons>
                        <FacebookShareButton
                            url={url}
                            quote={props.text}>
                            <FacebookIcon size={36} round={true} />
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={url}
                            title={props.text}>
                            <TwitterIcon size={36} round={true} />
                        </TwitterShareButton>

                        <EmailShareButton
                            subject={props.subject}
                            body={`${props.text}: ${url}`}>
                            <EmailIcon size={36} round={true} />
                        </EmailShareButton>

                        <LinkedinShareButton
                            url={url}
                            title={props.text}
                            source={url}
                            summary={`${url}`}>
                            <LinkedinIcon size={36} round={true} />
                        </LinkedinShareButton>

                        <WhatsappShareButton
                            url={url}
                            subject={props.subject}
                            body={`${props.text}: ${url}`}>
                            <WhatsappIcon size={36} round={true} />
                        </WhatsappShareButton>

                        <TelegramShareButton
                            url={url}
                            subject={props.subject}
                            body={`${props.text}: ${url}`}>
                            <TelegramIcon size={36} round={true} />
                        </TelegramShareButton>
                    </WrapShareButtons>
                </Modal.Body>
            </Modal>
        )
    }
    else if (props.noModal) {
        return (
            <WrapShareButtons className='fixed-pos'>
                <FacebookShareButton
                    url={url}
                    quote={props.text}>
                    <FacebookIcon size={36} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                    url={url}
                    title={props.text}>
                    <TwitterIcon size={36} round={true} />
                </TwitterShareButton>

                <EmailShareButton
                    subject={props.subject}
                    body={`${props.text}: ${url}`}>
                    <EmailIcon size={36} round={true} />
                </EmailShareButton>

                <LinkedinShareButton
                    url={url}
                    title={props.text}
                    source={url}
                    summary={`${url}`}>
                    <LinkedinIcon size={36} round={true} />
                </LinkedinShareButton>

                <WhatsappShareButton
                    url={url}
                    subject={props.subject}
                    body={`${props.text}: ${url}`}>
                    <WhatsappIcon size={36} round={true} />
                </WhatsappShareButton>

                <TelegramShareButton
                    url={url}
                    subject={props.subject}
                    body={`${props.text}: ${url}`}>
                    <TelegramIcon size={36} round={true} />
                </TelegramShareButton>
            </WrapShareButtons>
        )
    }
}

export default SharePage;