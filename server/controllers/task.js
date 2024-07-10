const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await Task.find({ user: userId });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id;
    // TODO: check if there is a logged in user
    try {
        const task = new Task({ title, description, dueDate, priority, user: userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority } = req.body;
    const userId = req.user.id;

    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Check if the logged-in user is the creator of the task
        if (task.user.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        task.title = title;
        task.description = description;
        task.completed = completed;
        task.dueDate = dueDate;
        task.priority = priority;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Check if the logged-in user is the creator of the task
        if (task.user.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await task.deleteOne({ _id: id });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };