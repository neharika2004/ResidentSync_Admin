import React from 'react';
import './../Styles/smallcard.css';

const smallcard = ({ title, description, icon: Icon }) => {
    return (
        <>
        <div className="smallcard">
            <div className="smallcard-header">
                <Icon className="smallcard-icon" />
                <h3>{title}</h3>
            </div>
            <p>{description}</p>
        </div>
        </>
    );
};

export default smallcard;