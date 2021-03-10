import styled from 'styled-components';

const ContainerStyles = styled.div`
.course-landing-user, .search-landing-user, .notifications-landing, .teacher-listing, .course-listing, .loggedin-dashboard, .loggedin-teacher-calendar, .confirmation-tile {
    max-width: 1440px;
    margin: 100px auto 50px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* 
.feeds-cont {
    max-height: calc(100vh - 100px);
    overflow: auto;
} */

.dashboard-main {
    min-height: 100vh;
    position: relative;
}

.dashboard-main .loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.4);
    z-index: 9;
}

.user-details-section {
    padding: 0 30px;
    flex: 1;
    min-height: 100vh;
}

.teacher-listing, .course-landing-user, .notifications-landing, .search-landing-user {
    display: block;
    padding: 0 20px;
}

.search-landing-user .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.4);
}

.past .event-tile .date {
    color: #ccc;
}

.upcoming .event-tile .date {
    color: #1dbf73;
}

.user-details-section .upcoming {
    margin-bottom: 42px;
}

.notifications-landing .tile {
    min-height: auto;
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
    padding: 15px 20px;
    margin: 15px 0;
    cursor: pointer;
}

.notifications-landing h3 {
    text-align: center;
    color: #6a6a6b;
}

.course-landing-user h4, .search-landing-user h4 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    text-transform: capitalize;
}

.loggedin-teacher-calendar .calendar-holder {
    flex: 1;
    max-width: 300px;
    margin: 0 auto;
}

.courses-container-all {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
}

.teacher-listing .share-btn-container {
    text-align: right;
}

.teacher-listing .share-btn-container .btn.share-btn {
    display: inline-block;
}

.teacher-listing.centered-without-space {
    justify-content: flex-start;
    padding-top: 2rem;
}

.courses-container-all .course-tile {
    max-width: none;
    margin: 0;
}
.profile-info .edit-profile {
    text-align: right;
}

@media screen and (min-width: 750px) {
    .loggedin-teacher-calendar .calendar-holder {
        max-width: 600px;
    }
    .courses-container-all {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (min-width: 1025px) {
    .course-landing-user, .search-landing-user, .teacher-listing, .course-listing, .loggedin-dashboard, .loggedin-teacher-calendar, .confirmation-tile, .notifications-landing {
        flex-direction: row;
        padding: 0 32px;
    }
    .teacher-listing.centered-without-space {
        align-items: flex-start;
        justify-content: center;
    }
    .teacher-listing .share-btn-container {
        padding: 0 3rem;
    }
    .courses-container-all {
        grid-template-columns: repeat(4, minmax(250px, 1fr));
    }
    .teacher-listing {
        padding: 0;
    }
    .course-listing {
        position: relative;
        justify-content: space-between;
    }
    .loggedin-teacher-calendar .calendar-holder {
        max-width: 980px;
    }
    .user-details-section {
        width: 80%;
    }
}
`;

export default ContainerStyles;