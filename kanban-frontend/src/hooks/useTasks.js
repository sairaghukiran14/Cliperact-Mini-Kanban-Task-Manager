import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL + "/tasks");
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message || 'Could not connect to the backend server');
        toast.error('Could not connect to the backend server');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [API_URL]);

  const addTask = async (title) => {
    if (!title.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
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


    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
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

    const originalTasks = [...tasks];
    setTasks(tasks.filter(t => t.id !== taskId));

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');

      toast.error('Task deleted', {
        icon: '🗑️',
        style: { background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5' }
      });
    } catch (err) {

      setTasks(originalTasks);
      toast.error('Failed to delete task');
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTaskStatus,
    toggleTaskStatus,
    deleteTask
  };
}
