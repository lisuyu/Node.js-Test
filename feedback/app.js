var http = require('http')
var fs = require('fs')
var template = require('art-template')
// url 需要npm导入
var url = require('url') 

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

http
	.createServer('request',function(request,response){
		
		// console.log('hello')
		// var url = request.url 
		var parseObj = url.parse(request.url,true)
		var pathname = parseObj.pathname
		if(pathname === '/'){
			fs.readFile('./view/index.html',function(err,data){
				if(err){
					return response.end('404 Not Found')
				}
				var htmlStr = template.render(data.toString(),{
					comments:comments
				})
				response.end(htmlStr)
			})
		}else if(pathname==='/post'){
			fs.readFile('./view/post.html',function(err,data){
				if(err){
					return response.end('404 Not Found')
				}
				response.end(data)
			})
		}else if(pathname.indexOf('/public/')===0){
			// console.log(url)
			fs.readFile('.'+pathname,function(err,data){
				if(err){
					return response.end('404,not found')
				}
				response.end(data)
			})
		}else if(pathname === '/pinglun'){
			response.setHeader('Content-Type', 'text/plain; charset=utf-8')
			
			// console.log('收到表单请求',parseObj.query)
			// response.end(JSON.stringify(parseObj.query))
			
			var comment = parseObj.query 
			comment.dateTime = '2019-01-19 14:49:34'
			//从尾部插入
			// comments.push(comment)
			
			// 从头部插入
			comments.unshift(comment)
			
			response.statusCode = 302
			response.setHeader('Location','/')
			response.end()
		} else{
			fs.readFile('./view/404.html',function(err,data){
				if(err){
					return response.end('404 Not Found')
				}
				response.end(data)
			})
		}
	})
	.listen(3000,function(){
		console.log('running...')
	})