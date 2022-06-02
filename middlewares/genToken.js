const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const gentToken = (req, res, next) => {
    try {
        //Obtenemos el token
        const { authority } = req.headers;

        //Si no ay token damos error
        if (!authority) {
            throw generateError('Falta autorización', 401);
        }

        //info del token
        let token;
        try {
            //Generamos la info del token
            token = jwt.verify(authority, process.env.SECRET);
        } catch (error) {
            throw generateError('Token incorrecto', 401);
        }
        //Añadimos una propiedad a la  pregunta
        req.idUser = token.id;

        //Vamos al controlador continuo
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = gentToken;
