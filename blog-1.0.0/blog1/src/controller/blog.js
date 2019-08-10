const { exec } = require('../db/mysql')

const getList = (author,keyword)=>{
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql+=`and author='${author}' `
    }
    if(keyword){
        sql+=`and title like '%${keyword}%' `
    }

    sql +='order by createtime desc;'

    //返回promise
    return exec(sql)
}

const getDetail = (id)=>{
    //先返回假数据
    // return {
    //     id:1,
    //     title:'标题A',
    //     content:'内容A',
    //     createTime:1564734834825,
    //     author:'lisuyu'
    // }

    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(row=>{
        return row[0]
    })
}

const newBlog = (blogData = {} )=>{
    //blogData 是一个博客对象，包含title content 属性

    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title,content,createtime,author)
        values ('${title}','${content}','${createTime}','${author}')
    `

    return exec(sql).then(insertData=>{
        // console.log('insertData is ',insertData)
        return {
            id:insertData.insertId
        }
    })

    // console.log('newBlog blogData...',blogData)
    // return{
    //     id:3    //标识新建博客，插入到数据表里面
    // }
}

const updateBlog = (id,blogData={})=>{
    //id是要跟新博客的id
    //blogData是一个博客对象，包含title,content属性
    // console.log('update blog',id,blogData)
    // return false
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title = '${title}',content='${content}' where id = ${id}
    `
    return exec(sql).then(updateData=>{
        // console.log('updateDate :',updateData)
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
}

const delBlog = (id,author)=>{
    // id就是要删除博客的id
    const sql = `
    delete from blogs where id = '${id}' and author='${author}';
    `
    return exec(sql).then(delData=>{
        if(delData.affectedRows>0){
            return true
        }
        return false
    })

    // return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}