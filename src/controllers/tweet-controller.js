const TweetService = require('../services/tweet-service');

const tweetService = new TweetService();

const createTweet = async (req, res) => {
    try {
        const response = await tweetService.create(req.body);
        return res.status(200).json({
            data: response, 
            err: {}, 
            msg: 'Successfully created a new tweet',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            data: {}, 
            err: error,
            msg: 'Something went wrong',
            success: false
        })
    }
}

module.exports = {
    createTweet
}