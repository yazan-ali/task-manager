import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField, Button, Dialog, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const UpdateTaskForm = ({ taskId, updateFormOpen, closeDialog, onUpdateSuccess }) => {
    const { tasks, updateTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);

    useEffect(() => {
        const task = tasks.find((t) => t._id === taskId);
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(dayjs(task.dueDate) || null);
        }
    }, [taskId, tasks]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask({ _id: taskId, title, description, dueDate });
        onUpdateSuccess();
    };

    return (
        <Dialog
            onClose={closeDialog}
            open={updateFormOpen}
            fullWidth
        >
            <DialogTitle>Update task</DialogTitle>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 p-10 shadow-none'>
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
                <Button type="submit" variant="contained">Update Task</Button>
            </form>
        </Dialog>
    );
};

export default UpdateTaskForm;