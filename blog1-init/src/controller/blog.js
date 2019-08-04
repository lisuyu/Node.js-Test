const getList = (author,keyword)=>{
    //先返回假数据（格式是正确的）
    return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:1564734834825,
            author:'lisuyu'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime:1564734834825,
            author:'gyf'
        },
    ]
}

const getDetail = (id)=>{
    //先返回假数据
    return {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:1564734834825,
        author:'lisuyu'
    }
}

const newBlog = (blogData = {} )=>{
    //blogData 是一个博客对象，包含title content 属性
    console.log('newBlog blogData...',blogData)
    return{
        id:3    //标识新建博客，插入到数据表里面
    }
}

const updateBlog = (id,blogData={})=>{
    //id是要跟新博客的id
    console.log('update blog',id,blogData)
    // return false
    return true
}

const delBlog = (id)=>{
    // id就是要删除博客的id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}