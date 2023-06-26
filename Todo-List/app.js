// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptionElement = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOptionElement.addEventListener('click',filterOption);
document.addEventListener('DOMContentLoaded',getTodos);

// Function
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //Add Todo To Localstorage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML= '<i class="fa-solid fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Check Trash Button
    const TrashButton = document.createElement('button');
    TrashButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
    TrashButton.classList.add('trash-btn');
    todoDiv.appendChild(TrashButton);
    //Append To List
    todoList.appendChild(todoDiv);
    //Clear Todo Input Value
    todoInput.value = '';

}

function deleteCheck(event){
    const item = event.target;
    const todo = item.parentElement;
    //Delete Todo
    if (item.classList[0] === 'trash-btn'){
        const liParent = item.parentElement;
        //Animation
        liParent.classList.add('fall');
        removeLocalStorage(todo);
        liParent.addEventListener('transitionend',function(){
            liParent.remove();
        })
    }
    //Check Mark
    if(item.classList[0] === 'complete-btn'){
        const liparent = item.parentElement;
        liparent.classList.toggle('completed');
    }
}

function filterOption (event){
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break; 
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display= 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
  
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
      if (!Array.isArray(todos)) {
        todos = [];
      }
    }
  
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
 
  function getTodos(){
    let todos;

    
    if (localStorage.getItem('todos') === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        if (!Array.isArray(todos)) {
          todos = [];
        }
      }

      todos.forEach(function(todo){
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        //Check Mark Button
        const completeButton = document.createElement('button');
        completeButton.innerHTML= '<i class="fa-solid fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        //Check Trash Button
        const TrashButton = document.createElement('button');
        TrashButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
        TrashButton.classList.add('trash-btn');
        todoDiv.appendChild(TrashButton);
        //Append To List
        todoList.appendChild(todoDiv);
      })
  }

  function removeLocalStorage(todo){

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        if (!Array.isArray(todos)) {
          todos = [];
        }
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoInput),1);
      localStorage.setItem('todos',JSON.stringify(todos));
  }