// src/pages/Home.js
import React from 'react';
import Card from './../Components/card';
import { FaHome, FaServicestack, FaUserFriends, FaEnvelope } from 'react-icons/fa';
import './../Styles/home.css';

const Home = () => {
    return (
        <>
        <div className="home-container">
            <h2>Society Summary</h2>
            <div className="card-container">
                <Card title="Card 1" description="This is the first card." icon={FaHome} />
                <Card title="Card 2" description="This is the second card." icon={FaServicestack} />
                <Card title="Card 3" description="This is the third card." icon={FaUserFriends} />
                <Card title="Card 4" description="This is the fourth card." icon={FaEnvelope} />
            </div>
        </div>
        <div className="home-container">
        <h2>Financial Summary</h2>
        <div className="card-container">
            <Card title="Card 1" description="This is the first card." icon={FaHome} />
            <Card title="Card 2" description="This is the second card." icon={FaServicestack} />
            <Card title="Card 3" description="This is the third card." icon={FaUserFriends} />
            <Card title="Card 4" description="This is the fourth card." icon={FaEnvelope} />
        </div>
    </div>
    </>
    );
};

export default Home;
