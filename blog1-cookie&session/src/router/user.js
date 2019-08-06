const { login } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')

//获取cookie过期时间
const getCookieExpires=()=>{
    const d = new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    console.log('d.toGMTString is',d.toDateString())
    return d.toGMTString()
}

const handleUserRouter = (request,response)=>{
    const method = request.method   //GET POST
    // const url = request.url
    // const path = url.split('?')[0]

    //登录
    if(method === 'GET' && request.path === '/api/user/login'){
        // const { username,password } = request.body
        const { username,password } = request.query
        // console.log(username,password)
        const result = login(username,password)
        // console.log(result)
        return result.then(data=>{
            if(data.username){
                //httpOnly:只允许后端修改,且前端document.cookie之后看不到了
                //限制了客户端对cookie的修改 Network-》cookies
                // response.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`)

                //设置session
                request.session.username = data.username
                request.session.realname = data.realname

                console.log('reqeust.session is',request.session)

                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
        // if(result){
        //     return new SuccessModel()
        // }
        // return new ErrorModel('登录失败')

        // return {
        //     msg:'这是登录的接口'
        // }
    }

    //登录验证的测试
    if(method==='GET' && request.path==='/api/user/login-test'){
        if(request.session.username){
            return Promise.resolve(
                new SuccessModel({
                    session:request.session
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

module.exports = handleUserRouter