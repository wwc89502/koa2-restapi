import fs from 'fs'
import path from 'path'
import { getTime } from '../tools'

export default class uploadController {

  static async uploadfile (ctx) {
    function mkdirsSync (dirname) {
      if (fs.existsSync(dirname)) {
        return true
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname)
          return true
        }
      }
    }

    const file = ctx.request.files.file // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path)

    // 扩展名
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

    mkdirsSync(basePath)
    // 创建可写流
    const upStream = fs.createWriteStream(global.appPath + filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    ctx.body = {
      msg: '上传成功',
      filePath
    }
  }

  static async uploadfiles (ctx) {
    function mkdirsSync (dirname) {
      if (fs.existsSync(dirname)) {
        return true
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname)
          return true
        }
      }
    }

    const files = ctx.request.files // 获取上传文件

    let filesPath = []

    for (let file of files.multipartFiles) {
      // 创建可读流
      const reader = fs.createReadStream(file.path)

      // 扩展名
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

      filesPath.push(filePath)

      mkdirsSync(basePath)
      // 创建可写流
      const upStream = fs.createWriteStream(global.appPath + filePath)
      // 可读流通过管道写入可写流
      reader.pipe(upStream)
    }
    ctx.body = {
      msg: '上传成功',
      filesPath
    }
  }
}
