import React, { useEffect, useCallback } from 'react';
import randomstring from 'randomstring';

const GoogleCalendar = ({
    initCalendar,
    onSuccess,
    onError,
    isError,
    startTime,
    endTime,
    eventDescription,
    eventId
}) => {
    var CLIENT_ID = '510882057934-055u0o8gbjih5su3iivnvbdfko7eqh9d.apps.googleusercontent.com';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    let gapi = window.gapi || {};

    const signIn = useCallback(() => {
        return gapi.auth2.getAuthInstance().signIn();
    }, [gapi]);

    const createEvent = useCallback(() => {
        if (gapi) {
            var event = {
                'summary': 'Conzult Teacher Booking',
                'location': 'TBD',
                'description': 'A session with best of our teachers',
                'start': {
                    'dateTime': `${startTime}`,
                    'timeZone': `${Intl.DateTimeFormat().resolvedOptions().timeZone}`
                },
                'end': {
                    'dateTime': `${endTime}`,
                    'timeZone': `${Intl.DateTimeFormat().resolvedOptions().timeZone}`
                },
                "conferenceData": {
                    "createRequest": {
                        "requestId": randomstring.generate(7)
                    }
                },
                'attendees': [
                    { 'email': 'lpage@example.com' }
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        { 'method': 'popup', 'minutes': 10 }
                    ]
                }
            };

            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
                "conferenceDataVersion": 1,
            });

            request.execute(function (event) {
                onSuccess(event);
            })
        }
        else {
            console.log('sorry no calendar for you!');
        }
    }, [endTime, gapi, startTime, onSuccess]);


    useEffect(() => {
        if (gapi && initCalendar) {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                }).then(async function () {
                    // Handle the initial sign-in state.
                    try {
                        await signIn();
                        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                            createEvent();
                        }
                        else {
                            console.log('Not signed In')
                        }
                    }
                    catch (e) {
                        onError();
                    }
                }, function (error) {
                    console.log('sorry no calendar for you!', error);
                });
            });
        }
    }, [initCalendar, CLIENT_ID, DISCOVERY_DOCS, SCOPES, createEvent, gapi, onError, signIn])

    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default GoogleCalendar;