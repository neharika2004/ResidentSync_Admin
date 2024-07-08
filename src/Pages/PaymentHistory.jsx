// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios for making HTTP requests
// import './../Styles/paymentHistory.css';

// const PaymentHistory = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [paymentData, setPaymentData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);

//     useEffect(() => {
//         fetchData(); // Fetch data when the component mounts
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/maintenance-fees');
//             setPaymentData(response.data);
//             setFilteredData(response.data); // Initialize filtered data
//         } catch (error) {
//             console.error('Error fetching data:', error.message); // Log the error message
//         }
//     };

//     const handleSearch = () => {
//         const filtered = paymentData.filter(item =>
//             item.Username.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredData(filtered);
//     };

//     return (
//         <div className="payment-history-container">
//             <h1>Payment History</h1>
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search by username..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Serial No.</th>
//                             <th>Username</th>
//                             <th>Amount</th>
//                             <th>Due Date</th>
//                             <th>Description</th>
//                             <th>Payment</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.map((item, index) => (
//                             <tr key={item._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.Username}</td>
//                                 <td>{item.amount}</td>
//                                 <td>{new Date(item.dueDate).toLocaleDateString()}</td>
//                                 <td>{item.description}</td>
//                                 <td>{}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../Styles/paymentHistory.css';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentData, setPaymentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/maintenance-fees');
            setPaymentData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const handleSearch = () => {
        const filtered = paymentData.filter(item =>
            item.Username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="payment-history-container">
            <h1>Payment History</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by username..."
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
                            <th>Username</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.Username}</td>
                                <td>{item.amount}</td>
                                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                                <td>{item.description}</td>
                                <td>{item.isPaid ? 'Paid' : 'Unpaid'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
