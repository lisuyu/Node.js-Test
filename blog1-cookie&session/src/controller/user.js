const { exec } = require('../db/mysql')

const  login= (username,password)=>{
    //先试用假数据

    const sql = `
        select username,realname from users where username = '${username}' and password ='${password}'
    `
    // console.log(sql.trim())
    return exec(sql).then(rows=>{
        // console.log(rows[0])
        return rows[0] || {}
    })
    // if(username==='张三'&&password==="123"){
    //     return true
    // }
    // return false
}

module.exports = {
    login
}