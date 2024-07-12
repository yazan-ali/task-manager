import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Divider, Button, MenuItem, Menu, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import '../styles/task.scss';

function Task({ task, openDialog }) {

    const { deleteTask } = useContext(TaskContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <li className="task-list__task flex flex-col gap-2 min-w-96 bg-white p-4 rounded-md">
            <h2 className="font-semibold text-3xl">{task.title}</h2>
            <p className="text-xl">{task.description}</p>
            <span className='font-medium text-gray-500'>Due Date:
                <span className="italic"> {task.dueDate && dayjs(task.dueDate).format("dd MM YYYY")}</span>
            </span>
            <div className='flex flex-col gap-3 mt-auto pt-3'>
                <Divider sx={{ backgroundColor: "#C6C6C6" }} />
                <div className='flex gap-3'>
                    <div className='flex-grow'>
                        <Button variant="contained" color='success' onClick={() => { }}>Mark as complete</Button>
                    </div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={anchorEl ? 'actions-menu' : undefined}
                        aria-expanded={anchorEl ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="actions-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => openDialog(task._id)}>Edit</MenuItem>
                        <MenuItem onClick={() => deleteTask(task._id)}>Delete</MenuItem>
                    </Menu>
                </div>
            </div>
        </li>
    )
}

export default Task;