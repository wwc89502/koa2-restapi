import fs from 'fs'
import path from 'path'

import upyun from 'upyun'
import { getTime } from '../tools'

const service = new upyun.Service('cdn-wwc', 'wwc89502', 'hjf8023HG')
const client = new upyun.Client(service)
const cdnUrl = 'https://cdn.wweichen.com.cn'

class uploadUpyunModule {
  static async makeDir (path) {
    let status = null
    let msg = null

    const headFile = await uploadUpyunModule.headFile(path)

    if (headFile.status === 1) {
      if (!headFile.data) {
        const data = await client.makeDir(path).then(function (data) {
          status = 1
          return {
            data,
            status
          }
        })
          .catch(function (err) {
            status = 0
            msg = '文件创建失败'
            return {
              err,
              status,
              msg
            }
          })
        if (data.status !== 1) {
          return data
        }
      } else {
        return headFile
      }
    } else {
      return headFile
    }
  }

  static async headFile (path) {
    let status = null
    let msg = null
    const data = await client.headFile(path).then(function (data) {
      status = 1
      return data === false ? false : true
    })
      .catch(function (err) {
        status = 0
        msg = '文件查找失败'
        return err
      })
    return {
      data,
      status,
      msg
    }
  }

  static async getFile (path) {
    let status = null
    let msg = null
    const data = await client.getFile(path).then(function (data) {
      status = 1
      return data
    })
      .catch(function (err) {
        status = 0
        msg = '文件查找失败'
        return err
      })
    return {
      data,
      status,
      msg
    }

  }

  static async putFile (path, file, opt) {
    let status = null
    let msg = null
    const data = await client.putFile(path, file, opt).then(function (data) {
      status = 1
      return data
    })
      .catch(function (err) {
        status = 0
        msg = '文件上传失败'
        return err
      })
    return {
      data,
      status,
      msg
    }
  }
}

export default class uploadUpyunController {
  static async getFile (ctx) {
    const data = await uploadUpyunModule.getFile(ctx.query.path)
    ctx.body = {
      status: 1,
      data
    }
  }
  static async putFile (ctx) {
    const file = ctx.request.files.file // 获取上传文件

    const reader = fs.createReadStream(file.path)

    let extname = path.extname(file.name)

    let basePath = '/Upload'

    let isImg = false

    if (extname == '.jpg'
      || extname == '.png'
      || extname == '.gif'
      || extname == '.svg'
      || extname == '.bmp'
      || extname == '.raw') isImg = true

    if (isImg) basePath += '/images/'
    else basePath += '/files/'

    basePath += getTime(new Date(), 'yyyyMM')

    let random = Math.floor(Math.random() * 9000 + 1000).toString()

    let filePath = basePath + '/' + getTime(new Date(), 'yyyyMMddHHmmss') + '_' + random + extname

    const makeDir = await uploadUpyunModule.makeDir(basePath)

    const putFile = await uploadUpyunModule.putFile(filePath, reader, {
      'Content-Secret': 'getpic'
    })

    ctx.body = {
      status: 1,
      msg: '上传成功',
      data: {
        url: cdnUrl + filePath,
        cate: isImg ? 'image' : 'file'
      }
    }
  }
}
