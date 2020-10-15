class Project {
}
const state = {
    projects: [],
    dragging: null
}

const viewProject = project => {
    return `<li
    id="${project.id}"
    draggable="true"
        onclick="app.run('done', ${project.id})"
        ondragstart="app.run('onDragProject', event)
        class="${project.status === 0 ? '' : 'done'}"
        >${project.text}
    </li>`
}
const view = (state) => `
    <section>
        <h1>Projects</h1>
       
        <ul>
         ${state.projects.map(project => `<li>${project.text}</li>`).join("")} ${state.projects.map(project => {
            if (project.status === 0){
                return `<button onclick="app.run('done', ${project.id})">✅</button>`
            } else {
                return `<button onclick="app.run('delete', ${project.id})">❌</button>`
            }
        })}
    </ul>
   
    </section>
    <section>
        <form onsubmit="app.run('add', this);return false;">
            <input name="project" placeholder="add a project" required/>
            <button class="addBtn">Add</button>
        </form>
     
    </section>
`
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        const project = {
            id: window.crypto.getRandomValues(new Uint8Array(3)).join(""),
            text: data.get('project'),
            status: 0
        }
        state.projects.push(project)
        return state
    },
    done: (state, id) => {
        const project = state.projects.find(project => {
            return project.id == id
        })
        project.status = 1
        console.log(project) 
        return state
    },
    delete: (state, id) => {
        const project = state.projects.findIndex(project => {
            return project.id == id
        })
        state.projects.splice(project, 1)
        return state
    }
}



app.start('KanbanProject', state, view, update)