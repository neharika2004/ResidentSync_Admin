import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './../Styles/presentGuest.css';

const PresentGuest = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/approve-guest');
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error.message); // Log the error message
        }
    };

    const handleSearch = () => {
        const filtered = filteredData.filter(item =>
            item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="container">
            <h1>Guest Approval</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Full Name</th>
                            <th>Purpose</th>
                            <th>Purpose Other</th>
                            <th>Host Name</th>
                            <th>Contact Number</th>
                            <th>Contact Email</th>
                            <th>ID Proof</th>
                            <th>ID Number</th>
                            <th>Approved</th>
                            <th>License Plate</th>
                            <th>Vehicle Model</th>
                            <th>Arrival Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.purpose}</td>
                                <td>{item.purposeOther}</td>
                                <td>{item.hostName}</td>
                                <td>{item.contactNumber}</td>
                                <td>{item.contactEmail}</td>
                                <td>{item.idProof}</td>
                                <td>{item.idNumber}</td>
                                <td>{item.approved ? 'Yes' : 'No'}</td>
                                <td>{item.vehicleInfo.licensePlate}</td>
                                <td>{item.vehicleInfo.vehicleModel}</td>
                                <td>{new Date(item.arrivalTimestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PresentGuest;
