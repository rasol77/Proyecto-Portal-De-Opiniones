const selectAllTweetsQuery = require('../../db/tweetQueries/selectAllTweetsQuery');

const listTweets = async (req, res, next) => {
    try {
        const tweets = await selectAllTweetsQuery();

        res.send({
            status: 'ok',
            data: {
                tweets,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listTweets;
