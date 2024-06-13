import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const history = useHistory();

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
    history.push('addcustomer');
  };

  return (
    <div>
      <div className="button-group">
        <button onClick={fetchCustomers}>Show All Customers</button>
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      <div className="customer-list">
        {customers.length > 0 ? (
          <ul>
            {customers.map((customer) => (
              <li key={customer.pk}>
                {customer.fields.first_name} {customer.fields.last_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
