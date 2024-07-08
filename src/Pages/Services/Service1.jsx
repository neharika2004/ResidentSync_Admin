import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../../Styles/ServiceStyling/guestInfo.css';

const Service1 = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/visitors');
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

    const handleCheckboxChange = (index) => {
        const newSelectedRows = [...selectedRows];
        if (newSelectedRows.includes(index)) {
            newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
        } else {
            newSelectedRows.push(index);
        }
        setSelectedRows(newSelectedRows);
    };

    return (
        <div className="container">
            <h1>Visitor Information</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button className='scan'  onClick={() => navigate('/scan')}>Scan QR Code</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Name</th>
                            <th>Purpose</th>
                            <th>Date & Arriving Time </th>
                            <th>Permission</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.purpose}</td>
                                <td>{item.arrivalTime}</td>
                                <td style={{ color: selectedRows.includes(index) ? 'green' : 'red' }}>
                                    {selectedRows.includes(index) ? 'Access Granted' : 'Access Denied'}
                                </td>
                                <td>
                                   <input
                                      type="checkbox"
                                      onChange={() => handleCheckboxChange(index)}
                                      checked={selectedRows.includes(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Service1;
