import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const users = Sequelize.import('../module/users')
//自动创建表
users.sync({force: false})

const Op = DB.Op

//引入jwt做token验证
import jwt from 'jsonwebtoken'

import { verToken, getTime } from '../tools'

//统一设置token有效时间
const expireTime = '1h'

//数据库操作类
class usersModule {

  static async getUserInfo (account) { // 登录后查询用户信息-需验证token
    return await users.findOne({
      where: {
        [Op.or]: [{account: account}, {email: account}]
      },
      attributes: {exclude: ['password']}
    })
  }

  static async getUserPwd (account) { // 仅后台使用不开放
    return await users.findOne({
      where: {
        [Op.or]: [{account: account}, {email: account}]
      }
    })
  }

  static async resiger ({nicename, email, account, password}) {
    return await users.create({
      nicename,
      email,
      account,
      password,
      registered_time: getTime()
    })
  }
}

export default class usersController {
  static async getUserInfo (ctx) {
    const req = ctx.request.body
    const token = ctx.headers.authorization

    if (token) {
      try {
        const result = await verToken(token)

        if (!req.account) {
          return ctx.body = {
            status: 0,
            msg: '参数错误'
          }
        } else {
          const data = await usersModule.getUserInfo(req.account)

          if (req.account == data.account) {
            return ctx.body = {
              status: 1,
              userInfo: data,
              msg: '获取用户信息成功'
            }
          }
        }
      } catch (error) {
        ctx.status = 401
        return ctx.body = {
          status: 0,
          msg: error.message
        }
      }
    } else {
      ctx.status = 401
      return ctx.body = {
        status: 0,
        msg: '登陆过期，请重新登陆'
      }
    }
  }

  static async resiger (ctx) {
    const req = ctx.request.body

    if (req.account && req.email && req.password) {
      try {
        const query = await usersModule.getUserPwd(req.account)
        if (query) {
          ctx.response.status = 200
          ctx.body = {
            status: 0,
            msg: '用户已存在'
          }
        } else {
          const param = {
            password: req.password,
            email: req.email,
            account: req.account,
            nicename: req.account
          }
          const data = await usersModule.resiger(param)

          ctx.response.status = 200
          ctx.body = {
            status: 1,
            msg: '用户注册成功',
            userInfo: {
              account: req.account
            }
          }
        }

      } catch (error) {
        console.log(error)
        ctx.response.status = 416
        ctx.body = {
          status: 0,
          msg: '参数不齐全'
        }
      }
    }
  }

  static async login (ctx) {
    const req = ctx.request.body
    if (!req.account || !req.password) {
      return ctx.body = {
        status: 0,
        msg: '用户名或密码不能为空'
      }
    } else {
      const data = await usersModule.getUserPwd(req.account)
      if (data) {
        if (data.password === req.password) {
          //生成token，验证登录有效期
          const token = jwt.sign({
            user: req.account,
            password: req.password
          }, global.koajwtStr, {expiresIn: expireTime})
          return ctx.body = {
            status: 1,
            token: token,
            msg: '登陆成功'
          }
        } else {
          return ctx.body = {
            status: 0,
            msg: '用户密码错误'
          }
        }
      } else {
        return ctx.body = {
          status: 0,
          msg: '该用户尚未注册'
        }
      }
    }

  }
}
