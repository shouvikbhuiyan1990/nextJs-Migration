import React, { useState, useRef, useEffect, useCallback } from 'react';
import uuid from 'react-uuid';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import cookie from '../../../utils/cookie';
import dayjs from 'dayjs';
import Link from 'next/link';
import UserInfo from './userInfo';
import Scrollspy from 'react-scrollspy';
import { ReactTinyLink } from "react-tiny-link";
import CourseTile from '../courseTile';
import Slider from "react-slick";
import EducationDetailsForm from './educationDetailsForm';
import JobDetailsForm from './jobDetailsForm';
import IntroductionForm from './introductionForm';
import HighlightsForm from './highlightsForm';
import CertForm from './certificationsForm';
import PatentsForm from './patentsForm';
import LinksForm from './linksForm';
import Feedbacks from './feedbacks';
import isEmpty from 'lodash/isEmpty';
import { updateUserProfile, resetProfileUpdateStatus, uploadImage } from '../../../store/actions/registration';
import { useRouter } from 'next/router';

const Styles = styled.div`
/* 2. Make nav sticky */

.user-info-tile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column-reverse;
    margin: 0 auto;
}

.profile-details .navbar-items {
    background-color: #fff;
    z-index: 11;
}

.profile-details .navbar-items>ul {
    display: flex;
    background-color: #fff;
    z-index: 8;
}

.profile-details .navbar-items>ul li {
    flex: 1;
}

.user-info-tile .profile-head-info {
    text-align: center;
}

.user-info-tile .profile-head-info .ratings {
    justify-content: center;
}

.user-info-tile .img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #ddd;
    background-size: cover;
}

.user-info-tile .fa {
    width: 20px;
}

.user-info-tile .name {
    font-size: 40px;
}

ol {
    padding: 0;
}

main.profile-details>nav {
    position: sticky;
    top: 91px;
    align-self: start;
    z-index: 99;
}

main.profile-details .section-nav li a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}

main.profile-details .section-nav li a i {
    font-size: 1.2rem;
}

main.profile-details .section-nav li.active a {
    color: #333;
    font-weight: 500;
    border-color: #1dbf73;
}

main.profile-details li {
    list-style: none;
}

main.profile-details .section-nav a {
    padding: 0.4rem 0.3rem;
    border-bottom: 2px solid #ededf0;
}

main.profile-details .body-profile-tab section>h2 {
    padding: 20px 0;
}

main.profile-details .courses-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
}

main.profile-details .centered-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

main.profile-details {
    padding-bottom: 20rem;
}

main.profile-details .course-tile {
    max-width: none;
    margin: 0;
}

main.profile-details .highlights-carousal a {
    margin: 0 10px 0 0;
    font-family: 'lato-regular';
}

main.profile-details .highlights-carousal .details-body {
    width: 90%;
    margin: 0 auto;
}

.teacher-details-tile .details-body {
    margin: 0 0 20px 10px;
}

.teacher-details .fa.fa-map-marker {
    margin-right: 5px;
}

ul {
    padding: 0;
}

.bordered-box ul li {
    padding: 10px 0;
}

.bordered-box ul li:last-child {
    padding-bottom: 0;
}

.bordered-box ul li i {
    font-size: 18px;
    width: 25px;
}

ul li {
    list-style: none;
}

main.profile-details h2 {
    font-size: 16px;
    font-family: 'lato-bold';
    color: #404145;
    text-transform: capitalize;
}

.bordered-box {
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
}

.bordered-box:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.bordered-box:first-child {
    padding-top: 0;
}

.box:first-child {
    border-bottom: none;
    border-top: none;
    margin-bottom: 0;
}

.teacher-details .profile .head {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.teacher-details .profile .img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #ddd;
}

.teacher-details .profile img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.ratings {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
}

.teacher-details .ratings {
    justify-content: center;
}

.teacher-details .profile-head-info {
    text-align: center;
}

.name {
    text-transform: capitalize;
    font-family: 'lato-bold';
    padding: 12px 0 7px;
    color: #0e0e0f;
}

.teacher-details .profile .head p:nth-child(2) {
    color: #62646a;
}

.ratings>p {
    padding: 5px 0 0;
}

.user-stats {
    padding: 15px 0 0 0;
    border-top: 1px solid #ddd;
}

.align-stats:first-child {
    margin-bottom: 15px;
}

.align-stats:last-child {
    margin-bottom: 0;
}

.align-stats {
    display: FLEX;
    margin-bottom: 15px;
    align-items: center;
    justify-content: space-between;
}

.align-stats i {
    font-size: 18px;
    width: 25px;
}

.align-stats p:nth-child(2) {
    color: #62646a;
    font-family: 'lato-bold';
}

.additiona-desc-description {
    display: flex;
    flex-direction: column;
}

.additiona-desc-description p {
    text-align: justify;
}

.additiona-desc-description.show-more-button p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
}

.additiona-desc-description button {
    align-self: center;
    background: none;
    border: none;
    color: #4a73e8;
    text-decoration: none;
    padding: 10px 0 0px;
    border-bottom: 1px solid #4a73e8;
    outline: none;
}

.additional-career-info .edu-tile p span.bold {
    font-family: 'lato-semibold';
}

.additional-career-info .edu-tile p:nth-child(2) {
    font-size: 14px;
}

.additional-career-info .edu-tile {
    margin: 10px 0;
}

.additional-career-info .edu-tile:first-child {
    margin-top: 0;
}

.additional-career-info .edu-tile:last-child {
    margin-bottom: 0;
}

/* Sidebar Navigation */

.section-nav {
    padding-left: 0;
}

.section-nav a {
    text-decoration: none;
    display: block;
    padding: .125rem 0;
    color: #ccc;
    transition: all 50ms ease-in-out;
    /* 💡 This small transition makes setting of the active state smooth */
}

.section-nav a:hover, .section-nav a:focus {
    color: #666;
}

/** page layout **/

main.profile-details {
    display: block;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
}

main.profile-details .courses-container .global-link-btn {
    align-self: center;
}

.intro-details-modal .profile-picture {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.intro-details-modal .profile-picture input[type="file"] {
    color: transparent;
    display: none;
}

.intro-details-modal .profile-picture .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 4px 8px;
    margin-top: 12px;
    cursor: pointer;
}

.general-details-modal .avatar {
    width: 150px;
    height: 150px;
}

.general-details-modal .btn-holder.delete-variation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0 10px;
}

.general-details-modal .btn-holder.delete-variation.justify-center {
    justify-content: center;
}

.general-details-modal .modal-dialog {
    max-width: 744px;
    max-height: calc(100vh - 64px);
}

.general-details-modal .modal-body {
    padding: 1rem;
}

.general-details-modal .btn-holder {
    text-align: center;
}

.date-range-error .invalid-feedback {
    display: block;
}

.highights-modal .input-group-text {
    cursor: pointer;
}

.highights-modal .form-row .relative-row {
    border-bottom: 1px solid #ddd;
    padding-top: 10px;
}

.highights-modal .form-row .relative-row.last-row {
    border-bottom: none;
}

.general-details-modal .btn-holder button:first-child {
    margin-right: 15px;
}

.general-details-modal .relative-row .col-md-1 {
    margin-bottom: 0;
    margin-top: 8px;
}

/** enlarge the sections for this demo, so that we have a long scrollable page **/

main.profile-details section {
    padding-top: 100px;
    padding-bottom: 2rem;
}

main.profile-details section:last-child {
    padding-top: 100px;
    padding-bottom: 20rem;
}

.edit-icon, .add-icon {
    font-size: 1rem;
    cursor: pointer;
}

.profile-info .edit-profile {
    text-align: right;
}

main.profile-details .section-nav {
    margin-bottom: -100px;
}

.user-feedbacks {
    margin: 40px 0;
}

.user-feedbacks .feedback-head {
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
}

.user-feedbacks .feedback-head .inner {
    max-width: 300px;
}

.user-feedbacks .feedback-head .inner .cont {
    margin-bottom: 10px;
}

.user-feedbacks .feed-tile {
    margin-bottom: 20px;
}

@media screen and (min-width: 1025px) {
    main.profile-details .section-nav {
        padding-top: 120px;
        margin-bottom: 0;
    }
    main.profile-details .courses-container {
        grid-template-columns: 1fr 1fr 1fr 0.3fr;
    }
    main.profile-details .section-nav li a i {
        font-size: 2rem;
    }
    main.profile-details .courses-container {
        padding: 0 4px;
    }
    .profile-details .navbar-items>ul {
        flex-direction: column;
    }
    main.profile-details .section-nav a {
        padding: 2.4rem 1.6rem;
        border-left: 4px solid #ededf0;
        border-bottom: none;
    }
    main.profile-details .body-profile-tab section>h2 {
        position: sticky;
        top: 81px;
        background-color: #fff;
        z-index: 9;
    }
    main.profile-details {
        display: flex;
    }
    main.profile-details .section-nav {
        width: 15%;
        max-width: 200px;
    }
    main.profile-details .body-profile-tab {
        width: 80%;
        padding: 0 3rem;
    }
    .teacher-details-tile .details-body {
        margin: 0 0 20px 10px;
    }
    .user-info-tile {
        width: 60%;
        flex-direction: row;
        padding: 0 3rem;
    }
    .user-info-tile p.remarks {
        max-width: 200px;
        margin-bottom: 10px;
    }
    .user-info-tile .profile-head-info {
        text-align: left;
        max-width: 400px;
    }
    .user-info-tile .profile-head-info .ratings {
        justify-content: flex-start;
    }
    main.profile-details .highlights-carousal .details-body {
        width: 95%;
    }
}
`;

const ProfileDetails = ({
    isStudent,
    name,
    id,
    profileUrl,
    rating,
    country,
    bestRated,
    description = '',
    linkedInUrl,
    otherLinks,
    slotTime,
    remarks,
    courses = [],
    feedbacks = [],
    metadata,
    editable,
    googleId,
    experiences = [],
    educations = []
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profileUpdateStatus = useSelector(state => state.registration.profileUpdateStatus);

    let metaDataForm = metadata || {};
    let patents = metaDataForm.patents || [];
    let highlights = metaDataForm.accomplishments || [];
    let certifications = metaDataForm.certification || [];
    let educationFromMetadata = metaDataForm.educations || [];
    let experiencesFromMetadata = metaDataForm.experiences || [];

    let educationCalc = [],
        experiencesCalc = [];

    if (!editable) {
        educationCalc = educations;
        experiencesCalc = experiences;
    }
    else {
        educationCalc = educationFromMetadata.slice(0);
        experiencesCalc = experiencesFromMetadata.slice(0);
        if (educations.length > 0) {
            educations.forEach((item) => {
                const checkIfExists = !!educationCalc.filter((itm) => itm.id === item.id).length;
                if (!checkIfExists) {
                    educationCalc.push(item);
                }
            })
        }
        if (experiences.length > 0) {
            experiences.forEach((item) => {
                const checkIfExists = !!experiencesCalc.filter((itm) => itm.id === item.id).length;
                if (!checkIfExists) {
                    experiencesCalc.push(item);
                }
            })
        }
    }


    experiencesCalc = experiencesCalc.map((item, idx) => {
        return ({
            ...item,
            tempId: idx + 1
        });
    });

    useEffect(() => {
        let minYearOfExp = 0;
        let maxYearOfExp = 0;
        let totalExp = 0;
        experiencesCalc.forEach((item, idx) => {
            if (Number((dayjs(item.from).get('y')) < minYearOfExp) || !minYearOfExp) {
                minYearOfExp = Number((dayjs(item.from).get('y')));
            }
            if (Number((dayjs(item.to || dayjs()).get('y')) > maxYearOfExp) || !maxYearOfExp) {
                maxYearOfExp = Number((dayjs(item.to || dayjs()).get('y')));
            }
        })

        if (maxYearOfExp && minYearOfExp) {
            totalExp = dayjs().year(maxYearOfExp).diff(dayjs().year(minYearOfExp), 'years');
        }

        setExp(totalExp);

    }, [experiencesCalc])

    educationCalc = educationCalc.map((item, idx) => (
        {
            ...item,
            tempId: idx + 1
        }
    ));

    const userInfoProps = {
        editable,
        name,
        profileUrl,
        rating,
        remarks,
        country,
        bestRated,
        slotTime
    };

    useEffect(() => {
        if (descRef && descRef.current && description) {
            setShowMore(descRef.current.offsetHeight < descRef.current.scrollHeight);
        }
        const checkForWordOverflowOnResize = () => {
            if (descRef && descRef.current) {
                setShowMore(descRef.current.offsetHeight < descRef.current.scrollHeight);
                setShowMoreTxt(true);
            }
        }
        window.addEventListener('resize', checkForWordOverflowOnResize);
        return () => {
            window.removeEventListener('resize', checkForWordOverflowOnResize);
        }
    }, [description]);


    const [showMore, setShowMore] = useState(true);
    const [showMoreTxt, setShowMoreTxt] = useState(true);
    const [showEducationEdit, setShowEducationEdit] = useState(false);
    const [showExperienceEdit, setShowExperience] = useState(false);
    const [showIntroEdit, setShowIntroEdit] = useState(false);
    const [showHighlightsEdit, setShowHighlightsEdit] = useState(false);
    const [showCertEdit, setShowCertEdit] = useState(false);
    const [showPatentsEdit, setShowPatentsEdit] = useState(false);
    const [showLinksEdit, setShowLinksEdit] = useState(false);
    const [exp, setExp] = useState(0);
    const [educationDetails, setEducationDetails] = useState({
        school: '',
        degree: '',
        field: '',
        startyear: '',
        endyear: '',
        id: null,
        teacherId: null,
        tempId: null
    });
    const [experienceDetails, setExperienceDetails] = useState({
        company: '',
        title: '',
        startYear: '',
        endYear: '',
        startMonth: '',
        endMonth: '',
        id: null,
        teacherId: null,
        tempId: null
    });
    const [introDetails, setIntroDetails] = useState({
        name: '',
        slotTime: '',
        description: '',
        remarks: '',
        country: '',
        profileUrl: ''
    });

    const descRef = useRef('');

    const formSubmit = (bodyObject, isMetadata, keyName, isFileUpload, flow) => {
        if (!isEmpty(bodyObject) && isFileUpload) {
            dispatch(uploadImage(bodyObject.fileToUpload, cookie.get('googleAuthId')[0], googleId || uuid().toString(), true, bodyObject, isStudent));
        }
        else if (!isEmpty(bodyObject) && !isMetadata && !isFileUpload) {
            dispatch(updateUserProfile(JSON.stringify(bodyObject), cookie.get('googleAuthId')[0], isStudent));
        }
        else if (!isEmpty(bodyObject) && isMetadata) {
            let obj = {};
            if (keyName === 'experiences' || keyName === 'educations') {
                let data = [];
                if (keyName === 'experiences') {
                    if (flow === 'new') {
                        data = [...experiencesCalc];
                    }
                    else if (flow === 'edit' || flow === 'delete') {
                        data = experiencesCalc.filter((filterValue) => {
                            return filterValue.tempId !== bodyObject[keyName][0].tempId
                        });
                    }
                    if (flow === 'delete') {
                        bodyObject[keyName][0].deleted = 1;
                    }
                }
                else if (keyName === 'educations') {
                    if (flow === 'new') {
                        data = [...educationCalc];
                    }
                    else if (flow === 'edit' || flow === 'delete') {
                        data = educationCalc.filter((filterValue) => {
                            return filterValue.tempId !== bodyObject[keyName][0].tempId
                        });
                    }
                    if (flow === 'delete') {
                        bodyObject[keyName][0].deleted = 1;
                    }
                }

                if (flow === 'delete' && !bodyObject[keyName][0].id) {
                    obj = [
                        ...data
                    ];
                }
                else {
                    obj = [
                        ...data,
                        bodyObject[keyName][0]
                    ];
                }
                bodyObject[keyName] = obj;
            }

            delete metaDataForm[keyName];
            const metaDataBodyObject = {
                metadata: {
                    ...metaDataForm,
                    ...bodyObject
                }
            };

            dispatch(updateUserProfile(JSON.stringify(metaDataBodyObject), cookie.get('googleAuthId')[0], isStudent));
        }
        else {
            dispatch(resetProfileUpdateStatus('success'));
        }
    }

    const setEducationDetailsFunc = (details) => {
        dispatch(resetProfileUpdateStatus(''));
        setShowEducationEdit(!showEducationEdit);
        setEducationDetails({
            ...educationDetails,
            school: details.school,
            degree: details.degree,
            field: details.field,
            startyear: Number(dayjs(details.from).get('y')),
            endyear: details.to ? Number(dayjs(details.to).get('y')) : Number(dayjs().get('y')),
            id: details.id,
            teacherId: details.teacherId,
            tempId: details.tempId
        })
    }

    const setExperienceDetailsFunc = (details) => {
        dispatch(resetProfileUpdateStatus(''));
        setShowExperience(!showEducationEdit);
        setExperienceDetails({
            ...experienceDetails,
            company: details.company,
            title: details.title,
            startYear: Number(dayjs(details.from).get('y')),
            endYear: details.to ? Number(dayjs(details.to).get('y')) : Number(dayjs().get('y')),
            startMonth: Number(dayjs(details.from).get('M')) + 1,
            endMonth: details.to ? Number(dayjs(details.to).get('M')) + 1 : Number(dayjs().get('M')) + 1,
            id: details.id,
            teacherId: details.teacherId,
            tempId: details.tempId
        })
    }

    const setIntroDetailsFunc = () => {
        dispatch(resetProfileUpdateStatus(''));
        setShowIntroEdit(!showIntroEdit);
        setIntroDetails({
            ...introDetails,
            name,
            slotTime,
            remarks,
            country,
            description,
            profileUrl
        })
    }

    const goToCourseDetailsPage = () => {
        router.push({
            pathname: `${id}/allCources`,
            state: {
                id
            }
        })
    }

    const getExperienceText = () => {
        if (exp) {
            return `(${exp}+ Years)`;
        }
        return '';
    }

    const getIntroSection = () => {
        return (
            <div className='box'>
                <div className='additional-details'>
                    <div className={`bordered-box additiona-desc-description ${showMore && showMoreTxt ? 'show-more-button' : ''}`}>
                        <div className='centered-with-space'>
                            <h2>Description</h2>
                        </div>
                        <p ref={descRef}>{description || 'Not Added'}</p>
                        {description && showMore &&
                            <button onClick={() => setShowMoreTxt(!showMoreTxt)}>
                                {showMoreTxt ? 'View More' : 'View Less'}
                            </button>
                        }
                    </div>
                    {(experiencesCalc.length > 0 || editable) &&
                        <div className='bordered-box'>
                            <div className='centered-with-space'>
                                <h2>{`Experience ${getExperienceText()}`}</h2>
                                {editable &&
                                    <div className='edit-profile'>
                                        <i onClick={() => { dispatch(resetProfileUpdateStatus('')); setShowExperience(!showExperienceEdit) }} className="add-icon fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                }
                            </div>
                            <div className='additional-career-info'>
                                {
                                    experiencesCalc.length > 0 && experiencesCalc.map((value) => (
                                        <div className='edu-tile centered-with-space'>
                                            <p>
                                                <span className='bold'>{`${value.title} `}</span>
                                        at
                                        <span className='bold'>{` ${value.company} `}</span>
                                        from
                                        <span className='bold'>{` ${dayjs(value.from).get('y')}-${value.to ? dayjs(value.to).get('y') : 'Present'}`}</span>
                                            </p>
                                            {editable &&
                                                <div className='edit-profile'>
                                                    <i onClick={() => setExperienceDetailsFunc(value)} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                                {
                                    experiencesCalc.length === 0 &&
                                    <div className='details-body'>
                                        <p>None</p>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {(educationCalc.length > 0 || editable) &&
                        <div className='bordered-box'>
                            <div className='centered-with-space'>
                                <h2>Education</h2>

                                {editable &&
                                    <div className='edit-profile'>
                                        <i onClick={() => { dispatch(resetProfileUpdateStatus('')); setShowEducationEdit(!showEducationEdit) }} className="edit-icon fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                }
                            </div>
                            <div className='additional-career-info'>
                                {
                                    educationCalc.length > 0 && educationCalc.map((value) => (
                                        <div className='edu-tile centered-with-space'>
                                            <span>
                                                <p><span className='bold'>{value.school}</span> from <span className='bold'>{` ${dayjs(value.from).get('y')}-${value.to ? dayjs(value.to).get('y') : 'Present'}`}</span></p>
                                                {value.degree && value.field &&
                                                    <p>{`${value.degree}, ${value.field}`}</p>
                                                }
                                                {value.degree && !value.field &&
                                                    <p>{`${value.degree}`}</p>
                                                }
                                                {value.field && !value.degree &&
                                                    <p>{`${value.field}`}</p>
                                                }
                                            </span>
                                            {editable &&
                                                <div className='edit-profile'>
                                                    <i onClick={() => setEducationDetailsFunc(value)} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                                {
                                    educationCalc.length === 0 &&
                                    <div className='details-body'>
                                        <p>None</p>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    <div className='bordered-box'>
                        <h2>Language</h2>
                        <p>English</p>
                    </div>
                    {(linkedInUrl || otherLinks) &&
                        <div className='bordered-box'>
                            <div className='centered-with-space'>
                                <h2>Linked Accounts</h2>
                                {editable &&
                                    <div className='edit-profile'>
                                        <i onClick={() => setShowLinksEdit(!showLinksEdit)} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                                    </div>
                                }
                            </div>
                            <ul>
                                {linkedInUrl &&
                                    <li>
                                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                                        <a href={linkedInUrl} target='_blank' rel='noopener noreferrer' >LinkedIn</a>
                                    </li>
                                }
                                {otherLinks &&
                                    <li>
                                        <i className="fa fa-link" aria-hidden="true"></i>
                                        <a href={otherLinks} target='_blank' rel='noopener noreferrer' >Other Links</a>
                                    </li>
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div >
        )
    }

    const getCourseTiles = () => {
        return (
            <div className='courses-container'>
                {
                    courses && courses.length > 0 &&
                    courses.map((value, index) => {
                        if (index < 3) {
                            return <CourseTile profileUrl={profileUrl} {...value} key={value.id} blockTeacherDetails blockCourseDetails courseId={value.id} />
                        }
                        else {
                            return <React.Fragment></React.Fragment>
                        }
                    })
                }
                {courses.length > 3 &&
                    <div className='centered-btn'>
                        <button onClick={goToCourseDetailsPage} className='global-link-btn'>View All</button>
                    </div>
                }
                {
                    editable && courses.length === 0 &&
                    <div className='details-body'>
                        <p><Link href={`/dashboard/courses`}>Add Courses</Link></p>
                    </div>
                }
            </div>)
    };

    const getHighlightsSection = () => {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        };
        return (
            <React.Fragment>
                {(highlights.length > 0 || editable) &&
                    <div className='teacher-details-tile highlights-carousal bordered-box'>
                        <div className='centered-with-space'>
                            <h2>Highlights</h2>

                            {editable &&
                                <div className='edit-profile'>
                                    <i onClick={() => setShowHighlightsEdit(!showHighlightsEdit)} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                                </div>
                            }
                        </div>

                        {editable && highlights.length === 0 &&
                            <div className='details-body'>
                                <p>None</p>
                            </div>
                        }
                        {highlights.length > 0 &&
                            <div className='details-body'>
                                <Slider {...settings}>
                                    {
                                        highlights.map((value, index) => {
                                            if (value.type === 'link' && typeof window !== 'undefined') {
                                                return (
                                                    <ReactTinyLink
                                                        cardSize="small"
                                                        showGraphic={true}
                                                        maxLine={2}
                                                        minLine={1}
                                                        url={value.value}
                                                    />)
                                            }
                                            return <React.Fragment></React.Fragment>;
                                        })
                                    }
                                </Slider>
                            </div>
                        }
                    </div>
                }
                {(certifications.length > 0 || editable) &&
                    <div className='teacher-details-tile bordered-box highlights-carousal'>
                        <div className='centered-with-space'>
                            <h2>Certifications</h2>
                            {editable &&
                                <div className='edit-profile'>
                                    <i onClick={() => setShowCertEdit(!showCertEdit)} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                                </div>
                            }
                        </div>
                        {editable && certifications.length === 0 &&
                            <div className='details-body'>
                                <p>None</p>
                            </div>
                        }
                        {
                            certifications.length > 0 &&
                            <div className='details-body additional-career-info'>
                                {
                                    certifications.map((value, index) => <div className='edu-tile'>
                                        {value.name && value.year &&
                                            <p>
                                                <span className='bold'>{`${value.name}, ${value.year}`}</span>
                                            </p>
                                        }
                                        {value.name && !value.year &&
                                            <p>
                                                <span className='bold'>{`${value.name}`}</span>
                                            </p>
                                        }
                                        {value.link &&
                                            <p><a rel="noopener noreferrer" target='_blank' href={value.link}>{value.link}</a></p>
                                        }
                                    </div>)
                                }
                            </div>
                        }
                    </div>
                }
                {(patents.length > 0 || editable) &&
                    <div className='teacher-details-tile bordered-box highlights-carousal'>
                        <div className='centered-with-space'>
                            <h2>Patents</h2>

                            {editable &&
                                <div className='edit-profile'>
                                    <i onClick={() => setShowPatentsEdit(!showPatentsEdit)} className="edit-icon fa fa-pencil" aria-hidden="true"></i>
                                </div>
                            }
                        </div>
                        {editable && patents.length === 0 &&
                            <div className='details-body'>
                                <p>None</p>
                            </div>
                        }
                        {
                            patents.length > 0 &&
                            <div className='details-body additional-career-info'>
                                {
                                    patents.map((value, index) => <div className='edu-tile'>
                                        {value.name && value.year &&
                                            <p>
                                                <span className='bold'>{`${value.name}, ${value.year}`}</span>
                                            </p>
                                        }
                                        {value.name && !value.year &&
                                            <p>
                                                <span className='bold'>{`${value.name}`}</span>
                                            </p>
                                        }
                                        {value.link &&
                                            <p><a rel="noopener noreferrer" target='_blank' href={value.link}>{value.link}</a></p>
                                        }
                                    </div>)
                                }
                            </div>
                        }
                    </div>
                }
            </React.Fragment>
        )
    };

    const resetAllModalValues = useCallback(() => {
        setShowEducationEdit(false);
        setShowExperience(false);
        setShowIntroEdit(false);
        setShowHighlightsEdit(false);
        setShowCertEdit(false);
        setShowPatentsEdit(false);
        setShowLinksEdit(false);
        setEducationDetails({
            ...educationDetails,
            school: '',
            degree: '',
            field: '',
            startyear: '',
            endyear: ''
        });
        setExperienceDetails({
            ...experienceDetails,
            company: '',
            title: '',
            startYear: '',
            endYear: '',
            startMonth: '',
            endMonth: ''
        });
        setIntroDetails({
            name: '',
            remarks: '',
            description: '',
            slotTime: '',
            country: '',
            profileUrl: ''
        });
    }, [educationDetails, experienceDetails]);

    useEffect(() => {
        if (profileUpdateStatus === 'success' || profileUpdateStatus === 'error') {
            resetAllModalValues();
        }
    }, [profileUpdateStatus, resetAllModalValues]);


    return (
        <Styles>
            <EducationDetailsForm
                show={showEducationEdit}
                hideEducationModal={resetAllModalValues}
                educationDetails={educationDetails}
                formSubmit={formSubmit}
            />
            <JobDetailsForm
                show={showExperienceEdit}
                hideJobDetailsModal={resetAllModalValues}
                experienceDetails={experienceDetails}
                formSubmit={formSubmit}
            />
            <IntroductionForm
                show={showIntroEdit}
                hideIntroModal={resetAllModalValues}
                intro={introDetails}
                formSubmit={formSubmit}
                isStudent={isStudent}
            />
            <HighlightsForm
                show={showHighlightsEdit}
                hideHighlightsModal={resetAllModalValues}
                highlightsObject={highlights}
                formSubmit={formSubmit}
            />
            <CertForm
                show={showCertEdit}
                certificationsModal={resetAllModalValues}
                certificationsObject={certifications}
                formSubmit={formSubmit}
            />
            <PatentsForm
                show={showPatentsEdit}
                patentsModal={resetAllModalValues}
                patentsObject={patents}
                formSubmit={formSubmit}
            />
            <LinksForm
                show={showLinksEdit}
                hideLinksModal={resetAllModalValues}
                linkedInUrl={linkedInUrl}
                otherLinks={otherLinks}
                formSubmit={formSubmit}
            />
            <UserInfo
                {...userInfoProps}
                setEdit={setIntroDetailsFunc}
                isStudent={isStudent}
            />
            <main className='profile-details'>
                <nav className="section-nav">
                    <ul className="navbar-items">
                        <Scrollspy
                            items={['introduction', 'highlights', 'cources', 'recognitions']}
                            currentClassName="active"
                            offset={-100}
                        >
                            <li>
                                <a href="#introduction">
                                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                    Introduction
                                </a>
                            </li>

                            {(!(highlights.length === 0 && certifications.length === 0 && patents.length === 0) || editable) &&
                                <li>
                                    <a href="#highlights">
                                        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                                        Highlights
                                    </a>
                                </li>
                            }
                            {(courses.length > 0) &&
                                <li>
                                    <a href="#cources">
                                        <i className="fa fa-id-card-o" aria-hidden="true"></i>
                                        Cources
                                    </a>
                                </li>
                            }
                            {feedbacks.length > 0 &&
                                <li>
                                    <a href="#recognitions">
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        Reviews
                                    </a>
                                </li>
                            }
                        </Scrollspy>
                    </ul>
                </nav>
                <div className='body-profile-tab'>
                    <section id="introduction">
                        <h2>Introduction</h2>
                        {getIntroSection()}
                    </section>
                    {(!(highlights.length === 0 && certifications.length === 0 && patents.length === 0) || editable) &&
                        <section id="highlights">
                            <h2>Contributions/Highlights</h2>
                            {getHighlightsSection()}
                        </section>
                    }
                    {(courses.length > 0) &&
                        <section id="cources">
                            <h2>Cources</h2>
                            {getCourseTiles()}
                        </section>
                    }
                    {feedbacks.length > 0 &&
                        <section id="recognitions">
                            <h2>Recognitions</h2>
                            <Feedbacks feedbacks={feedbacks} />
                        </section>
                    }
                </div>
            </main>
        </Styles>
    )
}

export default ProfileDetails;