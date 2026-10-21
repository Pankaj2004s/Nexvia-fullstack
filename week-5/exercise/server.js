const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const tasks = [];

app.get("/api/tasks", (req, res) => {
  return res.status(200).json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({ error: "Title is required (minimum 3 characters)" });
  }

  setTimeout(() => {
    const newTask = { id: tasks.length + 1, title: title.trim() };
    tasks.push(newTask);
    return res.status(201).json(newTask);
  }, 3000);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));