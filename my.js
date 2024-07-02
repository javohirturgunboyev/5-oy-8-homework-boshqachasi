const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');


document.addEventListener('DOMContentLoaded', function() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(todo) {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const todoText = input.value.trim();
    if (todoText !== '') {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <span class="todo-text">${todoText}</span>
            <div class="todo-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);

     
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newTodo = { text: todoText };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        input.value = '';
    }
});

todoList.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {

        const todoItem = target.parentNode.parentNode;
        const todoText = todoItem.querySelector('.todo-text').textContent;
        const todos = JSON.parse(localStorage.getItem('todos'));
        const updatedTodos = todos.filter(todo => todo.text !== todoText);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        todoItem.remove();
    } else if (target.classList.contains('edit-btn')) {
        const todoText = target.parentNode.previousElementSibling.textContent;
        const newText = prompt('Edit todo:', todoText);
        if (newText !== null && newText.trim() !== '') {
            target.parentNode.previousElementSibling.textContent = newText.trim();

            
            const todos = JSON.parse(localStorage.getItem('todos'));
            const updatedTodos = todos.map(todo => {
                if (todo.text === todoText) {
                    todo.text = newText.trim();
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
    }
});


window.addEventListener('beforeunload', function(event) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    if (todos.length > 0) {
        event.preventDefault();
        event.returnValue = '';
    }
});
