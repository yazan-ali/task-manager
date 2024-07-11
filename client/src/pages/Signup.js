import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from '../components/AuthFormWrapper';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
        <AuthFormWrapper handleSubmit={handleSubmit}>
            <Typography variant="body1" gutterBottom>
                Create an account to start managing your tasks
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
                <Button type="submit" variant="contained" className="capitalize">sign up</Button>
                <Link className='link' to="/login">Already have an account</Link>
            </div>
        </AuthFormWrapper>
    );
};

export default Signup;