import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/auth.scss';

function AuthForm({ children, handleSubmit }) {
    return (
        <div className='w-screen flex justify-center items-center mt-24'>
            <form onSubmit={handleSubmit} className='authentication-form flex items-center flex-col gap-6 min-h-96 w-1/3 p-6 rounded-lg'>
                <AccountCircleIcon
                    sx={{
                        fontSize: 100,
                        color: 'primary.main'
                    }} />
                {children}
            </form>
        </div >
    )
}

export default AuthForm