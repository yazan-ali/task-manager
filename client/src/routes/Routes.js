import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from '../pages/TaskList';
import TaskForm from '../pages/TaskForm';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import AuthRoute from '../components/AuthRoute';
import Navbar from '../components/Navbar';

function AppRoutes() {
    return (
        <Router>
            <Navbar />
            <Routes >
                <Route path="/tasks" element={<AuthRoute />}>
                    <Route path="/tasks" element={<TaskList />} />
                </Route>
                <Route path="/create" element={<AuthRoute />}>
                    <Route path="/create" element={<TaskForm />} />
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
    )
}

export default AppRoutes;