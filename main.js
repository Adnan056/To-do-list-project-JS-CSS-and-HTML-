const inputBox = document.getElementById("input-box");
const list = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert("You must write something!");
    } else {
        const li = document.createElement("li");
        li.textContent = taskText;
        list.appendChild(li);
        inputBox.value = '';
        saveData();
        const span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
    }
}

list.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    } else if (event.target.tagName === "SPAN") {
        // Remove the parent LI element (the task) when the span is clicked
        event.target.parentElement.remove();
        // After removing the task, update the stored tasks in localStorage
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", list.innerHTML);
}

function showTask() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        list.innerHTML = storedTasks;
        // After setting the tasks from localStorage, recreate delete buttons
        const deleteButtons = list.querySelectorAll("li span");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                button.parentElement.remove();
                saveData(); // Update localStorage after removing the task
            });
        });
    }
}

showTask();