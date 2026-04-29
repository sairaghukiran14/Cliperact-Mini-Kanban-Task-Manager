const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] REQ: ${req.method} ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('REQ BODY:', req.body);
  }

  const originalJson = res.json;
  res.json = function (body) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] RES: ${res.statusCode} (${duration}ms)`);
    if (res.statusCode >= 400) {
      console.error('RES ERROR BODY:', body);
    } else {
      console.log('RES BODY:', body);
    }
    return originalJson.call(this, body);
  };
  next();
});

let tasks = [
  { id: 1001, title: 'Setup project structure', status: 'done' },
  { id: 1002, title: 'Design database schema', status: 'done' },
  { id: 1003, title: 'Build API endpoints', status: 'todo' },
  { id: 1004, title: 'Create React components', status: 'todo' }
];

let nextId = 1005;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;


  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title must not be empty' });
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    status: 'todo'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || !['todo', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Status must be "todo" or "done"' });
  }

  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.status = status;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});


app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] UNHANDLED ERROR:`, err.message);
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
