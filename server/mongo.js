import MongoClient, { Db, Collection } from 'mongodb'

/** @type {Db} */
let client

/** @type {Collection} */
export let phonebooks

async function createClient (dbString) {
  console.log('dbString incoming: ' + dbString)
  if (dbString) {
    console.log('db string', dbString)
  } else {
    console.log("Didn't pass DB params")
    process.exit()
  }

  let DBUSER = process.env.DB_USER || "abel"
  let DBPASS = process.env.DB_PASS || "5K0k83GGHuWv84gt"
  let DBSTRING = process.env.DB_STRING || "cluster0.pn9y3.mongodb.net"
  let mongoURL = `mongodb+srv://${DBUSER}:${DBPASS}@${DBSTRING}?retryWrites=true&w=majority`

  console.log('mongoURL: ' + mongoURL)
  return MongoClient.connect(mongoURL)
}

export let initMongo = async () => {
  try {
    client = await createClient(process.env.DB_STRING)
    
    const pbApp = client.db('pb-app')

    // collections
    phonebooks = await pbApp.collection('phonebooks')

  } catch (err) {
    console.log(err)
    throw err
  }
}
