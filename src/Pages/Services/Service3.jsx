// src/MaintenanceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import './../../Styles/ServiceStyling/maintenanceForm.css';  // Import the CSS file

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    Username: '',
    amount: '',
    dueDate: '',
    description: ''
  });

  const [residents, setResidents] = useState([]);
  const [bulkData, setBulkData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/residents')
      .then(response => {
        setResidents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the residents data!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setBulkData(results.data);
          console.log(results.data);
        },
        header: true
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/maintenance-fees', formData);
      console.log('Maintenance fee data submitted successfully:', response.data);
      setFormData({
        Username: '',
        amount: '',
        dueDate: '',
        description: ''
      });
      alert('Maintenance fee data submitted successfully!');
    } catch (error) {
      console.error('Error submitting maintenance fee data:', error.response ? error.response.data : error.message);
      alert('Failed to submit maintenance fee data!');
    }
  };

  return (
    <div className="maintenance-form-container">
      <h2 className="form-title">Maintenance Fee Form</h2>
      <form className="maintenance-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            User Name:
            <select
              className="form-input"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {residents.map(resident => (
                <option key={resident.id} value={resident.Username}>
                  {resident.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Amount:
            <input
              className="form-input"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Due Date:
            <input
              className="form-input"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Description:
            <textarea
              className="form-input"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <h3>Upload CSV for Bulk Data</h3>
          <input className="form-input" type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <button className="form-button" type="submit">Submit</button>
        <Link to='/fee-history'>
           <button className='hist' type="submit">View History</button>
        </Link>
      </form>
      {bulkData && (
        <div className="bulk-data-preview">
          <h4>Bulk Data Preview:</h4>
          <pre>{JSON.stringify(bulkData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MaintenanceForm;
