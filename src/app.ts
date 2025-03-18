const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

interface Todo {
    id: string;
    task: string;
    isDone: boolean;
}

// Todo 배열
let todos: Todo[] = [];
let doneTodos: Todo[] = []

const addTodo = (): void => {
    const newTodo: Todo = {
        id: new Date().toTimeString(),
        task: todoInput.value, // toString()으로 하면 object HTMLInputElement로 출력됨  
        isDone: false
    };
    todos.push(newTodo);
    renderTodos();
};

const doTodo = (todoId: string): void => {
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index === -1) return; // 해당 ID가 없으면 함수 종료 -> typescript라 이 과정이 없으면 실행 불가

    const completedTodo = todos.splice(index, 1)[0];
    if (!completedTodo) return; // undefined인 경우 실행하지 않음

    completedTodo.isDone = true;
    doneTodos.push(completedTodo);
    renderTodos();
    renderDoneTodos();
};

const renderTodos = (): void => {
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");

        // 할 일 텍스트 컨테이너
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;

        // 완료 버튼 생성
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.classList.add("complete-button");
        completeButton.addEventListener("click", () => doTodo(todo.id));

        li.appendChild(taskText);
        li.appendChild(completeButton); // 버튼 추가
        todoList.appendChild(li);
    });
};

const renderDoneTodos = (): void => {
    doneList.innerHTML = ""; // 기존 완료 리스트 초기화

    doneTodos.forEach(todo => {
        const li = document.createElement("li");

        // 완료된 할 일 텍스트
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;
        taskText.style.textDecoration = "line-through"; // 완료 표시

        // 삭제 버튼 생성
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-button");
        //deleteButton.addEventListener("click", () => deleteDoneTodo(todo.id));

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        doneList.appendChild(li);
    });
};

addButton.addEventListener("click", addTodo);
