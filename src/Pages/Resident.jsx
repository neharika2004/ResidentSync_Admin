import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './../Styles/resident.css';

const Resident = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/residents');
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error.message); // Log the error message
        }
    };
    

    const handleSearch = () => {
        const filtered = filteredData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="container">
            <h1>Residents Information</h1>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Resident;
