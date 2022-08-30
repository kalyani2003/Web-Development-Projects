const taskInput = document.querySelector(".input-task input"),
tBox =document.querySelector(".taskBox"),
clearAll =document.querySelector(".clear");
let  editID;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));
function showTodo() {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            li +=`<li class="alltasks">
                    <label for="${id}">
                        <input onclick="update(this)" type="checkbox" id="${id}">
                        <p>${todo.name}</p>
                    </label>
                    <div class="setting">
                        <i onclick="showMenu(this)" class="fa-solid fa-lines-leaning"></i>
                        <ul class="taskmenu">
                            <li onclick="editTask(${id},'${todo.name}')"> <i class="fa-solid fa-pen-fancy"></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class="fa-solid fa-eraser"></i> Delete</li>
                        </ul>
                    </div>
                   </li>`
    
        });
    }
    tBox.innerHTML = li;
}
showTodo();

function showMenu(choosentask){
    let taskMenu = choosentask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != choosentask){
            taskMenu.classList.remove("show");
        }
    });

}

function editTask(taskId,taskName){
    editID = taskId;
    isEditedTask = true; 
    taskInput.value = taskName;
}

function deleteTask(deleteID){
    todos.splice(deleteID,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo();
}

clearAll.addEventListener("click",() =>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo();

});

function update(choosentask){
    let nameOfTask = choosentask.parentElement.lastElementChild;
    if(choosentask.checked) {
        nameOfTask.classList.add("checked");
    }else{
        nameOfTask.classList.remove("checked");
    }
}

taskInput.addEventListener("keyup",e => {
    let userTask=taskInput.value.trim();
    if(e.key =="Enter" && userTask){
        if(!isEditedTask){
            if(!todos) {
                todos = [];
            }
            let taskinfo = {name:userTask}
            todos.push(taskinfo);
    
        }else{
            isEditedTask = false;
            todos[editID].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo();
    
    }
});