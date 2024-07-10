import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';

const UpdateTaskForm = ({ taskId, onUpdateSuccess }) => {
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

    return (
        <form onSubmit={updateTask}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Description"
                />
            </div>
            <div>
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate || ""}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <button type="submit">Update Task</button>
        </form>
    );
};

export default UpdateTaskForm;