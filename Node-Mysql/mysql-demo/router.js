const express = require('express')
const Student = require('./student')

var router = express.Router()

router.get('/',function(request,response){
    Student.find(function(err,results){
        if(err){
            return response.status(500).send('Server error')
        }
        students = response.jsonp(results)
        // console.log(students);
        // response.render('index.html',{
        //     fruits:[
        //         '苹果',
        //         '香蕉',
        //         '橘子'
        //     ],
        //     students: students
        // })
        // console.log(response.jsonp(results))
        return response.jsonp(results)
    })
})

module.exports = router