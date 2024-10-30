// Selecting elements
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const savedFolders = document.getElementById("saved-folders");

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadSavedFolders();
});

// Event listener for adding a task
addTaskBtn.addEventListener("click", addTask);

// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
  };

  saveTaskToLocalStorage(task); // Save the task to localStorage
  taskInput.value = ""; // Clear the input field

  renderTask(task); // Render the new task immediately at the bottom of the task list
}

// Function to save the task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task); // Add the new task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
}

// Function to render a task
function renderTask(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  if (task.completed) taskElement.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    if (task.completed) {
      taskElement.classList.add("completed");
    } else {
      taskElement.classList.remove("completed");
    }
    saveAllTasks();
  });

  const taskName = document.createElement("span");
  taskName.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskElement.remove();
    deleteTask(task);
  });

  taskElement.appendChild(checkbox);
  taskElement.appendChild(taskName);
  taskElement.appendChild(deleteBtn);
  taskList.appendChild(taskElement); // Append to the bottom of the task list
}

// Load tasks from localStorage
function loadTasks() {
  taskList.innerHTML = ""; // Clear the task list before re-rendering
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task)); // Render all tasks from localStorage
}

// Rest of your functions remain the same...
