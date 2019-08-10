const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
 } = require('../controller/blog')
const { 
    SuccessModel,
    ErrorModel } = require('../model/resModel')


//统一的登录验证函数
const loginCheck = (req)=>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}


const handleBlogRouter = (request,response)=>{
    const method = request.method   //GET POST
    const id = request.query.id
    // const url = request.url
    // const path = url.split('?')[0]

    //获取博客列表
    if(method === 'GET' && request.path === '/api/blog/list'){
        let author = request.query.author || ''
        const keyword = request.query.keyword || ''
        // const listData = getList(author,keyword)
        // return new SuccessModel(listData)

        if(request.query.isadmin){
            //管理员界面
            const loginCheckResult = loginCheck(request)
            if(loginCheckResult){
                //未登录
                return loginCheckResult
            }

            //强制查询自己的博客
            author = request.session.username
        }

        const result = getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })

        // return {
        //     // msg:'这是获取博客列表的接口'
        // }
    }

    //获取博客详情
    if(method === 'GET' && request.path === '/api/blog/detail'){
        // const data = getDetail(id)
        // return new SuccessModel(data)

        const result = getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })

        // return {
        //     msg:'这是获取博客详情的接口'
        // }
    }

    //新建一篇博客
    if(method === 'POST' && request.path === '/api/blog/new'){
        // const blogData = request.body
        // const data = newBlog(blogData)
        // return new SuccessModel(data)

        const loginCheckResult = loginCheck(request)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        // const author = 'zhangsan'   //假数据，在开发登录时再改成真实数据
        const author = request.session.username
        request.body.author = author
        const result = newBlog(request.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })

        // return {
        //     msg:'这是新建博客的接口'
        // }
    }

    //更新一篇博客
    if(method === 'POST' && request.path === '/api/blog/update'){

        const loginCheckResult = loginCheck(request)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }


        const result = updateBlog(id,request.body)
        // if(result){
        //     return new SuccessModel()
        // }else{
        //     return new ErrorModel('更新博客失败')
        // }

        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新博客失败')
            }
        })

        // return {
        //     msg:'这是更新博客的接口'
        // }
    }

    //删除一篇博客
    if(method === 'POST' && request.path === '/api/blog/del'){
        // const result = delBlog(id)
        // if(result){
        //     return new SuccessModel()
        // }else{
        //     return new ErrorModel('删除博客失败')
        // }

        const loginCheckResult = loginCheck(request)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        const author = request.session.username
        const result = delBlog(id,author)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('删除博客失败')
            }
        })

        // return {
        //     msg:'这是删除博客的接口'
        // }
    }
}

module.exports = handleBlogRouter