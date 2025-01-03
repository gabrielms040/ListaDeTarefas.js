const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.textContent = 'Concluir';
        completeButton.onclick = () => completeTask(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteTask(deleteButton);

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        li.innerHTML = `<span>${taskText}</span>`;
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
        taskInput.value = '';

        // Salva a tarefa no localStorage
        saveTasks();
    } else {
        alert('Por favor, digite uma tarefa.');
    }
}

// Função para excluir tarefa
function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
    saveTasks(); // Salva após a exclusão
}

// Função para marcar tarefa como concluída
function completeTask(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    saveTasks(); // Salva após marcar como concluída
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    
    taskItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Salva no localStorage
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
        savedTasks.forEach(task => {
            const li = document.createElement('li');
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const completeButton = document.createElement('button');
            completeButton.classList.add('complete');
            completeButton.textContent = 'Concluir';
            completeButton.onclick = () => completeTask(completeButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => deleteTask(deleteButton);

            buttonContainer.appendChild(completeButton);
            buttonContainer.appendChild(deleteButton);

            li.innerHTML = `<span>${task.text}</span>`;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.appendChild(buttonContainer);
            taskList.appendChild(li);
        });
    }
}

// Carregar tarefas ao carregar a página
window.addEventListener('load', loadTasks);

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
