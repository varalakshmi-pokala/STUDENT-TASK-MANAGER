async function loadTasks() {
    const res = await fetch("/tasks");
    const tasks = await res.json();

    let list = document.getElementById("taskList");
    let noTasksMsg = document.getElementById("noTasksMsg");

    list.innerHTML = "";

    if (tasks.length === 0) {
        noTasksMsg.style.display = "block";
        return;
    } else {
        noTasksMsg.style.display = "none";
    }

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "task-item";

        let spanText = document.createElement("span");
        spanText.className = "task-text";
        spanText.textContent = task.text;

        let actions = document.createElement("div");
        actions.className = "task-actions";

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(delBtn);
        li.appendChild(spanText);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskText");
    const text = input.value.trim();

    if (!text) return;

    await fetch("/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id: Date.now(), text })
    });

    input.value = "";
    loadTasks();
}

async function deleteTask(id) {
    await fetch("/tasks/" + id, { method: "DELETE" });
    loadTasks();
}

loadTasks();
