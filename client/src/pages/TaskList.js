import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import UpdateTaskForm from '../components/UpdateTaskForm';

const TaskList = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
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
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.description} {task.dueDate && ` - ${task.dueDate}`}
                        <button onClick={() => openDialog(task._id)}>Edit</button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
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
        </div>
    );
};

export default TaskList;