//文件名为mysqlDB.js
var mysql = require('mysql')

//建立连接的方法

function __connection () {

  var connection = mysql.createConnection({
    host: '47.96.138.122',
    user: 'root',
    password: 'hjf8023HG',
    database: 'db_blog'
  })
  connection.connect()
  return connection
}

export default {
  query: (sql, parmas = null) => {
    //1.获取数据库连接对象
    var connection = __connection()
    return new Promise(function (reject, resolve) {

      //2执行sql语句
      connection.query(sql, parmas, function (error, results, fields) {
        if (error) throw error
        reject(results)

      })
      //3关闭连接
      connection.end()
    })
  }
}
