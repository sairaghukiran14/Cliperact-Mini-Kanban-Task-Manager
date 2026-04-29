import React from 'react';
import { Toaster } from 'sonner';
import TaskManager from './TaskManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <TaskManager />
    </div>
  );
}

export default App;
