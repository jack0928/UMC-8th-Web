"use strict";
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTodos = [];
const addTodo = () => {
    const newTodo = {
        id: new Date().toTimeString(),
        task: todoInput.value,
        isDone: false
    };
    todos.push(newTodo);
    renderTodos();
};
const doTodo = (todoId) => {
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index === -1)
        return;
    const completedTodo = todos.splice(index, 1)[0];
    if (!completedTodo)
        return;
    completedTodo.isDone = true;
    doneTodos.push(completedTodo);
    renderTodos();
    renderDoneTodos();
};
const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.classList.add("complete-button");
        completeButton.addEventListener("click", () => doTodo(todo.id));
        li.appendChild(taskText);
        li.appendChild(completeButton);
        todoList.appendChild(li);
    });
};
const renderDoneTodos = () => {
    doneList.innerHTML = "";
    doneTodos.forEach(todo => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;
        taskText.style.textDecoration = "line-through";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-button");
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        doneList.appendChild(li);
    });
};
addButton.addEventListener("click", addTodo);
