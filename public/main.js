class Project {
    constructor (text) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.text = text
        this.doing = "Active ✅"
    }
}

const state = {
    projects: []
}

const view = (state) => `
    <section>
        <h1>Projects</h1>
<section>
   ${state.projects.map(project => `<section class="project"><label id="log">${project.text}</label> 
    <button onclick="app.run('doing', ${project.id} )" >${project.doing}</button> 
        <button onclick="app.run('delete', ${project.id} )" >❌</button> 
        <button onclick="app.run('showEdit', ${project.id} )" >Hide Project Edit</button>
        <form id="${project.id}" type="hidden"><input  name="projectName" placeholder="Edit name here"><button onclick="app.run('showEdit', ${project.id} )" >Confrim Edit</button></form>
            <br>
</section>`).join("")}
        </section>
    </section>
    <section>
        <form onsubmit="app.run('add', this);return false;">
            <input name="text" placeholder="Add project" />
            <button>Add</button>
        </form>
    </section>
`
const update = {
    add: async (state, form) => {
        console.log(state)
        const data = new FormData(form)
        const project = new Project(data.get('text'))
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }
        fetch('/projects', postRequest).then(() => app.run('getProjects'))
        //state.projects.push(project)
        return state
    },

    delete: (state, id) => {
        var index = 0
        var count = 0

        console.log(id)

        state.projects.forEach(project => {
            console.log(project.id)
            if (id == project.id) {
                index = count
            }
            count = count + 1
        })
        
        console.log(index)
        fetch(`/projects/${id}/delete`)
        state.projects.splice(index,1)

        return state
    },

    doing: (state, id) => {
        var index = 0
        var count = 0

        console.log(id)

        state.projects.forEach(project => {
            console.log(project.id)
            if (id == project.id) {
                index = count
            }
            count = count + 1
        })

        if (state.projects[index].doing === "Inactive 😢") {
            state.projects[index].doing = "Active ✅"
        }
        else {
            state.projects[index].doing = "Inactive 😢"
        }

        return state 
    },

    showEdit: (state, id, form) => {
        var x = document.getElementById(id)
        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        },

    getProjects: async (state) => {
        state.projects = await fetch('/projects').then(res => res.json())
        return state
    }


}

app.start('KanbanProject', state, view, update)
app.run('getProjects')

