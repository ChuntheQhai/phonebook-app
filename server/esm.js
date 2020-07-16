// Set options as a parameter, environment variable, or rc file
const path = require('path')

require = require('esm')(module/*, options */)
require('dotenv').config({path: path.join(__dirname, '..', '.env') })
module.exports = require('./index.js')
