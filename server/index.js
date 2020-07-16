import { initMongo } from './mongo'
import initServer from './server'

async function init () {
  try {
    console.log('init mongo')
    await initMongo()

    console.log('init server')
    await initServer()
  } catch (e) {
    console.log(e)
    process.exit(0)
  }
}

init()
