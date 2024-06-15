import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './workOrders.css'; 

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [services, setServices] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [serviceId, setServiceId] = useState('');
  const [partId, setPartId] = useState('');
  const [partQuality, setPartQuality] = useState('');

  useEffect(() => {
    fetchWorkOrders();
    fetchServices(); 
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/work-orders/all_workorders');
      setWorkOrders(response.data);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/services/all_services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleWorkOrderClick = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newWorkOrderDetail = {
      workOrder_id: selectedWorkOrder.workOrder_id,
      service_id: parseInt(serviceId, 10), 
      part_id: partId,
      part_quality: parseInt(partQuality, 10), 
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/workorderdetails/create/', newWorkOrderDetail);
      console.log(response.data);
      alert('Work order details created successfully!');
      setShowForm(false);
      setServiceId('');
      setPartId('');
      setPartQuality('');
    } catch (error) {
      console.error('Error creating work order details:', error);
      alert('Failed to create work order details.');
    }
  };

  const handleCompletionChange = async (workOrderId, isComplete) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/work-orders/${workOrderId}/`, { complete: isComplete });
      setWorkOrders((prevWorkOrders) =>
        prevWorkOrders.map((workOrder) =>
          workOrder.workOrder_id === workOrderId ? { ...workOrder, complete: isComplete } : workOrder
        )
      );
    } catch (error) {
      console.error('Error updating work order completion status:', error);
    }
  };

  return (
    <div>
      <div className="button-group">
        <button onClick={fetchWorkOrders}>View All Work Orders</button>
      </div>
      <div className="work-order-list">
        <h3>All Work Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Work Order ID</th>
              <th>Customer ID</th>
              <th>Service Description</th>
              <th>Complete</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((workOrder) => (
              <tr key={workOrder.workOrder_id}>
                <td>{workOrder.workOrder_id}</td>
                <td>{workOrder.customer_id}</td>
                <td>{workOrder.service_description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={workOrder.complete}
                    onChange={(e) => handleCompletionChange(workOrder.workOrder_id, e.target.checked)}
                  />
                </td>
                <td>
                  <button onClick={() => handleWorkOrderClick(workOrder)}>Add Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="form-container">
          <h2>Add Work Order Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Service:</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                required
              >
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option key={service.pk} value={service.pk}>
                    {service.fields.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Part ID:</label>
              <input
                type="text"
                value={partId}
                onChange={(e) => setPartId(e.target.value)}
              />
            </div>
            <div>
              <label>Part Quality:</label>
              <input
                type="number"
                value={partQuality}
                onChange={(e) => setPartQuality(e.target.value)}
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
};


