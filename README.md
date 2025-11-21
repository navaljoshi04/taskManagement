# Task Management App

A full-stack task management application built with React and Node.js. This project helps you organize and track your tasks with a clean, modern interface.

## What's Inside

This is a MERN stack application (MongoDB, Express, React, Node.js) split into client and server directories.

### Frontend

- React 19 with Vite for fast development
- Tailwind CSS for styling (dark theme)
- Redux Toolkit for state management
- RTK Query for API calls
- React Router for navigation
- Lucide React for icons

### Backend

- Express.js server
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Express Validator for input validation

## Features

- **User Authentication**: Sign up and login with JWT tokens
- **Task CRUD**: Create, read, update, and delete tasks
- **Task Status**: Track tasks with statuses (pending, in-progress, completed, cancelled)
- **Search**: Search tasks by title
- **Filtering**: Filter tasks by status
- **Sorting**: Tasks are automatically sorted by due date
- **Due Dates**: Set and view due dates for tasks
- **Responsive Design**: Works on desktop and mobile devices


## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Create new user account
- `POST /api/v1/auth/login` - Login user

### Tasks (requires authentication)

- `GET /api/v1/tasks` - Get all tasks
- `GET /api/v1/tasks/:id` - Get single task
- `POST /api/v1/tasks/create` - Create new task
- `PATCH /api/v1/tasks/:id` - Update task
- `PATCH /api/v1/tasks/:id/status` - Update task status
- `DELETE /api/v1/tasks/delete/:id` - Delete task

## Usage

1. Sign up for a new account or login with existing credentials
2. Once logged in, you'll see the home page with all your tasks
3. Click "Create Task" to add a new task
4. Use the search bar to find specific tasks
5. Filter tasks by status using the status buttons
6. Click "Update" to edit a task (disabled for completed tasks)
7. Click "Delete" to remove a task

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Redux Toolkit, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Icons**: Lucide React

## Notes

- Tasks are user-specific (filtered by authenticated user)
- Completed tasks cannot be edited
- Tasks are sorted by due date automatically
- The app uses a dark theme throughout
