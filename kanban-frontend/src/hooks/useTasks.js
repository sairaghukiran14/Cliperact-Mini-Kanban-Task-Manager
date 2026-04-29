import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const API_URL = 'http://localhost:5555/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      toast.error('Could not connect to the backend server');
    }
  };

  const addTask = async (title) => {
    if (!title.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() })
      });

      if (!response.ok) throw new Error('Failed to create task');
      const newTask = await response.json();

      setTasks(prevTasks => [...prevTasks, newTask]);
      toast.success('Task added successfully!');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate || taskToUpdate.status === newStatus) return;

    // Optimistic update for snappy UI
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update task');

      if (newStatus === 'done') {
        toast.success('Task marked as done!');
      } else {
        toast.info('Task moved to To Do');
      }
    } catch (err) {
      // Revert optimistic update
      setTasks(originalTasks);
      toast.error('Failed to update task');
    }
  };

  const toggleTaskStatus = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const newStatus = task.status === 'todo' ? 'done' : 'todo';
    updateTaskStatus(taskId, newStatus);
  };

  const deleteTask = async (taskId) => {
    // Optimistic update
    const originalTasks = [...tasks];
    setTasks(tasks.filter(t => t.id !== taskId));

    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');

      toast.error('Task deleted', {
        icon: '🗑️',
        style: { background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5' }
      });
    } catch (err) {
      // Revert on failure
      setTasks(originalTasks);
      toast.error('Failed to delete task');
    }
  };

  return {
    tasks,
    addTask,
    updateTaskStatus,
    toggleTaskStatus,
    deleteTask
  };
}
