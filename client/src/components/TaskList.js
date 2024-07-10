import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import UpdateTaskForm from '../components/UpdateTaskForm';

const TaskList = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { user, logout } = useContext(AuthContext);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);

    const editTask = (id) => {
        setUpdatingTaskId(id)
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
            <button onClick={() => logout()}>Logout</button>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.description} {task.dueDate && ` - ${task.dueDate}`}
                        <button onClick={() => editTask(task._id)}>Edit</button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {updatingTaskId && (
                <UpdateTaskForm
                    taskId={updatingTaskId}
                    onUpdateSuccess={() => setUpdatingTaskId(null)}
                />
            )}
        </div>
    );
};

export default TaskList;