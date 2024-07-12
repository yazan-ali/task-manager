import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "../styles/navbar.scss";

function Navbar() {

    const { user, logout } = useContext(AuthContext);
    const [openNavbar, setopenNavbar] = useState(false);

    const toggleNavbar = () => {
        setopenNavbar(prev => !prev);
    }

    return (
        <header className="navbar flex md:justify-between md:items-center bg-white p-5 relative">
            <div className='flex justify-between items-center'>
                <Link to="/tasks" className="logo text-2xl font-semibold">Task Manager</Link>
                <div className="navbar__toggle">
                    <MenuIcon onClick={toggleNavbar} sx={{ fontSize: 32 }} />
                </div>
            </div>
            <div className={`navbar__content absolute overflow-hidden flex flex-grow md:justify-between md:items-center gap-5 ${openNavbar && "open"}`}>
                <nav className='md:flex-grow md:ml-9 md:mt-1'>
                    <ul className='navbar__links'>
                        <li>
                            <Link to="/tasks" onClick={toggleNavbar}>Home</Link>
                        </li>
                        <li>
                            <Link to="/create" onClick={toggleNavbar}>Create Task</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={toggleNavbar}>About us</Link>
                        </li>
                    </ul>
                </nav>
                <div className="navbar__search">
                    <TextField className="search" variant="outlined" size="small" label="Search" />
                </div>
                <div className='navbar__links'>
                    {
                        user ? (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={logout}
                                    sx={{ width: 80 }}
                                >Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign up</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar;