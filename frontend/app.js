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
  document.getElementById("goalCount").textContent = goals.length;
}

renderTasks();
renderGoals();
updateDashboard();
const today = new Date();

document.getElementById("currentDate").textContent =
  today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
function summarizeNotes() {
  const notes = document.getElementById("notesInput").value.trim();
  const output = document.getElementById("aiOutput");

  if (notes === "") {
    output.innerHTML = "<p>Please paste notes first.</p>";
    return;
  }

  const sentences = notes.split(".");
  const summary = sentences.slice(0, 2).join(".") + ".";

  output.innerHTML = `
    <h3>AI Summary</h3>
    <p>${summary}</p>
    <p><strong>Key Focus:</strong> Review the main ideas.</p>
  `;
}

function generateQuiz() {
  const notes = document.getElementById("notesInput").value.trim();
  const output = document.getElementById("aiOutput");

  if (notes === "") {
    output.innerHTML = "<p>Please paste notes first.</p>";
    return;
  }

  output.innerHTML = `
    <h3>Practice Quiz</h3>
    <ol>
      <li>What is the main topic?</li>
      <li>Explain it in your own words.</li>
      <li>Give one example.</li>
    </ol>
  `;
}
