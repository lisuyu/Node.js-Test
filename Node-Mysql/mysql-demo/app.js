/**
 * app.js 入口模块
 * 职责：
 *  创建服务
 *  做一些服务相关配置
 *      模板引擎
 *      body-parser 解析表单 post请求体
 *      提供静态资源服务
 *  监听端口启动服务
 * 挂载路由
 */

const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

var app = express()

/**
 * 配置模板引擎和body-parser一定要在app.use(router)挂载路由之前之前
 * 中间件执行流程为从上到下
 */
app.engine('html',require('express-art-template'))

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())


// router(app)
//把路由挂载到app服务中
app.use(router)

app.listen(3000,function(){
    console.log('running...')
})
