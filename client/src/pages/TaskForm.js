import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField, Typography } from '@mui/material';
import FormSubmitButton from '../components/FormSubmitButton';
import TaskFormWrapper from '../components/TaskFormWrapper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useForm from '../hooks/useForm';
import dayjs from 'dayjs';

const TaskForm = () => {
    const formInitialValues = { title: '', description: '', dueDate: null };
    const { createTask } = useContext(TaskContext);

    const onSubmit = async (values) => {
        return await createTask(values);
    };


    const { values, errors, isLoading, handleChange, handleSubmit } = useForm(formInitialValues, onSubmit);

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
                disabled={isLoading}
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
                disabled={isLoading}
            />
            <DatePicker
                label="Due Date"
                value={values.dueDate}
                onChange={(date) => handleChange({ name: "dueDate", value: date })}
                minDate={dayjs()}
                slotProps={{
                    textField: {
                        error: !!errors.dueDate,
                        helperText: errors.dueDate,
                        fullWidth: true,
                        disabled: isLoading
                    }
                }}
                sx={{ width: "100%" }}
            />
            <FormSubmitButton
                type="submit"
                variant="contained"
                isLoading={isLoading}
            >
                create task
            </FormSubmitButton>
        </TaskFormWrapper>
    );
};

export default TaskForm;