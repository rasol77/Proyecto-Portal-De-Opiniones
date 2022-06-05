const selectAllOpinionsQuery = require('../../db/opinionQueries/selectAllOpinionsQuery');

const listOpinions = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const opinions = await selectAllOpinionsQuery(keyword);

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

module.exports = listOpinions;
