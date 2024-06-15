import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addVehicle.css'; 

export default function AddVehicle() {
  const [customerId, setCustomerId] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [VIN, setVin] = useState(''); 
  const [licensePlate, setLicensePlate] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/customers/all_customers');
        console.log('Customer data:', response.data); 
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleVinSearch = async () => {
    try {
      const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/${VIN}?format=json`);
      const vehicleData = response.data.Results;

      const makeData = vehicleData.find(item => item.Variable === "Make");
      const modelData = vehicleData.find(item => item.Variable === "Model");
      const yearData = vehicleData.find(item => item.Variable === "Model Year");

      if (makeData) setMake(makeData.Value);
      if (modelData) setModel(modelData.Value);
      if (yearData) setYear(yearData.Value);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      alert('Failed to fetch vehicle data.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVehicle = {
      customer_id: parseInt(customerId, 10), 
      make: make,
      model: model,
      year: parseInt(year, 10), 
      VIN: VIN, 
      license_plate: licensePlate,
    };

    console.log('Submitting new vehicle:', newVehicle); 

    try {
      const response = await axios.post('http://localhost:8000/api/v1/customers/vehicles/create/', newVehicle);
      console.log(response.data);
      alert('Vehicle created successfully!');

      setCustomerId('');
      setMake('');
      setModel('');
      setYear('');
      setVin('');
      setLicensePlate('');
    } catch (error) {
      console.error('Error creating vehicle:', error.response?.data || error.message); 
      alert('Failed to create vehicle. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer:</label>
        <select value={customerId} onChange={(e) => {
          const selectedCustomerId = e.target.value;
          console.log('Selected customer ID:', selectedCustomerId); 
          setCustomerId(selectedCustomerId);
        }} required>
          <option value="" disabled>Select a customer</option>
          {customers.length > 0 ? (
            customers.map((customer, index) => {
              const firstName = customer.fields?.first_name || customer.first_name;
              const lastName = customer.fields?.last_name || customer.last_name;
              return (
                <option key={`customer-${customer.pk || index}`} value={customer.pk}>
                  {firstName} {lastName}
                </option>
              );
            })
          ) : (
            <option disabled>No customers available</option>
          )}
        </select>
      </div>
      <div>
        <label>VIN:</label>
        <input type="text" value={VIN} onChange={(e) => setVin(e.target.value)} required />
        <button type="button" onClick={handleVinSearch}>Search VIN</button>
      </div>
      <div>
        <label>Make:</label>
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
      </div>
      <div>
        <label>Model:</label>
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label>Year:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label>License Plate:</label>
        <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
      </div>
      <button type="submit">Create Vehicle</button>
    </form>
  );
}
