import React from 'react';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Link } from 'react-router-dom';

function NoResults() {
    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <SearchOffIcon sx={{ width: 400, height: 400, color: "#bfbfbf" }} />
            <h1 className='text-4xl md:text-7xl text-gray-400'>You don't have any tasks yet</h1>
            <Link to="/create" className='text-xl md:text-2xl text-gray-400 p-8'>Start creating your tasks now</Link>
        </div>
    )
}

export default NoResults;