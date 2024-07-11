import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import "../styles/navbar.scss";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar flex justify-between items-center bg-white p-5">
            <div className='flex items-center'>
                <Link to="/tasks" className="brand-name font-semibold">Task Manager</Link>
                <div className='nav-links ml-9 mt-1'>
                    <Link to="/tasks" className="">Home</Link>
                    <Link to="/create" className="">Create Task</Link>
                    <Link to="/" className="">About us</Link>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <TextField className="search" variant="outlined" size="small" placeholder="Search" />
                <div className='nav-links'>
                    {
                        user ? (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={logout}
                                >Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;