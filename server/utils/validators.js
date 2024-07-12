validateAuthInputs = (username, password) => {
    if (username.trim() === "") {
        throw new Error("Username can not be empty")
    }
    if (password.trim() === "") {
        throw new Error("Password can not be empty")
    }
}

validateTaskInputs = (title, description, dueDate) => {
    if (title.trim() === "") {
        throw new Error("Title can not be empty")
    }
    if (description.trim() === "") {
        throw new Error("Description can not be empty")
    }
    if (dueDate === null) {
        throw new Error("Due date can not be empty")
    }
}

module.exports = { validateAuthInputs, validateTaskInputs }