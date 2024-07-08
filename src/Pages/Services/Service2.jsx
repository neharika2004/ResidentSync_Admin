import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../Styles/ServiceStyling/visitorInfo.css';  // Import the CSS file

const VisitorInformationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    purpose: '',
    purposeOther: '',
    hostName: '',
    contactNumber: '',
    contactEmail: '',
    idProof: '',
    idNumber: '',
    vehicleInfo: {
      licensePlate: '',
      vehicleModel: ''
    },
    arrivalTimestamp: new Date().toISOString().slice(0, 16)
  });

  const [residents, setResidents] = useState([]);

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
    if (name === 'licensePlate' || name === 'vehicleModel') {
      setFormData({
        ...formData,
        vehicleInfo: {
          ...formData.vehicleInfo,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/approve-guest', formData);
      console.log('Visitor data submitted successfully:', response.data);
      // Optionally, you can reset the form after successful submission
      setFormData({
        fullName: '',
        purpose: '',
        purposeOther: '',
        hostName: '',
        contactNumber: '',
        contactEmail: '',
        idProof: '',
        idNumber: '',
        vehicleInfo: {
          licensePlate: '',
          vehicleModel: ''
        },
        arrivalTimestamp: new Date().toISOString().slice(0, 16)
      });
      alert('Visitor data submitted successfully!');
    } catch (error) {
      console.error('Error submitting visitor data:', error.response ? error.response.data : error.message);
      alert('Failed to submit visitor data!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Visitor's Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      
      <div>
        <label>
          Purpose of Visit:
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          >
            <option value="">Select Purpose</option>
            <option value="Business Meeting">Business Meeting</option>
            <option value="Personal Visit">Personal Visit</option>
            <option value="Delivery">Delivery</option>
            <option value="Service Call">Service Call</option>
            <option value="Other">Other</option>
          </select>
          {formData.purpose === 'Other' && (
            <input
              type="text"
              name="purposeOther"
              value={formData.purposeOther}
              onChange={handleChange}
              placeholder="Please specify"
              required
            />
          )}
        </label>
      </div>
      
      <div>
        <label>
          Host's Name:
          <select
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            required
          >
            <option value="">Select Host</option>
            {residents.map(resident => (
              <option key={resident.id} value={resident.name}>
                {resident.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div>
        <label>
          Date and Time of Arrival:
          <input
            type="datetime-local"
            name="arrivalTimestamp"
            value={formData.arrivalTimestamp}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div>
        <label>
          Contact Information of Visitor:
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
      </div>
      
      <div>
        <label>
          Visitor's ID Proof (if applicable):
          <select
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
          >
            <option value="">Select ID Proof</option>
            <option value="Driver's License">Driver's License</option>
            <option value="Passport">Passport</option>
            <option value="Employee ID">Employee ID</option>
          </select>
          {formData.idProof && (
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="ID Number"
            />
          )}
        </label>
      </div>
      
      <div>
        <label>
          Vehicle Information (if applicable):
          <input
            type="text"
            name="licensePlate"
            value={formData.vehicleInfo.licensePlate}
            onChange={handleChange}
            placeholder="License Plate Number"
          />
          <input
            type="text"
            name="vehicleModel"
            value={formData.vehicleInfo.vehicleModel}
            onChange={handleChange}
            placeholder="Vehicle Model"
          />
        </label>
      </div>
      
      <button type="submit">Submit</button>
      <Link to='/approve'>
      <button className='approve' type="submit">Approved List</button>
      </Link>
    </form>
  );
};

export default VisitorInformationForm;
