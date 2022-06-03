const getUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');

const getOwnUser = async (req, res, next) => {
    try {
        const user = await getUserByIdQuery(req.idUser);

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

module.exports = getOwnUser;
