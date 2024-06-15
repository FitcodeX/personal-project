import { useState } from "react";
import axios from 'axios';
import './addCustomer.css'; 

export default function AddCustomer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCustomer = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
        };

        console.log('Submitting new customer:', newCustomer); 

        try {
            const response = await axios.post('http://localhost:8000/api/v1/customers/create/', newCustomer);
            console.log(response.data);
            // Handle success
            alert('Customer created successfully!');
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
        } catch (error) {
            console.error('Error creating customer:', error.response?.data || error.message); 
            alert('Failed to create customer. Check the console for details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Customer</button>
        </form>
    );
}
