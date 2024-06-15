import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './customers.css'; 
import CalendarComponent from '../components/CalenderComponent';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/customers/all_customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    navigate('/addcustomer');
  };

  return (
    <div>
      <CalendarComponent />
      <div className="button-group">
        <button onClick={fetchCustomers}>Show All Customers</button>
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      <div className="customer-list">
        <h3>All Customers</h3>
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
