import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
require('dotenv').config();

/**********
 * Config *
 **********/
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Morgan
app.use(morgan('tiny'));

// Cors and list of allowed origins

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

/*****************
 * Import routes *
 *****************/

const route = express.Router();

route.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

app.use(route)

export default app;
