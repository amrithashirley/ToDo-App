const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const currentTasks = document.getElementById("currentTasks");
const completedTasks = document.getElementById("completedTasks");
const noCompletedMsg = document.getElementById("noCompleted");

let tasks = [];
let completed = [];

// Add Task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = { id: Date.now(), text, done: false };
  tasks.push(task);
  renderTasks();
  taskInput.value = "";
});

// Render tasks
function renderTasks() {
  currentTasks.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-pink-100 px-3 py-2 rounded-xl";

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.className = "flex-1";

    // In-place edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "ml-2";
    editBtn.onclick = () => startEdit(task.id, textSpan);

    // Delete
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "ml-2";
    delBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    };

    // Complete
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "✅";
    checkBtn.className = "ml-2";
    checkBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      completed.push(task);
      renderCompleted();
      renderTasks();
    };

    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);

    currentTasks.appendChild(li);
  });
}

// Render completed
function renderCompleted() {
  completedTasks.innerHTML = "";
  if (completed.length === 0) {
    completedTasks.appendChild(noCompletedMsg);
    return;
  }
  completed.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = "line-through text-gray-500 bg-gray-100 px-3 py-2 rounded-xl";
    completedTasks.appendChild(li);
  });
}

// Edit task in place
function startEdit(id, span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "border border-pink-300 rounded px-2 py-1 w-full";

  span.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => {
    const task = tasks.find(t => t.id === id);
    task.text = input.value;
    renderTasks();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
  });
}