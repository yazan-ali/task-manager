import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/signup', { username, password });
            login(response.data.token);
            navigate('/tasks');
            // alert('User created successfully');
        } catch (error) {
            console.log(error)
            // alert('Error creating user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;