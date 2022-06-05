const UpdatePassQuery = require('../../db/userQueries/updatePassQuery');
const { generateError } = require('../../helpers');

const passModify = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            await generateError('Contraseña incorrecta', 401);
        }
        const UpdatePass = await UpdatePassQuery(password, req.idUser);
        res.send({
            status: 'ok',
            data: {
                UpdatePass,
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = passModify;
