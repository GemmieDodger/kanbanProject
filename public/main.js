const state = {
    projects: []
}

// instead of => { return our_html }
const view = (state) => `
    <header>Projects</header>
    <div>
    <form onsubmit="app.run('add', this);return false;">
        <input name="project" placeholder="Make a new project" />
        <button class="addBtn">Add</button>
    </form>
</div>
</div>
    <div class="row">
    <div class="column">
        <h1>project</h1>
        <ul>
            ${state.projects.map(task => `<li id="${task.id}" draggable="true" ondragstart="app.run('dragFromToDoTask', event)">${task.text}</li>`).join("")}
        </ul>
      </div>`

      const update = {
        add: (state, form) => {
            // access data in a form
            const data = new FormData(form)
            const task = {
                id: window.crypto.getRandomValues(new Uint8Array(3)).join(""),
                text: data.get('task'),
                status: 0
            }
            state.todotasks.push(task)
            return state
        }
    }
    

app.start('KanbanProject', state, view, update)