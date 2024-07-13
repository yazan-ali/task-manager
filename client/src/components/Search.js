import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField } from '@mui/material';

function SearchField({ variant }) {

    const { filterTasksByTitle } = useContext(TaskContext);
    const [serachTerm, setSerachTerm] = useState("");

    const onChange = (evt) => {
        setSerachTerm(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        filterTasksByTitle(serachTerm);
    }

    return (
        <form className='shadow-none' onSubmit={handleSubmit}>
            <TextField
                className="search"
                variant={variant || "outlined"}
                size="small"
                label="Search by task title"
                onChange={onChange}
                value={serachTerm}
            />
        </form>
    )
}

export default SearchField