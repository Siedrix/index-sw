const path = require('path')
const env = require('./env')

const {
  WEBPACK_HOST,
  WEBPACK_APP_PORT,
  WEBPACK_PUBLIC_PATH,
  WEBPACK_DIR,
  USE_DIST
} = process.env

const clientUrl = `http://${WEBPACK_HOST}:${WEBPACK_APP_PORT}`
const useDist = env === 'production' || USE_DIST === 'true'

module.exports = {
  env,
  clientUrl,
  useDist,
  outputPublicPath: useDist ? WEBPACK_PUBLIC_PATH : `${clientUrl}${WEBPACK_PUBLIC_PATH}`,
  outputPath: path.resolve(process.cwd(), WEBPACK_DIR),
  outputFilename: 'bundle.js',
  cssFilename: 'bundle.css'
}
