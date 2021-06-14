const { query } = require('express')

fs = require('fs')

readData =()=>{
    try {
        data = JSON.parse(fs.readFileSync('tasks.json').toString())
    } catch (error) {
        data=[]
    }
    return data
}

writeData =(data)=>{
    try {
        fs.writeFileSync('tasks.json',JSON.stringify(data))
    } catch (error) {
        fs.writeFileSync('tasks.json','[]')
    }

}

addTask = (task)=>{
    allData = readData()
    allData.push(task)
    writeData(allData)
}
addTaskController = (req,res)=>{
    task ={
        name:'',
        content:'',
        status:''
    }
    if(req.query.name == '' || req.query.content == ''){
        task = req.query
    }
    if (req.query.name && req.query.content) {
    
        addTask(req.query)
        res.redirect('/addTask')
    }
    res.render('contacts', {pageTitle:'add new task', taskName:task.name, taskContent:task.content,taskStatus:task.status})
}
showAllTasksController=(req,res)=>{
    data = {
        pageTitle: 'Show All Tasks',
        data: readData()
    }
    res.render('allTasks', data)

}

showSingleTaskController = (req,res)=>{
    // console.log(req.params)
    allData = readData()
    data =  allData[req.params.id]
    id = req.params.id
    res.render('singleTask',{data,id})
}
deleteSingleTask = (req,res)=>{
    allData = readData()
    data =  allData[req.params.id]
    allData.splice(data,1)
    writeData(allData)
    res.redirect('/allTasks')

}

changeTaskStatus =(req,res)=>{
    allData = readData()
    data =  allData[req.params.id]
    data.status == "false" ? data.status="true" :data.status="false"
    writeData(allData)
    res.redirect('/allTasks')

}

editSingleTask = (req,res)=>{
    allData = readData()
    data =  allData[req.params.id]
    newData = req.query
    if (req.query.name && req.query.content) {
        data.name =newData.name
        data.content= newData.content
        data.status= newData.status
        writeData(allData)
        res.redirect('/allTasks')
    }
    res.render('editTask', {pageTitle:'Edit task', data})
    
}



module.exports ={
    addTaskController,
    showAllTasksController,
    showSingleTaskController,
    deleteSingleTask,
    changeTaskStatus,
    editSingleTask
}
