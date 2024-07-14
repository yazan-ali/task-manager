import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Divider, Button, MenuItem, Menu, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import '../styles/task.scss';

function Task({ task, openDialog }) {
    const { deleteTask, updateTask } = useContext(TaskContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const handleActionMenuBtnClick = (evt) => {
        setAnchorEl(evt.currentTarget);
        console.log(evt.currentTarget)
    };

    const handleActionMenuClose = () => {
        setAnchorEl(null);
    };

    const onMenuActionClick = (action) => {
        setAnchorEl(null);
        action();
    };

    const toggleTaskComplete = async (evt) => {
        evt.preventDefault();
        await updateTask({
            ...task,
            completed: !task.completed
        });
    }


    const calculateRemainingDays = (dueDate) => {
        const today = dayjs();
        const due = dayjs(dueDate);
        let dayRemaining = due.diff(today, 'day');
        if (dayRemaining > 0) {
            return `${dayRemaining} days remaining`;
        } else {
            return "Must be completed today";
        }
    };

    return (
        <li className="task-list__task flex flex-col gap-2 bg-white p-4 rounded-md">
            <div className="flex justify-between font-medium">
                <span className="capitalize">
                    {
                        task.completed ? (
                            <div className="flex items-center gap-1">
                                completed
                                < CheckCircleIcon sx={{
                                    color: theme.palette.success.main,
                                    fontSize: 16,
                                }} />
                            </div>
                        ) : (
                            "in proggress"
                        )
                    }
                </span>
                <span style={{ color: theme.palette.warning.main }}>
                    {!task.completed && calculateRemainingDays(task.dueDate)}
                </span>
            </div>
            <h2 className="font-semibold text-3xl">{task.title}</h2>
            <p className="text-lg">{task.description}</p>
            <span className='font-medium text-gray-500'>Due Date:
                <span className="italic"> {task.dueDate && dayjs(task.dueDate).format("DD MM YYYY")}</span>
            </span>
            <div className='flex flex-col gap-3 mt-auto pt-3'>
                <Divider sx={{ backgroundColor: "#C6C6C6" }} />
                <div className='flex justify-between gap-3'>
                    <Button variant="contained" onClick={toggleTaskComplete}>
                        {task.completed ? "mark as incomplete" : "mark as complete"}
                    </Button>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={anchorEl ? 'actions-menu' : undefined}
                        aria-expanded={anchorEl ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleActionMenuBtnClick}
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
                        onClose={handleActionMenuClose}
                    >
                        <MenuItem onClick={() => onMenuActionClick(
                            () => openDialog(task._id)
                        )}
                        >Edit</MenuItem>
                        <MenuItem onClick={() => onMenuActionClick(
                            () => deleteTask(task._id)
                        )}>Delete</MenuItem>
                    </Menu>
                </div>
            </div>
        </li>
    )
}

export default Task;