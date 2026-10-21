const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const tasks = [];

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);

  return res.status(201).json(newTask);
});

app.get("/api/tasks", (req, res) => {
  return res.status(200).json(tasks);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));