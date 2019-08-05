const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 用于处理post data
const getPostData = (request)=>{
    const promise = new Promise((resolve,reject)=>{
        if(request.method !='POST'){
            resolve({})
            return
        }
        if(request.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        request.on('data',chuck =>{
            postData += chuck.toString()
        })
        request.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHander = (request,response)=>{
    //设置返回格式JSON
    response.setHeader('Content-type','application/json')

    //获取path
    const url = request.url
    request.path = url.split('?')[0]

    //解析 query
    request.query = querystring.parse(url.split('?')[1])
    
    //处理 post data
    getPostData(request).then(postData=>{
        request.body = postData

        //处理blog路由
        const blogResult = handleBlogRouter(request,response)
        if(blogResult){
            blogResult.then(blogData=>{
                response.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
 
        // const blogData = handleBlogRouter(request,response)
        // if(blogData){
        //     response.end(
        //         JSON.stringify(blogData)
        //         // JSON.stringify({
        //         //     errno:0,
        //         //     data:{},
        //         //     message:'xxx'
        //         // })
        //     )
        //     return
        // }
        
        //处理user路由
        // const userData = handleUserRouter(request,response)
        // if(userData){
        //     response.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }

        const userResult = handleUserRouter(request,response)
        if(userResult){
            userResult.then(userData=>{
                response.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        //未命中路由，返回404
        response.writeHead(404,{'Content-type':'text/plain'})
        response.write('404 not found')
        response.end()
    })
}

module.exports = serverHander