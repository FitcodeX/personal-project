import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddVehicle() {
  const [customerId, setCustomerId] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [mileage, setMileage] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/customers/');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVehicle = {
      customer_id: customerId,
      make: make,
      model: model,
      year: year,
      vin: vin,
      license_plate: licensePlate,
      mileage: mileage,
    };

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
      setMileage('');
    } catch (error) {
      console.error(error);
      alert('Failed to create vehicle.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer ID:</label>
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
          <option value="" disabled>Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.pk} value={customer.pk}>
              {customer.pk} - {customer.fields.first_name} {customer.fields.last_name}
            </option>
          ))}
        </select>
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
        <label>VIN:</label>
        <input type="text" value={vin} onChange={(e) => setVin(e.target.value)} required />
      </div>
      <div>
        <label>License Plate:</label>
        <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
      </div>
      <div>
        <label>Mileage:</label>
        <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
      </div>
      <button type="submit">Create Vehicle</button>
    </form>
  );
};


