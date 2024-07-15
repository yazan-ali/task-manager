import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from '../components/AuthFormWrapper';
import { TextField, Typography } from '@mui/material';
import FormSubmitButton from '../components/FormSubmitButton';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

const Login = () => {
    const formInitialValues = { username: '', password: '' };
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        let success = await login(values);
        if (success) {
            navigate('/tasks');
        }
    };

    const { values, errors, isLoading, handleChange, handleSubmit } = useForm(formInitialValues, onSubmit);

    return (
        <AuthFormWrapper handleSubmit={handleSubmit}>
            <Typography className="form-title">
                Please login to see your tasks list
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
                disabled={isLoading}
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
                disabled={isLoading}

            />
            <div className='w-full flex justify-between items-center'>
                <FormSubmitButton
                    type="submit"
                    variant="contained"
                    isLoading={isLoading}
                >
                    log in
                </FormSubmitButton>
                <Link className='link' to="/signup">Create an account</Link>
            </div>
        </AuthFormWrapper>
    );
};

export default Login;