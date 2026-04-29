import React, { useState } from 'react';
import { toast } from 'sonner';

export default function TaskForm({ onAdd }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedTitle = newTaskTitle.trim();
    
    if (!trimmedTitle) {
      toast.error('Task title cannot be empty');
      return;
    }
    
    if (trimmedTitle.length < 3) {
      toast.error('Task title must be at least 3 characters long');
      return;
    }
    
    if (trimmedTitle.length > 100) {
      toast.error('Task title cannot exceed 100 characters');
      return;
    }

    onAdd(trimmedTitle);
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
