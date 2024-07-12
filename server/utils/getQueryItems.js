const getQueryItems = (filter, sortBy, userId) => {
    const query = { user: userId };
    const sortQuery = {};

    if (sortBy === "created") {
        sortQuery.createdAt = -1;
    } else if (sortBy === "modified") {
        sortQuery.updatedAt = -1;
    } else if (sortBy === "duedate") {
        sortQuery.dueDate = 1;
    }

    if (filter === "completed") {
        query.completed = true;
    } else if (filter === "uncompleted") {
        query.completed = false;
    }

    return { query, sortQuery }
}

module.exports = { getQueryItems };