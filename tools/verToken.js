import jwt from 'jsonwebtoken'

const verToken = token => {
  return new Promise((resolve, rejece) => {
    const info = jwt.verify(token.split(' ')[1], global.koajwtStr)
    resolve(info)
  })
}

export default verToken
