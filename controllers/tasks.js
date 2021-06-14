const request = require('request')
const taskApi = (callBack)=>{
    const url ='https://jsonplaceholder.typicode.com/posts?_limit=10'
    try {
        request({url ,json:true},(error,data)=>{
            if(error) callBack(error,false)
            else callBack(false,data.body)

        })
    } catch (e) {
        callBack(e,false)
    }
}

module.exports ={
    taskApi
}