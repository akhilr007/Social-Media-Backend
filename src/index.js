const express = require('express');

const app = express();
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');

const TweetService = require('./services/tweet-service');

const serverSetupAndStart = () => {

    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`);
        connect();
        console.log(`mongodb connected`);
        const service = new TweetService();
        const response = await service.create({
            content: 'This is my #second tweet, really #excited #fun'
        });

        console.log(response);
    })
}

serverSetupAndStart();