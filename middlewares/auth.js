const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const auth = (req, res, next) => {
    try {
        //Obtenemos el token
        const { authorization } = req.headers;

        //Si no ay token damos error
        if (!authorization) {
            throw generateError('Falta autorización', 401);
        }

        //info del token
        let token;
        try {
            //Generamos la info del token
            token = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            throw generateError('Token invalido', 401);
        }
        //Añadimos una propiedad a la  pregunta
        req.user = token.userId;
        console.log(req.user);
        //Vamos al controlador continuo
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;
