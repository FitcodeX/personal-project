import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './vehicles.css'; 
import AddVehicle from './addVehicle'; 

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [view, setView] = useState('display'); 

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/customers/all_vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const handleDisplayAllVehicles = () => {
    setView('display');
  };

  const handleAddVehicle = () => {
    setView('add');
  };

  return (
    <div>
      <div className="button-group">
        <button onClick={handleDisplayAllVehicles}>Display All Vehicles</button>
        <button onClick={handleAddVehicle}>Add Vehicle</button>
      </div>

      {view === 'display' && (
        <div className="vehicle-list">
          <h3>All Vehicles</h3>
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>VIN</th>
                <th>License Plate</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.vehicle_id}>
                  <td>
                    {vehicle.customer ? (
                      `${vehicle.customer.first_name} ${vehicle.customer.last_name}`
                    ) : (
                      'Customer information not available'
                    )}
                  </td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.VIN}</td>
                  <td>{vehicle.license_plate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'add' && <AddVehicle />}
    </div>
  );
};
