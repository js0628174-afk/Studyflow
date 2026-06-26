let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("goals", JSON.stringify(goals));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  saveData();
  renderTasks();
  updateDashboard();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    const done = document.createElement("button");
    done.textContent = "✓";
    done.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      saveData();
      renderTasks();
      updateDashboard();
    };

    const remove = document.createElement("button");
    remove.textContent = "🗑";
    remove.onclick = function () {
      tasks.splice(index, 1);
      saveData();
      renderTasks();
      updateDashboard();
    };

    li.appendChild(done);
    li.appendChild(remove);
    list.appendChild(li);
  });
}

function addGoal() {
  const input = document.getElementById("goalInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a goal.");
    return;
  }

  goals.push(text);
  input.value = "";
  saveData();
  renderGoals();
}

function renderGoals() {
  const list = document.getElementById("goalList");
  list.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.textContent = goal;

    const remove = document.createElement("button");
    remove.textContent = "🗑";
    remove.onclick = function () {
      goals.splice(index, 1);
      saveData();
      renderGoals();
    };

    li.appendChild(remove);
    list.appendChild(li);
  });
}

function updateDashboard() {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;

  document.getElementById("completedCount").textContent = completed;
  document.getElementById("pendingCount").textContent = pending;
}

renderTasks();
renderGoals();
updateDashboard();
