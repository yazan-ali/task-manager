import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Dialog, DialogTitle } from '@mui/material';

const UpdateTaskForm = ({ taskId, updateFormOpen, closeDialog, onUpdateSuccess }) => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const task = tasks.find((t) => t._id === taskId);
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate);
        }
    }, [taskId, tasks]);

    const updateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/tasks/${taskId}`,
                {
                    title,
                    description,
                    dueDate,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
            onUpdateSuccess();
        } catch (error) {
            console.error('An error occurred while updating task: ', error);
        }
    };

    // const handleCloseDialog = () => {
    //     handleClose(false);
    // };

    return (
        <Dialog
            onClose={closeDialog}
            open={updateFormOpen}
            fullWidth
        >
            <DialogTitle>Update task</DialogTitle>
            <form onSubmit={updateTask} className='flex flex-col gap-8 p-10 shadow-none'>
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
                <Button type="submit" variant="contained">Update Task</Button>
            </form>
        </Dialog>
    );
};

export default UpdateTaskForm;