import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './services.css'; 

export default function Services() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalType, setModalType] = useState('add'); 
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/services/all_services');
      console.log(response.data);  
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddService = () => {
    setModalType('add');
    setSelectedService(null);
    setName('');
    setDescription('');
    setPrice('');
    setShowForm(true);
  };

  const handleEditService = (service) => {
    setModalType('edit');
    setSelectedService(service);
    setName(service.fields.name);
    setDescription(service.fields.description);
    setPrice(service.fields.price);
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newService = {
      name,
      description,
      price,
    };

    try {
      if (modalType === 'add') {
        await axios.post('http://localhost:8000/api/v1/services/create_service', newService);
      } else {
        await axios.put(`http://localhost:8000/api/v1/services/${selectedService.pk}/`, newService);
      }
      setShowForm(false);
      fetchServices(); 
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <div>
      <div className="button-group">
        <button onClick={fetchServices}>View All Services</button>
        <button onClick={handleAddService}>Add New Service</button>
      </div>
      <div className="service-list">
        <h3>All Services</h3>
        <table className="service-table">
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.pk}>
                <td>{service.pk}</td>
                <td>{service.fields.name}</td>
                <td>{service.fields.description}</td>
                <td>${service.fields.price}</td>
                <td>
                  <button onClick={() => handleEditService(service)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="form-container">
          <h2>{modalType === 'add' ? 'Add New Service' : 'Edit Service'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
