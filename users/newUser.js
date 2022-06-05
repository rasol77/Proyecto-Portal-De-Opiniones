const insertUserQuery = require('../../db/userQueries/insertUserQuery');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        //Obtenemos los campor del body
        const { email, password } = req.body;

        //Si faltan campos lanzamos el error
        if (!email || !password) {
            throw generateError('Faltan por rellenar', 400);
        }

        //Creamos un usuario en la BD y obtenemos el id
        const idUser = await insertUserQuery(email, password);

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};
module.exports = newUser;
