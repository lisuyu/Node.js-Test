const { loginCheck } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')

const handleUserRouter = (request,response)=>{
    const method = request.method   //GET POST
    // const url = request.url
    // const path = url.split('?')[0]

    //登录
    if(method === 'POST' && request.path === '/api/user/login'){
        const { username,password } = request.body
        const result = loginCheck(username,password)
        if(result){
            return new SuccessModel()
        }
        return new ErrorModel('登录失败')

        // return {
        //     msg:'这是登录的接口'
        // }
    }
}

module.exports = handleUserRouter