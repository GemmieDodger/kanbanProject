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
</div>`


app.start('KanbanProject', state, view, update)