import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField, Dialog, DialogTitle } from '@mui/material';
import FormSubmitButton from '../components/FormSubmitButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useForm from '../hooks/useForm';
import dayjs from 'dayjs';

const UpdateTaskForm = ({ taskId, updateFormOpen, closeDialog, onUpdateSuccess }) => {
    const { tasks, updateTask } = useContext(TaskContext);
    const [task, setTask] = useState(null);
    const formInitialValues = { title: '', description: '', dueDate: null };

    const onSubmit = async () => {
        await updateTask({ ...task, ...values });
        onUpdateSuccess();
        setTask(null)
    };

    const { values, errors, isLoading, handleChange, handleSubmit, setValues } = useForm(formInitialValues, onSubmit);

    useEffect(() => {
        setTask(tasks.find((t) => t._id === taskId));
        if (task) {
            setValues({
                title: task.title,
                description: task.description,
                dueDate: dayjs(task.dueDate)
            })
        }
    }, [task, taskId, tasks, setValues]);


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
                    update task
                </FormSubmitButton>
            </form>
        </Dialog>
    );
};

export default UpdateTaskForm;