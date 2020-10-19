class Project {
    constructor(text) {
        this.project_id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
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
        <button onclick="app.run('delete', ${project.project_id} )" >❌</button> 
        <button onclick="app.run('showEdit', ${project.project_id} )" >📝</button>
        <form onsubmit="app.run('edit', ${project.project_id}, this ); return false" id="${project.project_id}" type="hidden"><input class="input2" name="text" placeholder="Edit name here">
        <button >Confrim Edit</button></form>
        <a href="/projects/project.html?project_id=${project.project_id}">Visit Project</a>
        </li>
        <ul>
            <br>
</div>`).join("")}
        </div>
    </div>
    <div class="div3">
        <form onsubmit="app.run('add', this);return false;">
        <br>
        <br>
            <input class="input1" name="text" placeholder="Add project" />
            <button class="addButton">Add</button>
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

    delete: (state, project_id) => {
        var index = 0
        var count = 0

        console.log(project_id)

        state.projects.forEach(project => {
            console.log(project.project_id)
            if (project_id == project.project_id) {
                index = count
            }
            count = count + 1
        })

        console.log(index)
        fetch(`/projects/${project_id}/delete`)
        state.projects.splice(index, 1)

        return state
    },

    doing: (state, project_id) => {
        var index = 0
        var count = 0

        console.log(project_id)

        state.projects.forEach(project => {
            console.log(project.project_id)
            if (project_id == project.project_id) {
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

    showEdit: (state, project_id, form) => {
        var x = document.getElementById(project_id)
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    },

    edit: async (state, project_id, form) => {
        const project = state.projects.find(project => {
           return project.project_id == project_id
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
        fetch(`/projects/${project_id}/edit`, postRequest).then(() => app.run('getProjects'))
        return state
    },

    getProjects: async (state) => {
        state.projects = await fetch('/projects').then(res => res.json())
        
        return state
    }


}

app.start('KanbanProject', state, view, update)
app.run('getProjects')

