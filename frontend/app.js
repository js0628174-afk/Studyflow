// ===============================
// STUDYFLOW AI
// Main JavaScript File
// Version 1.0
// ===============================

let tasks = [];
let goals = [];

// ---------- TASKS ----------

function addTask() {

    const input = document.getElementById("taskInput");

    const text = input.value.trim();

    if(text === ""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    input.value="";

    renderTasks();

    updateDashboard();

}

function renderTasks(){

    const list=document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.textContent=task.text;

        if(task.completed){

            li.style.textDecoration="line-through";

        }

        const done=document.createElement("button");

        done.textContent="✓";

        done.onclick=function(){

            tasks[index].completed=true;

            renderTasks();

            updateDashboard();

        };

        const remove=document.createElement("button");

        remove.textContent="🗑";

        remove.onclick=function(){

            tasks.splice(index,1);

            renderTasks();

            updateDashboard();

        };

        li.appendChild(done);

        li.appendChild(remove);

        list.appendChild(li);

    });

}

// ---------- GOALS ----------

function addGoal(){

    const input=document.getElementById("goalInput");

    const text=input.value.trim();

    if(text===""){

        alert("Please enter a goal.");

        return;

    }

    goals.push(text);

    input.value="";

    renderGoals();

}

function renderGoals(){

    const list=document.getElementById("goalList");

    list.innerHTML="";

    goals.forEach((goal,index)=>{

        const li=document.createElement("li");

        li.textContent=goal;

        const remove=document.createElement("button");

        remove.textContent="🗑";

        remove.onclick=function(){

            goals.splice(index,1);

            renderGoals();

        };

        li.appendChild(remove);

        list.appendChild(li);

    });

}

// ---------- DASHBOARD ----------

function updateDashboard(){

    const completed=tasks.filter(task=>task.completed).length;

    const pending=tasks.length-completed;

    document.getElementById("completedCount").textContent=completed;

    document.getElementById("pendingCount").textContent=pending;

}
