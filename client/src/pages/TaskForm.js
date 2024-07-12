import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField, Button, Typography } from '@mui/material';
import TaskFormWrapper from '../components/TaskFormWrapper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const { createTask } = useContext(TaskContext);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await createTask({ title, description, dueDate });
    };

    return (
        <TaskFormWrapper handleSubmit={handleSubmit}>
            <Typography
                className="form-title">
                Create new task
            </Typography>
            <TextField
                label="Title"
                variant="outlined"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                fullWidth
            />
            <TextField
                label="Description"
                variant="outlined"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                fullWidth
                multiline
            />
            <DatePicker
                label="Due Date"
                value={dueDate}
                onChange={(newDate) => setDueDate(newDate)}
                renderInput={(params) =>
                    <TextField {...params}
                        fullWidth
                    />
                }
                sx={{ width: "100%" }}
            />
            <Button type="submit" variant="contained">Create Task</Button>
        </TaskFormWrapper>
    );
};

export default TaskForm;