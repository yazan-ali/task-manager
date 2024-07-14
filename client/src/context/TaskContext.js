import React, { createContext, useEffect, useContext, useReducer } from 'react';
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TOGGLE_LOADING } from './TaskActionTypes';
import { taskReducer } from './TaskReducer';
import { AuthContext } from '../context/AuthContext';
import useSnackbar from '../hooks/useSnackbar';
import CustomSnackbar from '../components/CustomSnackbar';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const initialState = { tasks: null };
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

    const toggleLoading = () => {
        dispatch({ type: TOGGLE_LOADING });
    }

    const getTasks = async (filter, sortBy) => {
        try {
            toggleLoading();
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tasks`, {
                params: { sortBy, filter },
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: GET_TASKS, payload: res.data });
            toggleLoading();
        } catch (error) {
            showSnackbar("An error occurred while fetching tasks", "error")
        }
    };

    const createTask = async (task) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tasks`, task, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: CREATE_TASK, payload: res.data });
            showSnackbar("Task created successfully", "success");
            return true
        } catch (error) {
            showSnackbar(error.response.data.error, "error")
        }
    };

    const updateTask = async (task) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/tasks/${task._id}`, task, {
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
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: DELETE_TASK, payload: id });
            showSnackbar("Task deleted successfully", "success");
        } catch (error) {
            showSnackbar("An error occurred while deleting task", "error")
        }
    };

    const filterTasksByTitle = async (searchTerm) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tasks`, {
                params: { searchTerm },
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: GET_TASKS, payload: res.data });
        } catch (error) {
            showSnackbar("An error occurred while fetching tasks", "error")
        }
    };

    return (
        <TaskContext.Provider value={{ tasks: state.tasks, isLoading: state.loading, getTasks, createTask, updateTask, deleteTask, filterTasksByTitle }}>
            {children}
            <CustomSnackbar snackbar={snackbar} closeSnackbar={closeSnackbar} />
        </TaskContext.Provider>
    );
};