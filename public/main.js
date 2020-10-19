class Project {
    constructor(text) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.text = text
        this.doing = "Undefined"
    }
}

const state = {
    projects: []
}

const view = (state) => `
    <div class="div1">
<div class="div2">

   ${state.projects.map(project => `<div class="project"><ul>
   <li id="log">${project.text}
        <button onclick="app.run('delete', ${project.id} )" >❌</button> 
        <button onclick="app.run('showEdit', ${project.id} )" >📝</button>
        <form onsubmit="app.run('edit', ${project.id}, this ); return false" id="${project.id}" type="hidden"><input  name="text" placeholder="Edit name here">
        <button >Confrim Edit</button></form>
        <a href="/projects/${project.id}/project.html">Visit Project</a>
        </li>
        <ul>
            <br>
</div>`).join("")}
        </div>
    </div>
    <div class="div3">
        <form onsubmit="app.run('add', this);return false;">
            <input name="text" placeholder="Add project" />
            <button>Add</button>
        </form>
    </div>
    
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
        state.projects.splice(index, 1)

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
        /*
        if (state.projects[index].doing === "Inactive 😢") {
            state.projects[index].doing = "Active ✅"
        }
        else {
            state.projects[index].doing = "Inactive 😢"
        }*/

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

    edit: async (state, id, form) => {
        const project = state.projects.find(project => {
           return project.id == id
        })
        const data = new FormData(form)
        project.text = data.get("text")
        console.log(project)
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }
        fetch(`/projects/${id}/edit`, postRequest).then(() => app.run('getProjects'))
        return state
    },

    getProjects: async (state) => {
        state.projects = await fetch('/projects').then(res => res.json())
        return state
    }


}

app.start('KanbanProject', state, view, update)
app.run('getProjects')

