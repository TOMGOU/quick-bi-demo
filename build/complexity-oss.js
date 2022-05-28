const path = require('path')
const executeComplexity  = require('@lx-frontend/lx-complexity')
const OSS = require('ali-oss')
const cwd = process.cwd()
const directories = cwd.split(path.sep)
const folder = directories[directories.length - 1]
const dayjs = require('dayjs')
let client = null

async function put (fileName, complexity, maxAge) {
  return client.put(`${fileName}.json`, Buffer.from(JSON.stringify(complexity)), {
    headers: {
      'Cache-Control': 'max-age=' + maxAge // 默认缓存一年
    }
  })
}

async function complexityOSS(options) {
  try {
    if (!client) {
      client = new OSS({
        accessKeyId: options.accessKeyId,
        accessKeySecret: options.accessKeySecret,
        region: options.region,
        bucket: options.bucket
      })
    }
    console.log('----complexity oss ready----')
    // 缓存时间，默认一年
    const maxAge = options.maxAge || 3600 * 24 * 365
    const dest = name => `frontend/complexity/${folder}/${name}`
    const today = dayjs().format('YYYY-MM-DD-HH-mm-ss').replace(/-/g, '_')
    const upload = [folder, today]
    const complexity = executeComplexity()
    // 上传文件
    await Promise.all(upload.map(item => put(dest(item), complexity, maxAge)))
    console.log('----complexity oss upload success----')
  } catch (e) {
    process.exitCode = 1
    console.log('----complexity oss upload error----\n', e)
  }
}

module.exports = complexityOSS
