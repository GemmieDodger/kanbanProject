const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const projects = [
    {   "project_id": '1',
        "text": "Chores",
        "lists": [
            {   "list_id": '1',
                "title": "To Do",
                "tasks": [
                    {   "task_id": '1',
                        "text": "Cook dinner",
                        "status": 0
                    },
                    {   "task_id": '2',
                        "name": "Paint",
                        "status": 0
                    },
                    {   "task_id": '3',
                        "name": "Eat",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '2',
                "title": "Doing",
                "tasks": [
                    {   "task_id": '4',
                        "name": "Sort out clothes",
                        "status": 0
                    },
                    {   "task_id": '4',
                        "name": "washing",
                        "status": 0
                    },
                    {   "task_id": '5',
                        "name": "washing up",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '3',
                "title": "Done",
                "tasks": [
                    {   "task_id": '6',
                        "name": "HW",
                        "status": 0
                    },
                    {   "task_id": '7',
                        "name": "dancing",
                        "status": 0
                    }
                ]
            }
        ]
    },
    {   "project_id": '2',
        "text": "DIY",
        "lists": [
            {   "list_id": '4',
                "title": "To Do",
                "tasks": [
                    {   "task_id": '7',
                        "text": "Cook dinner",
                        "status": 0
                    },
                    {   "task_id": '8',
                        "name": "Paint",
                        "status": 0
                    },
                    {"task_id": '9',
                        "name": "Eat",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '5',
                "title": "Doing",
                "tasks": [
                    {   "task_id": '10',
                        "name": "Sort out clothes",
                        "status": 0
                    },
                    {   "task_id": '11',
                        "name": "washing",
                        "status": 0
                    },
                    {   "task_id": '12',
                        "name": "washing up",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '6',
                "title": "Done",
                "tasks": [
                    {   "task_id": '13',
                        "name": "HW",
                        "status": 1
                    },
                    {   "task_id": '14',
                        "name": "dancing",
                        "status": 1
                    }
                ]
            }
        ]
    },
    {   "project_id": '3',
        "text": "Lessons",
        "lists": [
            {   "list_id": '7',
                "title": "To Do",
                "tasks": [
                    {   "task_id": '15',
                        "text": "Math",
                        "status": 0
                    },
                    {   "task_id": '16',
                        "name": "English",
                        "status": 0
                    },
                    {   "task_id": '17',
                        "name": "Science",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '8',
                "title": "Doing",
                "tasks": [
                    {   "task_id": '18',
                        "name": "English",
                        "status": 0
                    },
                    {   "task_id": '19',
                        "name": "German",
                        "status": 0
                    },
                    {   "task_id": '20',
                        "name": "Art",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '9',
                "title": "Done",
                "tasks": [
                    {   "task_id": '21',
                        "name": "Tech",
                        "status": 1
                    },
                    {   "task_id": '22',
                        "name": "Drama",
                        "status": 1
                    }
                ]
            }
        ]
    },
    {   "project_id": '4',
        "text": "Happiness",
        "lists": [
            {   "list_id": '10',
                "title": "To Do",
                "tasks": [
                    {   "task_id": '23',
                        "text": "Sleep",
                        "status": 0
                    },
                    {   "task_id": '24',
                        "name": "Paint",
                        "status": 0
                    },
                    {   "task_id": '25',
                        "name": "Eat",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '11',
                "title": "Doing",
                "tasks": [
                    {   "task_id": '26',
                        "name": "Yoga",
                        "status": 0
                    },
                    {   "task_id": '27',
                        "name": "Run",
                        "status": 0
                    },
                    {   "task_id": '28',
                        "name": "Sewing",
                        "status": 0
                    }
                ]
            },
            {   "list_id": '12',
                "title": "Done",
                "tasks": [
                    {   "task_id": '29',
                        "name": "Drawing",
                        "status": 1
                    },
                    {   "task_id": '30',
                        "name": "Baking",
                        "status": 1
                    }
                ]
            }
        ]
    },
]

const users = [
    {
        user_id:1,
        name: 'Dev',
        image: '/images/dino3.png'
    },
    {
        user_id:2,
        name: 'Ben',
        image: '/images/dino1.png'
    },
    {
        user_id:3,
        name: 'Gemma',
        image: '/images/dino2.png'
    }
]

app.get('/toDoTasks', (req, res) => {
    res.send(toDoTasks)
})

// app.get('/projects/:id/project.html', (req, res) => {
//     res.send(lists)
// })

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


/*app.get('/projects/:id/lists/:id/delete', (req, res) => {
    const index = doneTasks.findIndex( task => {
        return task.id == req.params.id
    }) 
    doneTasks.splice(index, 1)
    res.send()
})*/

app.get('/projects/:project_id/delete', (req, res) => {
    const index = projects.findIndex( project => {
        return project.project_id == req.params.project_id
    }) 
    projects.splice(index, 1)
    res.send()
})



app.post('/projects/:project_id/edit', async (req, res) => {
    console.log(req.body)
    const index = projects.findIndex( project => {
        return project.project_id == req.params.project_id
    }) 
    projects[index] = req.body
    res.redirect(`/`)
})

app.get('/projects/:project_id', (req, res) => {
    const index = projects.findIndex( project => {
        return project.project_id == req.params.project_id 
    }) 
    const project = projects[index]
        
   
    res.send(project)
})


//GETTING PROJECT PAGE


app.listen(3000, () => {
    console.log('app server running on port', 3000)
})