import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import api from './api'
import cors from 'cors'
import path from 'path'

const app = express();

export default async () => {
  // app server main
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // load development environment vars from .env
    console.log('Server starting in development mode...');
    require('dotenv').config();
  } else {
    console.log('Server starting in production mode...');
  }

  // setup server
  app.set('port', process.env.PORT || 3000);

  // logging config
  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('common'));
  } else {
    app.use(morgan('dev'));
  }

  // use cors
  app.use(cors())
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); //Make sure u have added this line
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/jsons then use the api routers
  app.use('/api', api());

  console.log(process.env)

  // serve static client assets in production
  if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'app/build')
    app.use(express.static(buildPath));
    //app.get('/', (req, res) => { res.redirect(301, '/app'); });
    app.get('*', (req, res) => {
      res.sendFile(`${buildPath}/index.html`);
    });
  }

  // start listening
  app.listen(app.get('port'), () => {
    console.log(`Server started and listening on port ${app.get('port')}`);
  });

}