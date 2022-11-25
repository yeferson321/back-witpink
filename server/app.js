/* Importing the libraries that we will use in our application. */
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';

/* Importing the database.js file. */
import conectMongo from './database.js'

/* Importing the routes from the routes folder. */
import Home from './routes/Home.js'
import signupAuth from './routes/signupAuth.js';
import signinAuth from './routes/signinAuth.js'
import registerUsercv from './routes/registerUsercv.js'
import getDataUsercv from './routes/getDataUsercv.js'

/* Loading the environment variables from the .env file. */
dotenv.config();

/* Connecting to the MongoDB Atlas database. */
conectMongo()

/* Creating an instance of the express framework. */
const app = express()

/* setting middLewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const options = { origin: process.env.ORIGIN, }
app.use(cors(options))

/* Importing the routes from the routes folder. */
app.use("/", Home);
app.use(signupAuth);
app.use(signinAuth);
app.use(registerUsercv);
app.use(getDataUsercv);

export default app