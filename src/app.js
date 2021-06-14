const taskController = require('../controllers/tasks.js')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const publicDir = path.join(__dirname,'../frontend')
const viewsDir = path.join(__dirname,'../resourses/views')
const layoutsDir = path.join(__dirname,'../resourses/layouts')

app.use(express.static(publicDir))
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(layoutsDir)

app.get('',(req,res)=>{
    resData ={pageTitle:"home",err:false,tasks:null}
    taskController.taskApi((err,data)=>{
        if(err) resData.err = true
        else resData.tasks =data
        res.render('home',resData)
    })

})
app.get('/tasks',(req,res)=>{
    res.render('tasks')
})

app.get('/contacts',(req,res)=>{
    res.render('contacts')
})

const todo = require('../controllers/todo.Controller.js')
app.get('/addTask',todo.addTaskController)
app.get('/allTasks',todo.showAllTasksController)
app.get('/singleTask/:id',todo.showSingleTaskController)
app.get('/deleteTask/:id',todo.deleteSingleTask)
app.get('/changeStatus/:id',todo.changeTaskStatus)
app.get('/editTask/:id',todo.editSingleTask)


module.exports = app