import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField, Button, Typography } from '@mui/material';
import TaskFormWrapper from '../components/TaskFormWrapper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useForm from '../hooks/useForm';

const TaskForm = () => {
    const formInitialValues = { title: '', description: '', dueDate: null };
    const { createTask } = useContext(TaskContext);

    const onSubmit = async (values) => {
        await createTask(values);
    };


    const { values, errors, handleChange, handleSubmit } = useForm(formInitialValues, onSubmit);

    return (
        <TaskFormWrapper handleSubmit={handleSubmit}>
            <Typography
                className="form-title">
                Create new task
            </Typography>
            <TextField
                label="Title"
                name="title"
                variant="outlined"
                type="text"
                value={values.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="Title"
                fullWidth
            />
            <TextField
                label="Description"
                name="description"
                variant="outlined"
                type="text"
                value={values.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Description"
                fullWidth
                multiline
            />
            <DatePicker
                label="Due Date"
                value={values.dueDate}
                onChange={(date) => handleChange({ name: "dueDate", value: date })}
                slotProps={{
                    textField: {
                        error: !!errors.dueDate,
                        helperText: errors.dueDate,
                        fullWidth: true,
                    }
                }}
                sx={{ width: "100%" }}
            />
            <Button type="submit" variant="contained">Create Task</Button>
        </TaskFormWrapper>
    );
};

export default TaskForm;