const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false }
];

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.get('/todos/active', (req, res) => {
  const active = todos.filter(t => !t.completed);
  res.status(200).json(active);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.status(200).json(todo);
});

app.post('/todos', (req, res) => {
  if (!req.body.task) return res.status(400).json({ error: "task field is required" });
  const newTodo = { id: todos.length + 1, task: req.body.task, completed: req.body.completed || false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  if (req.body.task) todo.task = req.body.task;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  res.json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.task = req.body.task;
  todo.completed = req.body.completed;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });
  const deleted = todos.splice(index, 1);
  res.json({ message: "Deleted", todo: deleted[0] });
});

app.listen(3000, () => console.log("Server running on port 3000"));
