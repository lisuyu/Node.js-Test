const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'test'
})

connection.connect()

exports.find = function(callback){
    connection.query('select * from students',function(err,results,field){
        if(err){
            return callback(err)
        }
        callback(null,results)
        // console.log(results);
    })
}