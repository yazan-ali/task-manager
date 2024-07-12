import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';

function TaskBar() {

    const { tasks, getTasks } = useContext(TaskContext);
    const [sortBy, setSortBy] = useState('');
    const [filterBy, setFilterBy] = useState('');

    const handleSortByChange = (evt) => {
        const sortBy = evt.target.value;
        setSortBy(sortBy);
        getTasks(filterBy, sortBy)
    };

    const handleFilterByChange = (evt) => {
        const filter = evt.target.value;
        setFilterBy(filter);
        getTasks(filter, sortBy);
    };

    return (
        <div className='task-list__bar flex flex-wrap justify-between gap-4 items-center mt-8 pb-4'>
            {/* <span className='text-xl'>You have {tasks.length} tasks to complete</span> */}
            <Button variant='contained'>
                <Link className='flex items-center gap-2 text-inherit no-underline' to="/create">
                    create new task
                    <AddBoxIcon sx={{ color: "inherit" }} />
                </Link>
            </Button>
            <div className="task-list__actions">
                <FormControl variant='standard' sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="sort-by">Sort By</InputLabel>
                    <Select
                        labelId="sort-by"
                        value={sortBy}
                        onChange={handleSortByChange}
                    >
                        <MenuItem value="">Sort By</MenuItem>
                        <MenuItem value="created">Created At</MenuItem>
                        <MenuItem value="modified">Last Modify</MenuItem>
                        <MenuItem value="duedate">Due Date</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant='standard' sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="filter-by">Filter By</InputLabel>
                    <Select
                        labelId="filter-by"
                        value={filterBy}
                        onChange={handleFilterByChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="uncompleted">Not completed</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default TaskBar;