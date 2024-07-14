# Task Management Application

## Overview
A simple task management application where users can create, read, update, and delete tasks. The application includes user authentication and a RESTful API.

## Features
- **User Authentication**: Sign up, log in, log out
- **Task Management**: Create, view, update, delete tasks
- **Task Actions**: Task filtering, sorting, and mark tasks as complete or incomplete
- **User Association**: Each task is associated with the user who created it

## Technologies
- **Frontend**: React, React Router, Axios, Material UI, SCSS
- **Backend**: Node.js, Express, MongoDB, JWT, bcryptjs
- **Testing**: Jest, Supertest

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance running (local or cloud-based)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yazan-ali/task-manager.git
    cd task-manager
    ```

2. **Run the server**:
    ```bash
    cd server
    npm install
    npm start   # To run the server
    # or
    npm run dev # To run the server with test suites in watch mode
    ```

3. **Run the client**:
    ```bash
    cd ../client  # Go back to the task-manager root level and then into the client directory
    npm install
    npm start
    ```

4. **Run the server test suites**:
    ```bash
    cd ../server
    npm test
    ```

## Usage

1. **Start the server**:
    ```bash
    cd server
    npm start
    ```

2. **Start the client**:
    ```bash
    cd ../client
    npm start
    ```

3. **Access the application**:
    - Open your browser and navigate to `http://localhost:3000` to use the application.

## Additional Information


### API Endpoints

- **Authentication**:
    - `POST /signup` - Sign up a new user
    - `POST /login` - Log in an existing user
- **Tasks**:
    - `GET /tasks` - Get all tasks for the logged-in user
    - `POST /tasks` - Create a new task
    - `PUT /tasks/:id` - Update an existing task
    - `DELETE /tasks/:id` - Delete a task