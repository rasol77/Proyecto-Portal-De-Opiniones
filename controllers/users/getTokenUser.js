const selectUserIdQuery = require('../../db/userQueries/selectUserIdQuery');

const getTokenUser = async (req, res, next) => {
    try {
        const user = await selectUserIdQuery(req.idUser);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getTokenUser;
