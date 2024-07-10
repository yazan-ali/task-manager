import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthRoute = ({ loginRoute }) => {
    const { user } = useContext(AuthContext);
    if (loginRoute) {
        return user ? <Navigate to="/tasks" /> : <Outlet />;
    }
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;