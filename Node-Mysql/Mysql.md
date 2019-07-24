* npm install mysql
        const mysql = require('mysql')

        //创建连接
        const connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'fupin'
        });

        // 连接数据库
        connection.connect()

        // 查找数据
        // connection.query('SELECT * FROM `t_user`',function(err,results,field){
        //     if(err) throw err;
        //     console.log('The solution is',results);
        // });

        connection.query('insert into t_user values (null,"驴头","李苏予","26","某某街道","唱首歌")',function(err,results,field){
            if(err) throw err;
        })

        // 关闭连接
        connection.end();