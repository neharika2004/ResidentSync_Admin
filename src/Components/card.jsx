// src/components/Card.js
import React from 'react';
import './../Styles/card.css';

const Card = ({ title, description, icon: Icon }) => {
    return (
        <>
        <div className="card">
            <div className="card-header">
                <Icon className="card-icon" />
                <h3>{title}</h3>
            </div>
            <p>{description}</p>
        </div>
        </>
    );
};

export default Card;
