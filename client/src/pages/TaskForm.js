import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Typography } from '@mui/material';
import TaskFormWrapper from '../components/TaskFormWrapper';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const { user } = useContext(AuthContext);

    const createTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks',
                { title, description, dueDate },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
        } catch (error) {
            // alert('Error creating task');
        }
    };

    return (
        <TaskFormWrapper handleSubmit={createTask}>
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
            <div>
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <Button type="submit" variant="contained">Create Task</Button>
        </TaskFormWrapper>
    );
};

export default TaskForm;