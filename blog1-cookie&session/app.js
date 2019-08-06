const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires=()=>{
    const d = new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    console.log('d.toGMTString is',d.toDateString())
    return d.toGMTString()
}

//session 数据
const SESSION_DATA = {}

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

    //解析cookie
    request.cookie = {}
    const cookieStr = request.headers.cookie || '' //k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return 
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1]
        console.log(key,val)
        request.cookie[key] = val
    })
    // console.log('request.cookie is ',request.cookie)

    //解析session
    let needSetCookie = false
    let userId = request.cookie.userid
    if (userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    request.session = SESSION_DATA[userId]

    //处理 post data
    getPostData(request).then(postData=>{
        request.body = postData

        //处理blog路由
        const blogResult = handleBlogRouter(request,response)
        if(blogResult){
            blogResult.then(blogData=>{
                if(needSetCookie){
                    response.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }

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
                if(needSetCookie){
                    response.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }

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