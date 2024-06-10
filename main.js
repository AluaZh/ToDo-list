const tasks= JSON.parse(localStorage.getItem('tasks',)) || [];

window.addEventListener('load', () => {
    const listStart = document.getElementById('list-start');
    if(tasks.length > 0){
        tasks.forEach(task => addTaskToDOM(task, listStart));
    } else{
        displayEmptyMessage(listStart);
    }
})

document.getElementById('container-btn').addEventListener('click', (event) => {
    // Остановить перезагрузку страницы
    event.preventDefault();

    const listStart = document.getElementById('list-start');
    const input = document.getElementById('container-input-add').value;
    
    if(input.trim() !== ''){
        // Удаляем индикатор "List is empty" при добавлении первого задания
        const emptyDiv = document.getElementById('list-start-empty');
        if(emptyDiv){
            listStart.removeChild(emptyDiv);
        }

        const newTask = {
            id: Date.now(),
            text: input,
            status: false,
        };

        // Добавляем задание в список
        addTaskToDOM(newTask, listStart);
        tasks.push(newTask);
        saveTasks();

        // Очишаем поле ввода
        document.getElementById('container-input-add').value = "";
    }
})

function addTaskToDOM(task, listStart){
    const taskDiv = document.createElement('div');
    taskDiv.className = 'list-gap';

    taskDiv.innerHTML = `
        <p id="${task.id}" class="list-gap-text" style="text-decoration: ${task.status ? 'line-through' : 'none'}; color: ${task.status ? 'rgb(197, 188, 188)' : 'black'};">${task.text}</p>
        <div class="list-gap-btn">
            <button class="list-gap-btn-yes">✓</button>
            <button class="list-gap-btn-no">Х</button>
        </div>
    `;

    listStart.appendChild(taskDiv);

    taskDiv.querySelector('.list-gap-btn-yes').addEventListener('click', () => {
        const textTesk = taskDiv.querySelector('.list-gap-text');
        textTesk.style.textDecoration = 'line-through';
        textTesk.style.color = 'rgb(197, 188, 188)';
    })
    
    taskDiv.querySelector('.list-gap-btn-no').addEventListener('click', () => {
        const textTesk = taskDiv.querySelector('.list-gap-text');
        textTesk.style.textDecoration = 'none';
        textTesk.style.color = 'black';
    })
}

document.getElementById('delete').addEventListener('click', (event) => {
    event.preventDefault();

    const listStart = document.getElementById('list-start');
    const tasksToDelete = [];

    listStart.querySelectorAll('.list-gap').forEach(taskDiv => {
        const textTask = taskDiv.querySelector('.list-gap-text');
        if(textTask.style.textDecoration == 'line-through'){
            tasksToDelete.push(taskDiv);
            tasks.splice(tasks.findIndex(task => task.id === parseInt(textTask.id)), 1);
        }
    });

    tasksToDelete.forEach(taskDiv => listStart.removeChild(taskDiv));
    saveTasks();

    if(listStart.childElementCount === 0) {
        displayEmptyMessage(listStart);
    }
});

function updateStatus(taskId, status) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if(taskIndex !== -1){
        tasks[taskIndex].status = status;
        saveTasks();
    }
}

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayEmptyMessage(listStart){
    if(!document.getElementById('list-start-empty')) {
        const emptyDiv = document.createElement('div');
        emptyDiv.id = 'list-start-empty';
        emptyDiv.innerHTML = `
            <img src="img/icons8-список-дел-64.png" alt="тут должна быть иконка">
            <p id="list-start-empty-text">The list is empty</p>
        `;
        listStart.appendChild(emptyDiv);
    }
}

window.addEventListener('load', () => {
    const listStart = document.getElementById('list-start');
    const emptyDiv = document.getElementById('list-start-empty');
    if (tasks.length > 0 && emptyDiv) {
        listStart.removeChild(emptyDiv);
    }
})