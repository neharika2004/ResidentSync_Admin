// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar.jsx';
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home.jsx'
import Service1 from './Pages/Services/Service1.jsx';
import Service2 from './Pages/Services/Service2.jsx';
import QRScanner from './Components/QRScanner.jsx';
import Resident from './Pages/Resident.jsx';
import PresentGuest from './Pages/PresentGuest.jsx';
import Service3 from './Pages/Services/Service3.jsx';
import PaymentHistory from './Pages/PaymentHistory.jsx';


const Contact = () => <div><h1>Contact</h1></div>;

const App = () => {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <div style={{ marginLeft: '230px', padding: '20px', marginTop: '10px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/service1" element={<Service1 />} />
                    <Route path="/scan" element={<QRScanner />} />
                    <Route path="/service2" element={<Service2 />} />
                    <Route path="/service3" element={<Service3 />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/resident" element={<Resident/>} />       
                    <Route path="/approve" element={<PresentGuest/>} /> 
                    <Route path="/fee-history" element={<PaymentHistory/>} /> 
                </Routes>
            </div>
        </Router>
    );
};

export default App;
