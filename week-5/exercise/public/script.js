const form = document.querySelector("#taskForm");
const input = document.querySelector("#title");
const statusEl = document.querySelector("#status");
const taskList = document.querySelector("#taskList");

function showStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = `status ${type}`;
}

async function saveTask(taskData) {
  const btn = document.querySelector("#saveBtn");
  try {
    btn.disabled = true;
    btn.textContent = "Saving...";
    showStatus("Saving task to the server...", "loading");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Server error");
    }
    return data;
  } catch (err) {
    console.error(err);
    showStatus(`Submission failed: ${err.message}`, "error");
    return null;
  } finally {
    btn.disabled = false;
    btn.textContent = "Save Task";
  }
}

async function loadTasks() {
  try {
    const res = await fetch("/api/tasks");
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const tasks = await res.json();

    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `#${task.id} ${task.title}`; // textContent: user ka text safe rehta hai
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    showStatus("Could not load tasks", "error");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = await saveTask({ title: input.value });

  if (task) {
    showStatus(`Success! "${task.title}" saved with ID #${task.id}`, "success");
    form.reset();
    loadTasks();
  }
});

loadTasks();
