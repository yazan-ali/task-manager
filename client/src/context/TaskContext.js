import React, { createContext, useEffect, useContext, useReducer } from 'react';
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './TaskActionTypes';
import { taskReducer } from './TaskReducer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import useSnackbar from '../hooks/useSnackbar';
import CustomSnackbar from '../components/CustomSnackbar';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const initialState = { tasks: [] };
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const { user } = useContext(AuthContext);

    const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (user) {
            getTasks();
        } else {
            dispatch({ type: GET_TASKS, payload: [] });
        }
    }, [user]);

    const getTasks = async (filter, sortBy) => {
        try {
            const res = await axios.get('http://localhost:5000/tasks', {
                params: { sortBy, filter },
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: GET_TASKS, payload: res.data });
        } catch (error) {
            showSnackbar("An error occurred while fetching tasks", "error")
        }
    };

    const createTask = async (task) => {
        try {
            const res = await axios.post('http://localhost:5000/tasks', task, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: CREATE_TASK, payload: res.data });
            showSnackbar("Task created successfully", "success");
        } catch (error) {
            showSnackbar(error.response.data.error, "error")
        }
    };

    const updateTask = async (task) => {
        try {
            const res = await axios.put(`http://localhost:5000/tasks/${task._id}`, task, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: UPDATE_TASK, payload: res.data });
            showSnackbar("Task updated successfully", "success")
        } catch (error) {
            console.log(error)
            showSnackbar(error.response.data.error, "error")
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: DELETE_TASK, payload: id });
            showSnackbar("Task deleted successfully", "success");
        } catch (error) {
            showSnackbar("An error occurred while deleting task", "error")
        }
    };

    return (
        <TaskContext.Provider value={{ tasks: state.tasks, getTasks, createTask, updateTask, deleteTask }}>
            {children}
            <CustomSnackbar snackbar={snackbar} closeSnackbar={closeSnackbar} />
        </TaskContext.Provider>
    );
};