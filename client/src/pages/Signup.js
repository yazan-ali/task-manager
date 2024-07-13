import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from '../components/AuthFormWrapper';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

const Signup = () => {
    const formInitialValues = { username: '', password: '' };
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        let success = await login(values, true);
        if (success) {
            navigate('/tasks');
        }
    };

    const { values, errors, handleChange, handleSubmit } = useForm(formInitialValues, onSubmit);

    return (
        <AuthFormWrapper handleSubmit={handleSubmit}>
            <Typography className="form-title">
                Create an account to start managing your tasks
            </Typography>
            <TextField
                label="Username"
                name="username"
                variant="outlined"
                type="text"
                value={values.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
            />
            <TextField
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth

            />
            <div className='w-full flex justify-between items-center'>
                <Button type="submit" variant="contained" className="capitalize">sign up</Button>
                <Link className='link' to="/login">Already have an account</Link>
            </div>
        </AuthFormWrapper>
    );
};

export default Signup;