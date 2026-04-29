import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAdd(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">
        Add
      </button>
    </form>
  );
}
