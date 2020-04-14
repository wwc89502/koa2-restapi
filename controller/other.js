import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const weather = Sequelize.import('../module/weather')
//自动创建表
weather.sync({force: false})

import { getTime } from '../tools'
import { Op } from 'sequelize'

const https = require('https')

class otherModule {
  static async getLocationWeatherTotal (location) {
    return await weather.findAndCountAll({
      order: [
        ['id', 'DESC']
      ],
      where: {
        location: location
      }
    })

  }
  static async getWeather (location) {
    return await weather.findOne({
      order: [
        ['id', 'DESC']
      ],
      where: {
        location: location
      }
    })
  }
  static async delWeather () {
    return await weather.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date().getTime() - 24 * 60 * 60 * 1000
        }
      }
    })
  }
}

export default class otherController {
  static async getWeather (ctx) {
    await otherModule.delWeather()

    const location = ctx.params.location
    let data = null
    let mySqlData = await otherModule.getWeather(location)
    let mySqlDataLength = (await otherModule.getLocationWeatherTotal(location))['count']
    if (mySqlDataLength > 0 && new Date().getTime() - new Date(mySqlData['updatedAt']).getTime() < 30 * 60 * 1000) {
      data = JSON.parse(mySqlData.data)
    } else {
      data = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'apip.weatherdt.com',
          port: 443,
          path: '/plugin/data?key=SmRGy8UxeD&location=' + encodeURIComponent(location),
          method: 'GET'
        }
        const req = https.request(options, (response) => {
          response.on('data', (res) => {
            let data = JSON.parse(res.toString())
            let opt = {}
            let h = new Date().getHours()
            let cur = h >= 6 && h <= 18 ? 'd' : 'n'
            if (data.status === 'ok') {
              opt.city = data.basic.city
              opt.country = data.basic.cnty
              opt.country = data.basic.cnty
              opt.lat = data.basic.lat
              opt.lon = data.basic.lon
              opt.updateTime = data.basic.updateTime
              opt.province = data.basic.prov
              opt.id = data.basic.id
              opt.tmp = data.now.tmp
              opt.txt = data.now.txt
              opt.wind_dir_txt = data.now.wind_dir_txt
              opt.img = 'https://apip.weatherdt.com/view/static/images/bg_' + data.now.code + cur + '.png'
              data = opt
            }
            weather.create({
              updateTime: getTime(),
              data: JSON.stringify(data),
              location: location
            })
            return resolve(data)
          })
        })
        req.on('error', (err) => {
          return resolve(JSON.parse(err.toString()))
        })
        req.end()
      })
    }

    ctx.body = {
      status: 1,
      data: data
    }
  }
}
