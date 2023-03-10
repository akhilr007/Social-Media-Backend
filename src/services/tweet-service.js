const { TweetRepository, HashtagRepository } = require('../repository/index');

class TweetService {

    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;

        const tags = content.match(/#[a-zA-Z0-9_]+/g)
                    .map((tag) => tag.substring(1).toLowerCase()) // this regex extracts hashtags\
        //console.log(tags);

        const tweet = await this.tweetRepository.create(data);
        //console.log(tweet);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map(tag => tag.title);

        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));  
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });
    
        await this.hashtagRepository.bulkCreate(newTags); 

        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        })
        return tweet;

        /**
        1. bulk-create in mongoose
        2. filter title of hashtag based on multiple tags
        3. how to add tweet id inside all the hashtags
        */

    }
}

module.exports = TweetService;