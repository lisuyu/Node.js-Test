/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
const fs = require('fs')

const dbPath = './db.json'

exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}
/**
 * 根据id获取学生信息对象
 * @param {Number} id 学生id
 * @param {Function} callback 回调函数
 */
exports.findById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var student = JSON.parse(data).students
        var result = student.find(function (item){
            return item.id === parseInt(id)
        })
        // console.log(result)
        callback(null,result)
    })
}

exports.save = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        // console.log(students)
        student.id = students[students.length - 1].id + 1

        students.push(student)
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

exports.updateById = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students;

        student.id = parseInt(student.id)

        // console.log(students)
        var stu = students.find(function(item){
            return item.id === student.id
        })

        //遍历拷贝对象
        for(var key in student){
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

exports.deleteById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        
        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })

        students.splice(deleteId,1)

        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}