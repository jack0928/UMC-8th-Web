const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

interface Todo {
    id: string;
    task: string;
    isDone: boolean;
}

// Todo 배열
let todos: Todo[] = [];

const addTodo = (): void => {
    const newTodo: Todo = {
        id: new Date().toTimeString(),
        task: todoInput.value, // toString()으로 하면 object HTMLInputElement로 출력됨  
        isDone: false
    };
    todos.push(newTodo);
    renderTodos();
};

const renderTodos = (): void => {
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
