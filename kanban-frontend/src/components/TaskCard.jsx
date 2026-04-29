import React from 'react';

export default function TaskCard({ task, onToggleStatus, onDelete }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const isDone = task.status === 'done';

  return (
    <div 
      className={`task-card ${isDone ? 'done' : ''}`}
      draggable
      onDragStart={handleDragStart}
    >
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => onToggleStatus(task.id)}
        className="task-checkbox"
      />
      <span className="task-title">{task.title}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
