// Model
const model = {
  todos: [],

  addTodo: function (todo) {
    this.todos.push(todo);
    this.orderList();
  },

  orderList: function () {
    this.todos.sort((a, b) => {
      function editValue(value) {
        return value.toLowerCase();
      }

      if (editValue(a.value) < editValue(b.value)) {
        return -1;
      } else if (editValue(a.value) < editValue(b.value)) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  finishTodo: function (todo) {
    newTodoList = this.todos.map((element) => {
      if (element.id === todo.id) {
        element.finish = !element.finish;
        if (element.finish) {
          view.checkTodo(element.id);
        } else {
          view.removeCheckTodo(element.id);
        }
      }
      return element;
    });
    this.todos = newTodoList;
  },

  editTodo: function (todo, inputValue) {
    this.todos.forEach((element) => {
      if (element.id === todo.id && inputValue.trim() !== "") {
        element.value = inputValue;
      }
    });
    this.orderList();
    view.removeAllTodos();
  },

  removeCheckTodo: function (todo) {
    newTodoList = this.todos.map((element) => {
      if (element.id === todo.id) {
        element.finish = false;
        view.removeCheckTodo(element.id);
      }
      return element;
    });
    this.todos = newTodoList;
  },

  removeTodo: function (id) {
    newTodoList = this.todos.filter(function (todo) {
      if (todo.id === id) {
        view.removeTodo(todo);
      }
      return todo.id !== id;
    });
    this.todos = newTodoList;
  },
};

// View
const view = {
  todoApp: document.getElementById("app"),
  todoList: document.getElementById("todo-list"),

  renderTodo: function (todo) {
    const todoItem = document.createElement("li");
    todoItem.id = todo.id;

    const todoText = document.createElement("span");
    todoText.textContent = todo.value;

    const buttonCheck = this.createButton(
      "./assets/check.png",
      "Check Image",
      "action-button check-button"
    );
    buttonCheck.addEventListener("click", () => {
      controller.checkTodo(todo);
    });

    const buttonEdit = this.createButton(
      "./assets/edit.png",
      "Edit Image",
      "action-button edit-button"
    );
    buttonEdit.addEventListener("click", () => {
      controller.editTodo(todo);
    });

    const buttonDelete = this.createButton(
      "./assets/delete.png",
      "Delete Image",
      "action-button delete-button"
    );
    buttonDelete.addEventListener("click", () => {
      controller.deleteTodo(todo.id);
    });

    todoItem.append(todoText, buttonCheck, buttonEdit, buttonDelete);
    
    this.todoList.appendChild(todoItem);

    if (todo.finish === true) {
      this.checkTodo(todo.id);
    }
  },

  createButton: function (imgSrc, imgAlt, className) {
    const button = document.createElement("button");
    const image = document.createElement("img");
    image.src = imgSrc;
    image.alt = imgAlt;
    button.appendChild(image);
    button.className = className;

    return button;
  },

  renderAllTodos: function () {
    model.todos.forEach((todo) => {
      this.renderTodo(todo);
    });
  },

  checkTodo: function (id) {
    const todoItem = document.getElementById(id);
    todoItem.firstChild.className = "todo-checked";
  },

  removeCheckTodo: function (id) {
    const todoItem = document.getElementById(id);
    todoItem.firstChild.className = "todo-not-checked";
  },

  removeTodo: function (todo) {
    const todoRemove = document.getElementById(todo.id);
    this.todoList.removeChild(todoRemove);
  },

  removeAllTodos: function () {
    while (this.todoList.childElementCount !== 0) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    this.renderAllTodos();
  },
};

// Controller
const controller = {
  count: 1,

  todoForm: document.getElementById("todo-form"),

  todoInput: document.getElementById("todo-input"),

  init: function () {
    this.todoForm.addEventListener("submit", (event) => this.addTodo(event));
  },

  addTodo(event) {
    event.preventDefault();
    const todo = {
      id: this.count,
      value: this.todoInput.value,
      finish: false,
    };
    if (todo.value.trim() !== "") {
      model.addTodo(todo);
      view.removeAllTodos();

      this.todoInput.value = "";
      return this.count++;
    }
  },

  checkTodo(todo) {
    model.finishTodo(todo);
  },

  editTodo(todo) {
    model.editTodo(todo, this.todoInput.value);
    this.todoInput.value = "";
  },

  deleteTodo(id) {
    model.removeTodo(id);
  },
};

controller.init();
