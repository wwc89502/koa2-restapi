import _verToken from './verToken'
import _getTime from './getTime'
import crypto from './crypto'

export default {
  verToken: _verToken,
  getTime: _getTime,
  decrypt: crypto.decrypt,
  encrypt: crypto.encrypt
}

export const verToken = _verToken
export const getTime = _getTime
export const decrypt = crypto.decrypt
export const encrypt = crypto.encrypt
