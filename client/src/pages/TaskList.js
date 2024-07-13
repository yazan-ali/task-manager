import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import UpdateTaskForm from '../components/UpdateTaskForm';
import Task from '../components/Task';
import { Container, Divider } from '@mui/material';
import TaskBar from '../components/TaskBar';
import SearchField from '../components/Search';

const TaskList = () => {
    const { user } = useContext(AuthContext);
    const { tasks } = useContext(TaskContext);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [updateFormOpen, setUpdateFormOpen] = useState(false);

    const openDialog = (id) => {
        setUpdatingTaskId(id)
        setUpdateFormOpen(true);
    }

    const closeDialog = () => {
        setUpdateFormOpen(false);
    };

    const onUpdateSuccess = () => {
        closeDialog();
        setUpdatingTaskId(null)
    }

    return (
        <section className='my-14 text-gray-700'>
            <Container maxWidth="lg">
                <h1 className='flex items-center capitalize text-4xl'>Hi {user.username},
                    {tasks.length ? " here is your list of tasks" : " Your tasks list is empty"}
                </h1>
                <TaskBar />
                <Divider sx={{ backgroundColor: "#C6C6C6" }} />
                <div className="task-search mt-6">
                    <SearchField />
                </div>
                <ul className='task-list flex flex-wrap gap-6 mt-6'>
                    {tasks.map((task) => (
                        <Task
                            key={task._id}
                            task={task}
                            openDialog={openDialog}
                        />
                    ))}
                </ul>
                {updatingTaskId && (
                    <UpdateTaskForm
                        taskId={updatingTaskId}
                        updateFormOpen={updateFormOpen}
                        closeDialog={closeDialog}
                        onUpdateSuccess={onUpdateSuccess}
                    />
                )}
            </Container>
        </section>
    );
};

export default TaskList;