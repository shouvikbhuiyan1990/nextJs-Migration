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



const Styles = styled.div`
.share-page-modal button {
    margin: 0 10px;
}

.share-page-modal button:first-child {
    margin-left: 0;
}

.share-page-modal button:last-child {
    margin-right: 0;
}

.share-page-modal .modal-header p {
    width: 100%;
    text-align: center;
}

.fixed-pos {
    position: fixed;
    right: 2px;
    display: flex;
    flex-direction: column;
    top: 50%;
    padding: 20px 10px;
    transform: translateY(-50%);
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
}

.fixed-pos>button:first-child {
    margin-top: 0;
}

.fixed-pos>button:last-child {
    margin-bottom: 0;
}

.fixed-pos>button {
    margin: 10px 0;
}
`;

const WrapShareButtons = styled.div`
text-align: center;
`;
const SharePage = (props) => {
    let url = '';

    if (process.env.NODE_ENV === 'development') {
        url = 'www.google.com';
    }
    else {
        url = props.url;
    }

    if (!props.noModal) {
        return (
            <Styles>
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
            </Styles>
        )
    }
    else if (props.noModal) {
        return (
            <Styles>
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
            </Styles>
        )
    }
}

export default SharePage;