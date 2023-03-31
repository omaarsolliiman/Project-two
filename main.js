const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  renderTasks();
}

addTaskButton.addEventListener("click", addTask);

function addTask() {
  const task = taskInput.value;
  if (task) {
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
    saveTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
      <span>${task}</span>
      <button class="editTaskButton" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="deleteTaskButton" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
    `;
    taskList.prepend(taskElement);
  });

  const editTaskButtons = document.querySelectorAll(".editTaskButton");
  editTaskButtons.forEach(editTaskButton => {
    editTaskButton.addEventListener("click", editTask);
  });

  const deleteTaskButtons = document.querySelectorAll(".deleteTaskButton");
  deleteTaskButtons.forEach(deleteTaskButton => {
    deleteTaskButton.addEventListener("click", deleteTask);
  });
}

function editTask(event) {
  const index = event.target.dataset.index;
  const newTask = prompt("Enter new task:");
  if (newTask) {
    tasks[index] = newTask;
    renderTasks();
    saveTasks();
  }
}

function deleteTask(event) {
  const index = event.target.dataset.index;
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
