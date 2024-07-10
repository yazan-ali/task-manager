import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/tasks', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setTasks(res.data);
            } catch (error) {
                console.error('An error occurred while fetching tasks: ', error);
            }
        };
        if (user) {
            getTasks();
        } else {
            setTasks([])
        }
    }, [user]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};