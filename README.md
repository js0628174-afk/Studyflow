# StudyFlow AI 📚

**A student productivity platform for organizing assignments, managing weekly goals, and building better study habits.**

StudyFlow is a browser-based student productivity application designed to help high school and college students organize their academic responsibilities and monitor their progress.

## 🎯 The Problem

Students often have difficulty managing multiple assignments, remembering deadlines, organizing weekly goals, and maintaining consistent study habits.

StudyFlow brings these activities together in one dashboard.

## ✨ Current Features

### 1. Assignment Management
- Add and manage assignments.
- Set priority levels: High, Medium, and Low.
- Assign due dates.
- Search existing tasks.
- Mark assignments as completed.
- Delete individual tasks or clear completed tasks.

### 2. Weekly Goals
- Create personal study goals.
- View and manage goals.
- Save goals in the browser.

### 3. Progress Dashboard
- View completed and pending assignment counts.
- Track total goals.
- View task-completion progress.

### 4. Smart Deadline Reminders
- Identify overdue assignments.
- Highlight approaching deadlines.
- Recommend tasks based on priority and due dates.
- Enable browser notifications with permission.

### 5. Study Assistant (Prototype)
- Generate a basic summary from pasted notes.
- Create practice-question prompts.
- Generate simple flashcard prompts.
- Recommend a study order based on outstanding tasks.

**Development note:** These study-assistant functions currently use JavaScript-based logic. They are not yet connected to an external generative AI model.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage
- Browser Notification API

## 🚀 Getting Started

### Requirements
- A modern web browser.
- Python for the optional local server method, or Visual Studio Code with Live Server.

### Run Locally

1. Clone the repository:

   `git clone https://github.com/js0628174-afk/Studyflow.git`

2. Open the project folder:

   `cd Studyflow`

3. Start a local server:

   `python -m http.server 8000`

4. Open this address in your browser:

   `http://localhost:8000/frontend/`

Alternatively, open `frontend/index.html` using the VS Code Live Server extension.

## 📁 Project Structure

```text
Studyflow/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── docs/
│   └── project-vision.md
│
├── .gitignore
└── README.md
```

## 💾 Data Storage and Privacy

StudyFlow currently uses browser Local Storage to save tasks and goals.

- No account or sign-in system is currently implemented.
- Data is stored locally in the browser.
- Data is not synchronized between devices.
- Clearing browser site data may remove saved information.

Do not enter confidential or sensitive personal information.

## 🔭 Future Development

Planned improvements include:

- AI-powered personalized study plans.
- AI-generated quizzes and flashcards.
- Intelligent note summarization.
- Improved analytics and progress tracking.
- Additional accessibility and usability improvements.

These are planned features, not claims about current functionality.

## 👨‍💻 Project Information

StudyFlow is an independently developed student project focused on improving academic organization through accessible technology.

**Developer:** Jasdeep Singh

**GitHub:** https://github.com/js0628174-afk

**Project status:** Working prototype under active development.
