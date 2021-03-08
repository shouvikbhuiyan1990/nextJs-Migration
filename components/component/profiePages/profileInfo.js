import React from 'react';
import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import ProfileDetails from '../profileDetails';

const ProfileInfo = ({
    warningProfilePending,
    warningProfileFieldsPending,
    pendingDetails,
    experiences,
    educations,
    feedbacks,
    isStudent
}) => {
    const profileUpdateStatus = useSelector(state => state.registration.profileUpdateStatus);

    return (
        <React.Fragment>
            {warningProfilePending &&
                <Alert key={"WarningPendingProfile"} variant={"warning"}>
                    Your profile has not been approved by admin yet
                </Alert>
            }
            {warningProfileFieldsPending &&
                <Alert key={"WarningPendingProfile"} variant={"warning"} className='pending-info'>
                    Some fields in your profile has not been approved by admin yet. Please check your email for details.
                </Alert>
            }
            {profileUpdateStatus === 'error' &&
                <Alert key="alertImageUploadFailure" variant={'danger'}>
                    Profile update failed, please try again. Please contact administrator if the problem persists.
                </Alert>
            }
            <div className='profile-info'>
                <ProfileDetails
                    editable
                    {...pendingDetails}
                    experiences={experiences}
                    educations={educations}
                    feedbacks={feedbacks}
                    isStudent={isStudent}
                />
            </div>
        </React.Fragment>
    )
}

export default ProfileInfo;