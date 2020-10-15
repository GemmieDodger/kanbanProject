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

const tasks = [
    {
        id:1,
        text: 'Complete this task or else',
        status: 0
    },
    {
        id:2,
        text: 'Delete this task',
        status: 0
    },
    {
        id:3,
        text: "Don't complete this task",
        status: 0
    }
]

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

app.listen(3000, () => {
    console.log('app server running on port', 3000)
})