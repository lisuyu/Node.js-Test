const { exec } = require('../db/mysql')

const loginCheck = (username,password)=>{
    //先试用假数据

    const sql = `
        select username,realname from users where username = '${username}' and password ='${password}'
    `
    return exec(sql).then(rows=>{
        return rows[0] || {}
    })
    // if(username==='张三'&&password==="123"){
    //     return true
    // }
    // return false
}

module.exports = {
    loginCheck
}