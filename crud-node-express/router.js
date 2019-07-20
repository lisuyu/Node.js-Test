/**
 * router.js 路由模块
 * 职责：
 *  处理路由
 *  根据不同的请求方式+请求路径设置具体响应
 * 模块职责单一性，不要乱写
 */

const fs = require('fs')
const Student = require('./student')
const express = require('express')

//创建路由容器
var router = express.Router()

// 原生方式
// module.exports = function(app){
// }

router.get('/students',function(request,response){
// response.send('hello world')
    // fs.readFile('./db.json','utf8',function(err,data){
    //     if(err){
    //         return response.status(500).send('Server err')
    //     }
    //     // console.log(typeof data,data)

    //     var students = JSON.parse(data).students

    //     response.render('index.html',{
    //         fruits:[
    //         '苹果',
    //         '香蕉',
    //         '橘子',
    //         '菠萝'
    //         ],
    //         students:students
    //     })
    // })

    Student.find(function(err,students){
        if(err){
            return response.status(500).send('Server error')
        }
        response.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '橘子'
            ],
            students:students
        })
    })
})

router.get('/students/new',function(request,response){
    response.render('new.html')
})

router.post('/students/new',function(request,response){
    /**
     * 1.获取表单请求
        2.处理
            将数据保存到db.json文件中用以持久化
                1.读文件，转成对象
                2.添加对象，push
                3.对象转为字符串，存入文件
        3.发送相应
     */
    console.log(request.body)
    // var student  = request.body
    Student.save(request.body,function(err){
        if(err){
            // console.log('出错了出错了')
            return response.status(500).send('Server error')
        }
        response.redirect('/students')
    })
})

router.get('/students/edit',function(request,response){
    // console.log(request.query.id)
    // response.render('edit.html',{
    //     student:
    // })

    Student.findById(parseInt(request.query.id),function(err,student){
        if(err){
            return response.status(500).send('Server error')
        }
        // console.log(student)
        response.render('edit.html',{
            student:student
        })
    })
})
router.post('/students/edit',function(request,response){
    // console.log(request.body)
    // var student  = request.body
    // Student.save(request.body,function(err){
    //     if(err){
    //         // console.log('出错了出错了')
    //         return response.status(500).send('Server error')
    //     }
    //     response.redirect('/students')
    // })
    Student.updateById(request.body,function(err){
        if(err){
            return response.status(500).send('Server error') 
        }
        response.redirect('/students')
    })
})
router.get('/students/delete',function(request,response){
    // console.log(request.query.id)
    var id = request.query.id
    Student.deleteById(id,function(err){
        if(err){
            return response.status(500).send('Server error')
        }
        response.redirect('/students')
    })
})

module.exports = router