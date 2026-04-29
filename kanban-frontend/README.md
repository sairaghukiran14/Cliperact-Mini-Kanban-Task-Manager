# Kanban Task Manager

A simple, fast, and elegant Mini Kanban Task Manager built with React.js and an Express.js backend. This project allows you to efficiently manage your tasks across a customizable board.

## Features

- **Create Tasks**: Quickly add new tasks to your "To Do" list.
- **Update Status**: Easily move tasks back and forth between "To Do" and "Done".
- **Delete Tasks**: Remove tasks you no longer need.
- **Optimistic UI Updates**: Instantly see changes without waiting for the network, providing a snappy experience.
- **Responsive Design**: Clean and modern interface that looks great on any screen size.

## Tech Stack

- **Frontend**: React.js, CSS3 (with animations), Sonner (for beautiful toast notifications)
- **Backend**: Node.js, Express.js

## Project Structure

- `/kanban-frontend` - Contains the React user interface and styles.
- `/backend` - Contains the Express.js REST API that stores tasks in memory.

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```
The backend server will run on `http://localhost:5555`.

### 2. Start the Frontend

In a new terminal window:

```bash
cd kanban-frontend
npm install
npm start
```
The React app will open in your browser at `http://localhost:3000`.

## Environment Variables

To connect the frontend to the backend, make sure you have a `.env` file in the `kanban-frontend` directory. 

Example `.env` file:
```
REACT_APP_API_URL=http://localhost:5555
```
*(If you are deploying the backend, change this to your deployed API URL.)*
