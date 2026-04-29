import React from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';
import './TaskManager.css';

export default function TaskManager() {
  const { tasks, loading, error, addTask, updateTaskStatus, toggleTaskStatus, deleteTask } = useTasks();

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const doneTasks = tasks.filter(t => t.status === 'done');

  if (loading) {
    return (
      <div className="task-manager">
        <h1>Task Manager</h1>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {error && <div className="error-message">{error}</div>}

      <TaskForm onAdd={addTask} />

      <div className="columns-container">
        <TaskColumn 
          title="To Do" 
          status="todo"
          tasks={todoTasks} 
          onDrop={updateTaskStatus} 
          onToggleStatus={toggleTaskStatus} 
          onDelete={deleteTask} 
        />
        
        <TaskColumn 
          title="Done" 
          status="done"
          tasks={doneTasks} 
          onDrop={updateTaskStatus} 
          onToggleStatus={toggleTaskStatus} 
          onDelete={deleteTask} 
        />
      </div>
    </div>
  );
}
