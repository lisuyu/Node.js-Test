const env = process.env.NODE_ENV    //环境变量

// console.log(env)
// console.log(process.env)
// console.log('#####',process.env.NODE_ENV)

//配置
let MYSQL_CONF
if (env==='dev') {
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'root',
        port:'3306',
        database:'myblog'
    }
}

if(env==='production'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'root',
        port:'3306',
        database:'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}