const selectTweetByIdQuery = require('../../db/tweetQueries/selectTweetByIdQuery');

const getTweet = async (req, res, next) => {
    try {
        const { idTweet } = req.params;
        const tweets = await selectTweetByIdQuery(idTweet);

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

module.exports = getTweet;
