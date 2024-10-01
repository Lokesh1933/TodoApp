const todoform = document.querySelector('form')
const todoinput = document.getElementById('todo-input')
const todoListUL = document.getElementById('todo-list')

let allTodos = getTodos()
updateTodoList()

todoform.addEventListener('submit',function(event){
    event.preventDefault() //to prevent page to reload after pressing enter or adding todo
    addTodo()
})
function addTodo(){
    const todotext = todoinput.value.trim()
    const todoObject = {
        text: todotext,
        completed: false
    }
    if(todotext.length > 0){
        allTodos.push(todoObject)
        updateTodoList()
        savetodos()
        todoinput.value = ""
    }
    
    
}
function updateTodoList(){
    todoListUL.innerHTML = ""
    allTodos.forEach((todo,todoindex) => {
        todoItem = createTodoItem(todo,todoindex)
        todoListUL.append(todoItem)
    })
}
function createTodoItem(todo,todoindex){
    const todoId = "todo-"+todoindex 
    const todoLI = document.createElement("li")
    const todotext = todo.text
    todoLI.className = "todo"
    todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todotext}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>`
    const deleteButton = todoLI.querySelector(".delete-button")   
    deleteButton.addEventListener("click",()=>{
        deleteTodoItem(todoindex)
    }) 
    const checkbox = todoLI.querySelector("input")
    checkbox.addEventListener("change",()=>{
        allTodos[todoindex].completed = checkbox.checked
        savetodos()
    })  
    checkbox.checked = todo.completed     
    return todoLI
}
function deleteTodoItem(todoindex){
    allTodos = allTodos.filter((_,i)=> i!== todoindex)
    savetodos()
    updateTodoList()
}

function savetodos(){
    const todosJson = JSON.stringify(allTodos) //convert array into json string for storing
    localStorage.setItem("todos",todosJson) //takes key and a value
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]"
    return JSON.parse(todos) //convert back to array
}