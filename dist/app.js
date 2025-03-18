"use strict";
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
let todos = [];
const addTodo = () => {
    const newTodo = {
        id: new Date().toTimeString(),
        task: todoInput.value,
        isDone: false
    };
    todos.push(newTodo);
    renderTodos();
};
const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo.task} 
            <button id="complete-button" onclick="deleteTodo(${todo.id})">완료</button>
        `;
        todoList.appendChild(li);
    });
};
addButton.addEventListener("click", addTodo);
