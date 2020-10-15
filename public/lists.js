










//above for users



class Task {
    constructor(text){
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join(""),
        this.text = text,
        this.status = 0
    }
}

const state = {
    tasks = [],
    dragging: null
}

const viewTask = task => {
    //split into a new function to show the viewing of task
    return `<li
    id="${task.id}"
    draggable="true" 
    onclick="app.run('done', ${task.id})"
    ondragstart="app.run('onDragTask', event)"
    >${task.text}
        <button class="deleteButton" onclick="app.run('deleteTask', ${task.id})">Delete</button>
    </li>
    `
}


const view = (state) => {
     `<section id="${list.id}">
        <h2>To do list</h2>
        <ul>
            ${state.tasks.map(viewTask).join("")}
        </ul>
        <form onsubmit="app.run('add', this);return false;">
            <input name="task" placeholder="add a task" />
            <button class="addButton">Add</button>
        </form>  
    </section>

    <section id="${list.id}">
        <h2>Doing</h2>
        <ul>
            ${state.tasks.map(viewTask).join("")}
        </ul>
    </section>

    <section id="${list.id}">
        <h2>Done</h2>
        <ul>
            ${state.tasks.map(viewTask).join("")}
        </ul>
        <button>Delete</button>
        <div class="deleteOnHover" ondragover="event.preventDefault()" ondrop="app.run('onDropDeleteInProcessTask', event)">Delete</div>  
    </section>
    `
}

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
        fetch('/tasks', postRequest).then(() => app.run('getTasks'))
        return state
    },

    deleteTask: (state, id) => {
    
        const index = state.tasks.findIndex(element=> element.id === id)
        state.tasks.splice(index,1)
        return state
    },

    onDragTask:  (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },

    onDropTask: (state, event) => {
        const id = event.dataTransfer.getData('text')
        console.log(id)
        const index = state.tasks.findIndex(task => task.id == id)
        state.tasks.splice(index,1)
        return state
    },
    getTasks: async (state) => {

        state.tasks = await fetch('/tasks').then(res => res.json())
        return state
    },

    addTasks: (state, tasks) => { 
        state.tasks = {...state.tasks, ...tasks}
        return state //three dots remove from array concats to antoher array
    }

}


app.start('listView', state, view, update)