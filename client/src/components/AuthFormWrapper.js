import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AuthFormWrapper({ children, handleSubmit }) {
    return (
        <div className='w-screen flex justify-center items-center mt-24 px-3'>
            <form onSubmit={handleSubmit} className='flex items-center flex-col gap-6 min-h-96 w-full md:w-4/5 lg:w-1/3 p-6 rounded-lg'>
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

export default AuthFormWrapper