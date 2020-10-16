  











//above for users



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
    >${task.text} 
        <button class="deleteButton" onclick="app.run('deleteTask', ${task.id})">Delete</button>
    </li>
    `
    }
// const viewDoingTask = task => {
//     //split into a new function to show the viewing of task
//     return `<li
//     id="${task.id}"
//     draggable="true" 
//     onclick="app.run('done', ${task.id})"
//     ondragstart="app.run('onDragTask', event)"
//     >${task.text}
//         <button class="deleteButton" onclick="app.run('deleteTask', ${task.id})">Delete</button>
//     </li>
//     `
// }
// const viewDoneTask = task => {
//     //split into a new function to show the viewing of task
//     return `<li
//     id="${task.id}"
//     draggable="true" 
//     onclick="app.run('done', ${task.id})"
//     ondragstart="app.run('onDragTask', event)"
//     >${task.text}
//         <button class="deleteButton" onclick="app.run('deleteTask', ${task.id})">Delete</button>
//     </li>
//     `
// }

const view = (state) => 
     `<section>
        <h2>To do list</h2>
        <ul>
            ${state.toDoTasks.map(viewTask).join("")}
        </ul>
        <form onsubmit="app.run('add', this);return false;">
            <input name="task" placeholder="add a task" />
            <button class="addButton">Add</button>
        </form>  
    </section>
    <section >
        <h2>Doing</h2>
        <ul>
            ${state.doingTasks.map(viewTask).join("")}
        </ul>
    </section>
    <section >
        <h2>Done</h2>
        <ul>
            ${state.doneTasks.map(viewTask).join("")}
        </ul>
        <button>Delete</button>
        <div class="deleteOnHover" ondragover="event.preventDefault()" ondrop="app.run('onDropDeleteTask', event)">Delete</div>  
    </section>
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
        state.doneTasks.splice(index,1)
        return state
    },

    onDragTask:  (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },

    onDropDeleteTask: (state, event) => { //THIS IS WORKING
        const id = event.dataTransfer.getData('text')
        console.log(id)
        const index = state.doneTasks.findIndex(task => task.id == id)
        state.doneTasks.splice(index,1)
        return state
    },
    getTasks: async (state) => {

        state.toDoTasks = await fetch('/toDoTasks').then(res => res.json())
        // console.log("to do")
        // console.log(state.toDoTasks)
        // console.log("tdoing")
        // console.log(state.doingTasks)
        // console.log("done")
        // console.log(state.doneTasks)
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
    }

}


app.start('listView', state, view, update)
app.run('getAllTasks')