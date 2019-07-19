const express = require('express')
const bodyParser = require('body-parser')

var app = express()
//配置使用art-template模板引擎
//参数表示：当渲染以.art 结尾的文件的时候，使用art-templat模板引擎
app.engine('art',require('express-art-template'))

//配置body-parser 中间件（插件，专门用来解析表单POST请求）
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//修改默认的views目录
// app.set('views',render函数的默认路径)

var comments = [
	{
		name:'陈十一',
		message:'哈欠',
		dataTime:'2019年7月19日10:33:29'
	},
	{
		name:'陈十一',
		message:'哈欠',
		dataTime:'2019年7月19日10:33:29'
	},
	{
		name:'陈十一',
		message:'哈欠',
		dataTime:'2019年7月19日10:33:29'
	}
]


app
    .get('/',function(request,response){
        // response.render('404.art',{
        //     title:'hello world'
        // })
        // response.send('/page')
        response.render('index.art',{
            comments:comments
        })
    })
    .get('/post',function(request,response){
        response.render('post.art')
    })
    // .get('/pinglun',function(request,response){
    //     // console.log(request.query)
    //     var comment = request.query;
    //     comment.dataTime = '2019-07-19 21:02:14'
    //     comments.unshift(comment)
    //     response.redirect('/')
    // })
    //当以POST请求/post 的时候，执行指定的处理函数
    // 同一个路径可以请求多次，就是根据不同的请求方法
    .post('/post',function(request,response){
        // console.log('收到表单post请求')
        // response.send('post')
        // console.log(request.body)
        var comment = request.body
        comment.dataTime = '2019-07-19 21:02:14'
        comments.unshift(comment)
        //会自动结束响应
        response.redirect('/')
    })
app.use('/public/',express.static('./public/'))

app.listen(3000,function(){
    console.log('running...')
})