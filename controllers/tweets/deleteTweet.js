const selectTweetByIdQuery = require('../../db/tweetQueries/selectTweetByIdQuery');
const deleteTweetQuery = require('../../db/tweetQueries/deleteTweetQuery');
const { generateError } = require('../../helpers');

const deleteTweet = async (req, res, next) => {
    try {
        const { idTweet } = req.params;

        //Obtenemos la info  del tweet que vamos a borrar
        const tweet = await selectTweetByIdQuery(idTweet);

        //Comprobamos que el tweet coincide con el id del token
        if (req.idUser !== tweet.idUser) {
            throw generateError('No tienes permisos para borrar', 401);
        }

        //Si el tweet tiene vinculada una imagen la eliminamos del HD

        await deleteTweetQuery(idTweet);
        res.send({
            status: 'ok',
            message: 'Tweet eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteTweet;
