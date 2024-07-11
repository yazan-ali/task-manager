import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/login', { username, password });
            login(response.data.token);
            navigate('/tasks');
        } catch (error) {
            // alert('Error logging in');
        }
    };

    return (
        <AuthForm handleSubmit={handleSubmit}>
            <Typography variant="body1" gutterBottom>
                Please login to see your tasks list
            </Typography>
            <TextField
                label="Username"
                variant="outlined"
                type="text"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                fullWidth
                required
            />
            <div className='w-full flex justify-between items-center'>
                <Button type="submit" variant="contained">Log In</Button>
                <Link className='link' to="/signup">Create an account</Link>
            </div>
        </AuthForm>
    );
};

export default Login;