import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthRoute from './components/AuthRoute'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes >
            <Route path="/tasks" element={<AuthRoute />}>
              <Route path="/tasks" element={<TaskList />} />
            </Route>
            <Route path="/create-task" element={<AuthRoute />}>
              <Route path="/create-task" element={<TaskForm />} />
            </Route>
            <Route path="/signup" element={<AuthRoute loginRoute />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/login" element={<AuthRoute loginRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;