import React from 'react';
import AdminProfile from "./adminComponent/adminProfile";
import TrainerProfile from "./trainerComponent/trainerProfile";
import UserProfile from "./userComponent/userProfile";
import "./profile.css";

const Profile = () => {
    const userSessionString = sessionStorage.getItem('userSession');
    let renderedComponent;
    if (userSessionString) {
        const userSession = JSON.parse(userSessionString);
        switch (userSession.userType) {
            case "Member":
                renderedComponent = <UserProfile />;
                break;
            case "Admin":
                renderedComponent = <AdminProfile />;
                break;
            case "Trainer":
                renderedComponent = <TrainerProfile />;
                break;
            default:
                renderedComponent = <div>No profile found</div>;
        }
    } else {
        renderedComponent = <div>Session not found</div>;
    }

    return (
        <div className="container-fluid profile">
            {renderedComponent}
        </div>
    );
};

export default Profile;
