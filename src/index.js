const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');
const apiRoutes = require('./routes/index');


const serverSetupAndStart = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`);
        connect();
        console.log(`mongodb connected`);
    })
}

serverSetupAndStart();