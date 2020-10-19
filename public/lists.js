class Task {
    constructor(text){
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join(""),
        this.text = text,
        this.status = 0
    }
}

const state = {
    toDoTasks : [],
    doingTasks : [],
    doneTasks : [],
    users: [],
    dragging: null
}

const viewTask = task => {
    //split into a new function to show the viewing of task
    return `<li
    id="${task.id}"
    draggable="true" 
    onclick="app.run('done', ${task.id})"
    ondragstart="app.run('onDragTask', event)"
    class="${task.status === 0 ? '' : 'done'}"
    >${task.text} ${task.status === 1 ? `<button class="deleteButton" onclick="app.run('deleteTask', ${task.id})">Delete</button>` 
    : ''} 
    <div class="dropUser" style="border-style: dashed blue 1px;" ondragover="event.preventDefault()" ondrop="app.run('onDropUser', event)"><h4>drop user</h4></div>   
    </li>
    `
    }


const view = (state) => 
     `<div id="lists">
     <section id="toDoList" >
        <h2 class="listHeader">To do list</h2>
        <ul class="taskLists"  ondragover="event.preventDefault()" ondrop="app.run('onDropTask', event)">
            ${state.toDoTasks.map(viewTask).join("")}
        </ul>
        <form onsubmit="app.run('add', this);return false;">
            <input name="task" id="taskInput" placeholder="add a task" />
            <button class="addButton">Add</button>
        </form>  
    </section>
    <section  id="doingList" >
        <h2 class="listHeader">Doing</h2>
        <ul class="taskLists"ondragover="event.preventDefault()" ondrop="app.run('onDropDoingTask', event)">
            ${state.doingTasks.map(viewTask).join("")}
        </ul>
    </section>
    <section id="doneList" >
        <h2 class="listHeader">Done</h2>
        <ul class="taskLists" ondragover="event.preventDefault()" ondrop="app.run('onDropDoneTask', event)">
            ${state.doneTasks.map(viewTask).join("")}
        </ul>
        <div class="deleteOnHover" ondragover="event.preventDefault()" ondrop="app.run('onDropDeleteTask', event)">Delete</div>
        </section>
    </div>
    `


const update = {
    add: async (state, form) => {
        const data = new FormData(form)
        const task = new Task(data.get('task'))
      
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
        console.log("new task")
        console.log(task) //this is right
        console.log("to do list tasks")
        console.log(state.toDoTasks) //this is right
        fetch('/toDoTasks', postRequest).then(() => app.run('getTasks'))
        return state
    },

    deleteTask: (state, id) => {
        const index = state.doneTasks.findIndex(element=> element.id === id)
        //fetch(`/doneDasks/${id}/delete`)
        state.doneTasks.splice(index,1)
        return state
    },

    onDragTask:  (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },

    // onDropTask(state, event) {
    //     const id = event.dataTransfer.getData('text')
    //     const indexDoing = state.doingTasks.findIndex(task=> task.id === id)
    //     const indexDone = state.doneTasks.findIndex(task => task.id === id)
    //     console.log('on drop')
    //     console.log(id)
    //     console.log(indexDoing)
    //     console.log(indexDone)
    //     if(indexDoing) {
    //         const task = state.doneTasks.find(task => task.id == id)
    //         state.doneTasks.splice(indexDone,1)
    //         state.toDoTasks.push(task)
    //         console.log(doneTasks)
    //         console.log('to do')
    //         console.log(toDoTasks)
    //     } else {
    //         const task = state.doingTasks.find(task => task.id == id)
    //         state.doingTasks.splice(index,1)         
    //         state.toDoTasks.push(task)
    //         console.log(doneTasks)
    //         console.log('to do')
    //         console.log(toDoTasks)

    //     }
  
    //     return state
    // },
    onDropDoingTask(state, event) {
        const id = event.dataTransfer.getData('text')
        const index = state.toDoTasks.findIndex(task=> task.id === id)
        const task = state.toDoTasks.find(task => task.id == id)
        state.toDoTasks.splice(index,1)
        state.doingTasks.push(task)
        return state
    },
    onDropDoneTask(state, event) {
        const id = event.dataTransfer.getData('text')
        const index = state.doingTasks.findIndex(task=> task.id === id)
        const task = state.doingTasks.find(task => task.id == id)
        task.status = 1
        state.doingTasks.splice(index,1)
        state.doneTasks.push(task)
        return state
    },

    onDropDeleteTask: (state, event) => { 
        const id = event.dataTransfer.getData('text')
        console.log(id)
        const index = state.doneTasks.findIndex(task => task.id == id)
        state.doneTasks.splice(index, 1)
        return state
    },
    getTasks: async (state) => {

        state.toDoTasks = await fetch('/toDoTasks').then(res => res.json())
        return state
    },
    getAllTasks: async (state) => {
        state.toDoTasks = await fetch('/toDoTasks').then(res => res.json())
        state.doingTasks = await fetch('/doingtasks').then(res => res.json())
        state.doneTasks = await fetch('/doneTasks').then(res => res.json())
        return state
    },

    addTasks: (state, toDoTasks) => { 
        state.toDoTasks = {...state.toDoTasks, ...toDoTasks}
        console.log(toDoTasks)
        return state //three dots remove from array concats to antoher array
    },
    onDropUser(state, event) {
        const id = event.dataTransfer.getData('name')
        const index = state.users.findIndex(user=> user.id === id)
        const user = state.users.find(task => task.id == id)
        state.users.push(task)
        return state
    }

}


//user

class User {
    constructor(name, image){
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join(""),
        this.name = name,
        this.image = image
    }
}


const viewUser = user => {
    //split into a new function to show the viewing of task
    return `<li
    id="${user.id}"
    draggable="true" 
    onclick="app.run('done', ${user.id})"
    ondragstart="app.run('onDragTask', event)"
    class=""
    ><img style="width: 30px; height: 30px; border-radius: 20px;" src="${user.image}" alt="user image"></img>${user.name} 
    </li>
    `
    }


const userView = (state) => 
     `<section>
        <h2>Users</h2>
        <ul>
            ${state.users.map(viewUser).join("")}
        </ul>
        <form onsubmit="app.run('add', this);return false;">
            <input name="user" type="text" required placeholder="add a user" />
            <input name="image" type="text" required placeholder="add an image" />
            <button class="addButton">Add</button>
        </form>  
    </section>
    `


const updateUser = {
    add: async (state, form) => {
        const data = new FormData(form)
        const user = new User(data.get('user'))
      
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch('/users', postRequest).then(() => app.run('getUsers'))
        return state
    },

    deleteUser: (state, id) => {
    
        const index = state.users.findIndex(user=> user.id === id)
        state.users.splice(index,1)
        return state
    },

    onDragTask:  (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },

    // onDropDeleteTask: (state, event) => { //THIS IS WORKING
    //     const id = event.dataTransfer.getData('text')
    //     console.log(id)
    //     const index = state.doneTasks.findIndex(task => task.id == id)
    //     state.doneTasks.splice(index,1)
    //     return state
    // },
    getUsers: async (state) => {
        state.users = await fetch('/users').then(res => res.json())
        return state
    },
    // getAllTasks: async (state) => {
    //     state.toDoTasks = await fetch('/toDoTasks').then(res => res.json())
    //     state.doingTasks = await fetch('/doingtasks').then(res => res.json())
    //     state.doneTasks = await fetch('/doneTasks').then(res => res.json())
    //     return state
    // },

    addTasks: (state, users) => { 
        state.users = {...state.users, ...users}
        // console.log(toDoTasks)
        return state //three dots remove from array concats to antoher array
    }

}



app.start('listView', state, view, update)
app.run('getAllTasks')


app.start('userView', state, userView, updateUser)
app.run('getUsers')