// selectors
const todoButton = document.querySelector(".todo-button") ;
const todoInput  = document.querySelector(".todo-input") ; 
const todoList = document.querySelector(".todo-list")  ; 
const todoOption = document.querySelector(".filter-todo") ;

//EventListener
document.addEventListener('DOMContentLoaded',getTodos) ;
todoButton.addEventListener("click" , createdDiv) ; 
todoList.addEventListener("click" , deleteCheck) ;
todoOption.addEventListener("click" , todo_Filter) ;
//functions
function createdDiv(event) {
    event.preventDefault(); 

    // create the Div

    const todoDiv = document.createElement("div") ; 
    todoDiv.classList.add("todo") ;


    saveTodos(todoInput.value) ; 
    // create li 

    const todoItem = document.createElement("li") ; 
    todoItem.innerText = todoInput.value ; 
    todoItem.classList.add("todo-item") ; 

    todoDiv.appendChild(todoItem) ; 

    // create the check button
    const completeButton = document.createElement("button") ;
    completeButton.innerHTML = '<li class="fa fa-check"></i>' ; 
    completeButton.classList.add("complete-btn") ; 
    todoDiv.appendChild(completeButton) ;

    // create the trash button
    const trash = document.createElement("button") ; 
    trash.innerHTML = '<li class="fa fa-trash"></li>' ; 
    trash.classList.add("trash-btn") ; 

    todoDiv.appendChild(trash) ;

    // Add todoDiv to ul list
    todoList.appendChild(todoDiv) ; 

    // remove the input value

    todoInput.value ="" ; 
}


function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        deleteLocalItems(todo) ; 
        todo.classList.toggle("full") ; 
        todo.addEventListener("transitionend", ()=> {
            todo.remove();
        })
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement ; 
        todo.classList.toggle("complete")  ;
    }
}    


function todo_Filter(e) {
    const todos = todoList.childNodes ; 

    todos.forEach(todo => {
        switch(e.target.value) {
            case "all" :
                todo.style.display = "flex" ;
                break;

            case "completed" :
                
                if(todo.classList.contains("complete")) {
                    todo.style.display = "flex" ;
                }

                else {
                    todo.style.display = "none" ;
                }
                break;
                

            case "uncompleted" :
                
                if( !todo.classList.contains("complete")) {
                    todo.style.display = "flex" ; 
                }

                else {
                    todo.style.display = "none" ;
                }

                break;


        }
    })
}


function saveTodos(todo) {
    let todos ;

    if(localStorage.getItem("todos") === null) {
        todos =[] ;
    }

    else {
        todos = JSON.parse(localStorage.getItem('todos')) ; 

    }

    todos.push(todo) ;

    localStorage.setItem('todos' , JSON.stringify(todos)) ;
}

function  getTodos() {
    // create the Div
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos =[] ;
    }

    else {
        todos = JSON.parse(localStorage.getItem("todos")) ; 
    }

    todos.forEach(todo => {
        const todoDiv = document.createElement("div") ; 
    todoDiv.classList.add("todo") ;


    
    // create li 

    const todoItem = document.createElement("li") ; 
    todoItem.innerText = todo; 
    todoItem.classList.add("todo-item") ; 

    todoDiv.appendChild(todoItem) ; 

    // create the check button
    const completeButton = document.createElement("button") ;
    completeButton.innerHTML = '<li class="fa fa-check"></i>' ; 
    completeButton.classList.add("complete-btn") ; 
    todoDiv.appendChild(completeButton) ;

    // create the trash button
    const trash = document.createElement("button") ; 
    trash.innerHTML = '<li class="fa fa-trash"></li>' ; 
    trash.classList.add("trash-btn") ; 

    todoDiv.appendChild(trash) ;

    // Add todoDiv to ul list
    todoList.appendChild(todoDiv) ; 

    // remove the input value

    todoInput.value ="" ;
    })
}

function deleteLocalItems(todo) {
    let todos ; 
    if(localStorage.getItem("todos") === null) {
        todos=[] ;

    }

    else {
        todos = JSON.parse(localStorage.getItem("todos")) ;
    }

    const todoIndex = todo.children[0].innerText ; 

    todos.splice(todos.indexOf(todoIndex) , 1 ) ; 

    localStorage.setItem("todos" , JSON.stringify(todos)) ; 
}