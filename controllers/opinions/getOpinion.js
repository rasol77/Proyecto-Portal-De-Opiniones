const getOpinionByIdQuery = require('../../db/opinionQueries/getOpinionByIdQuery');

const getOpinion = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        const opinions = await getOpinionByIdQuery(idOpinion);

        res.send({
            status: 'ok',
            data: {
                opinions,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOpinion;
