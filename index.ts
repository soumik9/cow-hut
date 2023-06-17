import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import server from './utils/server'
// import routes from './utils/routes';

require('dotenv').config();
const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// all routes
// routes(app);
console.log('hi');


// port listening
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
server(app, port);