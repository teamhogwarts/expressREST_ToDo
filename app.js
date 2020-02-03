// imports
const mongoose = require('mongoose');
const log4js = require('log4js')
const express = require('express')
const dispatcher = require('./src/web/dispatcher');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('dotenv-extended').load({
    schema: '.env.schema',
    errorOnMissing: true,
    errorOnExtra: true
});

// logging configuration
log4js.configure('log4js.json');
const logger = log4js.getLogger('app');

// mongoose connection
const url = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE;
mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

// bodyparser setup: parse application/json
app.use(bodyParser.json());

// enable cors for all requests
app.use(cors());

// Configure the dispatcher with all its routes
app.use('/todo-express', dispatcher);



app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`)
});