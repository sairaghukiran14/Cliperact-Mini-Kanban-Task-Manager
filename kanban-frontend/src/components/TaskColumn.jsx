import React from 'react';
import TaskCard from './TaskCard';

export default function TaskColumn({ title, status, tasks, onDrop, onToggleStatus, onDelete }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'), 10);
    if (!isNaN(taskId)) {
      onDrop(taskId, status);
    }
  };

  return (
    <div 
      className="column"
      onDrop={handleDropEvent}
      onDragOver={handleDragOver}
    >
      <h2>{title} <span className="badge">{tasks.length}</span></h2>
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet</p>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggleStatus={onToggleStatus} 
              onDelete={onDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
}
