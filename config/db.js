import Sequelize from 'sequelize'

const Op = Sequelize.Op

const sequelize = new Sequelize('my_blog', 'root', 'hjf8023HG', {
  host: '47.96.138.122',
  operatorsAliases: false,
  timezone: '+08:00',  //东八时区
  dialect: 'mariadb',
  dialectOptions: {connectTimeout: 1000}, // mariadb 连接参数
  define: {
    timestamps: false
  }
})

// 测试链接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export default {
  sequelize,
  Op
}
