const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const projects = [
    {
        id: 1,
        text: 'Kanban Project',
        status: 0
    },
    {
        id: 2,
        text: 'DSKAK',
        status: 0
    }
]


const lists = [
    {
        id: 1,
        text: 'Todo',
        status: 0
    },
    {
        id: 2,
        text: 'Doing',
        status: 0
    },
    {
        id: 3,
        text: 'Done',
        status: 0
    }
]

const toDoTasks = [
    {
        id:1,
        text: 'Complete this task or else',
        status: 0
    },
    {
        id:2,
        text: 'Get on with this task',
        status: 0
    }
]
const doingTasks = [
    {
        id:3,
        text: 'Getting through the tasks',
        status: 0
    },
    {
        id:4,
        text: 'even further through the tasks',
        status: 0
    }
]
const doneTasks = [
    {
        id:5,
        text: 'Completed task',
        status: 0
    },
    {
        id:6,
        text: 'Delete this task',
        status: 0
    }
]

const users = [
    {
        id:1,
        name: 'Dev',
        image: '/images/dino3.png'
    },
    {
        id:2,
        name: 'Ben',
        image: '/images/dino1.png'
    },
    {
        id:3,
        name: 'Gemma',
        image: '/images/dino2.png'
    }
]

app.get('/toDoTasks', (req, res) => {
    res.send(toDoTasks)
})

app.get('/doingTasks', (req, res) => {
    res.send(doingTasks)
})

app.get('/doneTasks', (req, res) => {
    res.send(doneTasks)
})

app.post('/toDoTasks', (req, res) => {
    toDoTasks.push(req.body)
    res.send(toDoTasks) //amended GD on error "post-http-localhost3000-upload-500-internal-server-error"
})
app.post('/doingTasks', (req, res) => {
    doingTasks.push(req.body)
    res.send(doingTasks) //amended GD on error "post-http-localhost3000-upload-500-internal-server-error"
})
app.post('/doneTasks', (req, res) => {
    doneTasks.push(req.body) //amended GD on error "post-http-localhost3000-upload-500-internal-server-error"
    res.send(doneTasks)
})


app.get('/lists', (req, res) => {
    res.send(lists)
})

app.post('/lists', (req, res) => {
    lists.push(req.body)
    res.send()
})

app.get('/projects', (req, res) => {
    res.send(projects)
})

app.post('/projects', (req, res) => {
    projects.push(req.body)
    res.send()
})


app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    users.push(req.body)
    res.send(users)
})
app.get('/projects/:id/delete', (req, res) => {
    const index = projects.findIndex( project => {
        return project.id == req.params.id
    }) 
    projects.splice(index, 1)
    res.send()

})


app.listen(3000, () => {
    console.log('app server running on port', 3000)
})