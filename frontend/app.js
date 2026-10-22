// ======================================================
// STUDYFLOW AI - APP.JS
// ======================================================


// ======================================================
// 1. LOAD SAVED DATA
// ======================================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];


// ======================================================
// 2. SAVE DATA
// ======================================================

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("goals", JSON.stringify(goals));
}


// ======================================================
// 3. ADD A NEW TASK
// ======================================================

function addTask() {
  const input = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const dueDateInput = document.getElementById("dueDate");

  if (!input || !prioritySelect || !dueDateInput) {
    console.error("Task input elements could not be found.");
    return;
  }

  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;

  tasks.push({
    text: text,
    priority: priority,
    dueDate: dueDate,
    completed: false
  });

  input.value = "";
  prioritySelect.value = "Medium";
  dueDateInput.value = "";

  saveData();
  renderTasks();
  updateDashboard();
}


// ======================================================
// 4. DEADLINE INFORMATION
// ======================================================

function getDeadlineInfo(dueDate) {
  if (!dueDate) {
    return {
      status: "none",
      label: "No deadline",
      daysLeft: Infinity,
      urgencyScore: 0
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(dueDate + "T00:00:00");
  deadline.setHours(0, 0, 0, 0);

  const difference = deadline.getTime() - today.getTime();

  const daysLeft = Math.round(
    difference / (1000 * 60 * 60 * 24)
  );

  if (daysLeft < 0) {
    return {
      status: "overdue",
      label: "⚠️ OVERDUE",
      daysLeft: daysLeft,
      urgencyScore: 5
    };
  }

  if (daysLeft === 0) {
    return {
      status: "today",
      label: "🔥 Due Today",
      daysLeft: 0,
      urgencyScore: 4
    };
  }

  if (daysLeft === 1) {
    return {
      status: "tomorrow",
      label: "⏰ Due Tomorrow",
      daysLeft: 1,
      urgencyScore: 3
    };
  }

  if (daysLeft <= 3) {
    return {
      status: "soon",
      label: `⚡ ${daysLeft} days left`,
      daysLeft: daysLeft,
      urgencyScore: 2
    };
  }

  return {
    status: "later",
    label: `${daysLeft} days left`,
    daysLeft: daysLeft,
    urgencyScore: 1
  };
}


// ======================================================
// 5. RENDER TASKS
// ======================================================

function renderTasks() {
  const list = document.getElementById("taskList");

  if (!list) return;

  const searchInput = document.getElementById("taskSearch");

  const searchTerm = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  list.innerHTML = "";

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityA = priorityOrder[a.priority] || 4;
    const priorityB = priorityOrder[b.priority] || 4;

    const priorityDifference = priorityA - priorityB;

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const filteredTasks = sortedTasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm)
  );

  const taskCounter = document.getElementById("taskCounter");

  if (taskCounter) {
    taskCounter.textContent =
      `Showing ${filteredTasks.length} of ${tasks.length} tasks`;
  }

  filteredTasks.forEach((task) => {
    const index = tasks.indexOf(task);

    const li = document.createElement("li");

    const priorityColor =
      task.priority === "High"
        ? "red"
        : task.priority === "Medium"
        ? "orange"
        : "green";

    const deadlineInfo = getDeadlineInfo(task.dueDate);

    li.innerHTML = `
      <span style="
        background:${priorityColor};
        color:white;
        padding:3px 8px;
        border-radius:12px;
        font-size:12px;
        margin-right:10px;
      ">
        ${task.priority || "Medium"}
      </span>

      <strong>${task.text}</strong>

      <br>

      <small>
        📅 Due: ${task.dueDate || "No Due Date"}
      </small>

      ${
        task.dueDate && !task.completed
          ? `<br>
             <span style="
               color:${deadlineInfo.status === "overdue" ? "red" : "#555"};
               font-weight:bold;
             ">
               ${deadlineInfo.label}
             </span>`
          : ""
      }
    `;

    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.7";
    }

    const doneButton = document.createElement("button");

    doneButton.textContent = "✓";

    doneButton.onclick = function () {
      tasks[index].completed = !tasks[index].completed;

      saveData();
      renderTasks();
      updateDashboard();
    };

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "🗑";

    deleteButton.onclick = function () {
      tasks.splice(index, 1);

      saveData();
      renderTasks();
      updateDashboard();
    };

    li.appendChild(doneButton);
    li.appendChild(deleteButton);

    list.appendChild(li);
  });
}


// ======================================================
// 6. ADD WEEKLY GOAL
// ======================================================

function addGoal() {
  const input = document.getElementById("goalInput");

  if (!input) return;

  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a goal.");
    return;
  }

  goals.push(text);

  input.value = "";

  saveData();
  renderGoals();
  updateDashboard();
}


// ======================================================
// 7. RENDER WEEKLY GOALS
// ======================================================

function renderGoals() {
  const list = document.getElementById("goalList");

  if (!list) return;

  list.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");

    li.textContent = goal;

    const removeButton = document.createElement("button");

    removeButton.textContent = "🗑";

    removeButton.onclick = function () {
      goals.splice(index, 1);

      saveData();
      renderGoals();
      updateDashboard();
    };

    li.appendChild(removeButton);

    list.appendChild(li);
  });
}


// ======================================================
// 8. UPDATE DASHBOARD
// ======================================================

function updateDashboard() {
  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = tasks.length - completed;

  const totalTasks = tasks.length;

  const completedCount =
    document.getElementById("completedCount");

  const pendingCount =
    document.getElementById("pendingCount");

  const goalCount =
    document.getElementById("goalCount");

  const progressBar =
    document.getElementById("progressBar");

  const progressText =
    document.getElementById("progressText");

  if (completedCount) {
    completedCount.textContent = completed;
  }

  if (pendingCount) {
    pendingCount.textContent = pending;
  }

  if (goalCount) {
    goalCount.textContent = goals.length;
  }

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completed / totalTasks) * 100);

  if (progressBar) {
    progressBar.value = progress;
  }

  if (progressText) {
    progressText.textContent = progress + "%";
  }

  // Recalculate recommendation whenever dashboard changes
  updateSmartReminder();
}


// ======================================================
// 9. DISPLAY CURRENT DATE
// ======================================================

function displayCurrentDate() {
  const currentDate =
    document.getElementById("currentDate");

  if (!currentDate) return;

  const today = new Date();

  currentDate.textContent =
    today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
}


// ======================================================
// 10. SUMMARIZE NOTES
// ======================================================

function summarizeNotes() {
  const notesInput =
    document.getElementById("notesInput");

  const output =
    document.getElementById("aiOutput");

  if (!notesInput || !output) return;

  const notes = notesInput.value.trim();

  if (notes === "") {
    output.innerHTML =
      "<p>Please paste notes first.</p>";

    return;
  }

  const sentences = notes
    .split(".")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence !== "");

  const summary =
    sentences.slice(0, 2).join(". ") + ".";

  output.innerHTML = `
    <h3>Study Summary</h3>

    <p>${summary}</p>

    <p>
      <strong>Key Focus:</strong>
      Review the main ideas and explain them
      in your own words.
    </p>
  `;
}


// ======================================================
// 11. GENERATE PRACTICE QUIZ
// ======================================================

function generateQuiz() {
  const notesInput =
    document.getElementById("notesInput");

  const output =
    document.getElementById("aiOutput");

  if (!notesInput || !output) return;

  const notes = notesInput.value.trim();

  if (notes === "") {
    output.innerHTML =
      "<p>Please paste notes first.</p>";

    return;
  }

  output.innerHTML = `
    <h3>Practice Quiz</h3>

    <ol>
      <li>What is the main topic of these notes?</li>
      <li>Explain the main idea in your own words.</li>
      <li>What is one important detail?</li>
      <li>Give one example related to the topic.</li>
    </ol>
  `;
}


// ======================================================
// 12. GENERATE FLASHCARDS
// ======================================================

function generateFlashcards() {
  const notesInput =
    document.getElementById("notesInput");

  const output =
    document.getElementById("aiOutput");

  if (!notesInput || !output) return;

  const notes = notesInput.value.trim();

  if (notes === "") {
    output.innerHTML =
      "<p>Please paste notes first.</p>";

    return;
  }

  const words = notes.split(/\s+/);

  output.innerHTML = `
    <h3>Flashcard</h3>

    <div class="flashcard">

      <strong>Front:</strong>

      <p>
        ${words.slice(0, 5).join(" ")}...
      </p>

      <strong>Back:</strong>

      <p>
        Explain this section in your own words
        without looking at your notes.
      </p>

    </div>
  `;
}


// ======================================================
// 13. SMART STUDY PLAN
// ======================================================

function generateStudyPlan() {
  const output =
    document.getElementById("aiOutput");

  if (!output) return;

  const pendingTasks =
    tasks.filter((task) => !task.completed);

  if (pendingTasks.length === 0) {
    output.innerHTML = `
      <h3>🎯 Smart Study Coach</h3>

      <p>
        🎉 You have no pending tasks.
        Great job!
      </p>
    `;

    return;
  }

  const priorityScore = {
    High: 6,
    Medium: 4,
    Low: 2
  };

  function calculateTaskScore(task) {
    const deadlineInfo =
      getDeadlineInfo(task.dueDate);

    const priorityPoints =
      priorityScore[task.priority] || 0;

    return (
      priorityPoints +
      deadlineInfo.urgencyScore
    );
  }

  const recommendedTasks =
    [...pendingTasks].sort((a, b) => {
      const scoreA = calculateTaskScore(a);
      const scoreB = calculateTaskScore(b);

      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }

      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return (
        new Date(a.dueDate) -
        new Date(b.dueDate)
      );
    });

  let planHTML = `
    <h3>🎯 Smart Study Coach</h3>

    <p>
      Based on your priorities and deadlines,
      here's your recommended study order:
    </p>

    <ol>
  `;

  recommendedTasks.forEach((task) => {
    const deadline =
      getDeadlineInfo(task.dueDate);

    planHTML += `
      <li>
        <strong>${task.text}</strong>
        — ${task.priority || "Medium"} Priority
        — ${deadline.label}
      </li>
    `;
  });

  planHTML += `
    </ol>

    <p>
      <strong>Next step:</strong>
      Start with the first task and work
      down the list.
    </p>
  `;

  output.innerHTML = planHTML;
}


// ======================================================
// 14. CLEAR COMPLETED TASKS
// ======================================================

function clearCompletedTasks() {
  tasks = tasks.filter(
    (task) => !task.completed
  );

  saveData();
  renderTasks();
  updateDashboard();
}


// ======================================================
// 15. SMART REMINDER
// ======================================================

function updateSmartReminder() {
  const reminder =
    document.getElementById("smartReminder");

  if (!reminder) {
    return;
  }

  const pendingTasks =
    tasks.filter((task) => !task.completed);

  if (pendingTasks.length === 0) {
    reminder.innerHTML = `
      <strong>🎉 You're caught up!</strong>
      <span>No unfinished tasks right now.</span>
    `;

    return;
  }

  const priorityScore = {
    High: 6,
    Medium: 4,
    Low: 2
  };

  const rankedTasks =
    [...pendingTasks].sort((a, b) => {
      const aDeadline =
        getDeadlineInfo(a.dueDate);

      const bDeadline =
        getDeadlineInfo(b.dueDate);

      const aScore =
        (priorityScore[a.priority] || 0) +
        aDeadline.urgencyScore;

      const bScore =
        (priorityScore[b.priority] || 0) +
        bDeadline.urgencyScore;

      if (aScore !== bScore) {
        return bScore - aScore;
      }

      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return (
        new Date(a.dueDate) -
        new Date(b.dueDate)
      );
    });

  const nextTask = rankedTasks[0];

  const deadlineInfo =
    getDeadlineInfo(nextTask.dueDate);

  let message = "";

  if (deadlineInfo.daysLeft < 0) {
    const overdueDays =
      Math.abs(deadlineInfo.daysLeft);

    message =
      `🚨 Overdue by ${overdueDays} ` +
      `day${overdueDays === 1 ? "" : "s"}. ` +
      `Try to finish this as soon as possible.`;

  } else if (deadlineInfo.daysLeft === 0) {

    message =
      "🔥 This task is due today. Make this your main focus.";

  } else if (deadlineInfo.daysLeft === 1) {

    message =
      "⏰ This task is due tomorrow.";

  } else if (deadlineInfo.daysLeft <= 3) {

    message =
      `⚡ Only ${deadlineInfo.daysLeft} days remaining.`;

  } else if (deadlineInfo.daysLeft === Infinity) {

    message =
      "📚 Recommended because of its priority.";

  } else {

    message =
      `📚 ${deadlineInfo.daysLeft} days remaining. ` +
      `Recommended based on priority and deadline.`;
  }

  reminder.innerHTML = `
    <strong>
      🤖 Smart Reminder: ${nextTask.text}
    </strong>

    <span>
      ${message}
    </span>
  `;
}


// ======================================================
// 16. START STUDYFLOW
// ======================================================


// ======================================================
// BROWSER DEADLINE NOTIFICATIONS
// ======================================================

// Remember which notifications have already been shown
const notifiedTasks = new Set();

// Update the notification status shown on the page
function updateNotificationStatus(message) {
  const status = document.getElementById("notificationStatus");

  if (status) {
    status.textContent = message;
  }
}

// Ask permission when the user clicks the button
async function enableNotifications() {
  if (!("Notification" in window)) {
    updateNotificationStatus(
      "This browser does not support notifications."
    );
    return;
  }

  if (!window.isSecureContext) {
    updateNotificationStatus(
      "Notifications require localhost or a secure HTTPS website."
    );
    return;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      updateNotificationStatus("🔔 Notifications enabled!");
      checkDeadlineNotifications();
    } else if (permission === "denied") {
      updateNotificationStatus(
        "Notifications are blocked. Change your browser's site permissions to enable them."
      );
    } else {
      updateNotificationStatus("Notification permission was not granted.");
    }
  } catch (error) {
    console.error("Notification permission error:", error);
    updateNotificationStatus("Unable to enable notifications.");
  }
}

// Check unfinished tasks for approaching deadlines
function checkDeadlineNotifications() {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const pendingTasks = tasks.filter(task =>
    !task.completed && task.dueDate
  );

  pendingTasks.forEach(task => {
    const deadline = getDeadlineInfo(task.dueDate);

    let message = "";

    if (deadline.daysLeft < 0) {
      message = "This assignment is overdue.";
    } else if (deadline.daysLeft === 0) {
      message = "This assignment is due today.";
    } else if (deadline.daysLeft === 1) {
      message = "This assignment is due tomorrow.";
    } else {
      return;
    }

    // Avoid repeating the same alert during this page session
    const notificationKey =
      `${task.text}|${task.dueDate}|${deadline.daysLeft}`;

    if (notifiedTasks.has(notificationKey)) return;

    notifiedTasks.add(notificationKey);

    try {
      new Notification("🔔 StudyFlow Deadline Reminder", {
        body: `${task.text} — ${message}`,
        tag: notificationKey
      });
    } catch (error) {
      console.error("Unable to display notification:", error);
    }
  });
}

// Refresh notification status on page load
function initializeNotifications() {
  if (!("Notification" in window)) {
    updateNotificationStatus("Notifications are not supported.");
    return;
  }

  if (Notification.permission === "granted") {
    updateNotificationStatus("🔔 Notifications enabled!");
    checkDeadlineNotifications();
  } else if (Notification.permission === "denied") {
    updateNotificationStatus("Notifications are blocked in browser settings.");
  } else {
    updateNotificationStatus("Click the button to enable notifications.");
  }
}

// Check periodically while StudyFlow remains open
setInterval(checkDeadlineNotifications, 60 * 1000);
// START STUDYFLOW AI

displayCurrentDate();
renderTasks();
renderGoals();
updateDashboard();
initializeNotifications();