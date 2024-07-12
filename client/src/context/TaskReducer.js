import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './TaskActionTypes';

export const taskReducer = (state, action) => {
    switch (action.type) {
        case GET_TASKS:
            return { ...state, tasks: action.payload };
        case CREATE_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
            };
        default:
            return state;
    }
};
