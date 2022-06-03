const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
    try {
        //Obtenemos el token
        const { authorization } = req.headers;

        //Si no ay token lanzamos el error
        if (!authorization) {
            throw generateError('Falta la cabecera de autorización', 401);
        }

        //Variable que tiene la info del token(payload)
        let token;
        try {
            //Intetamos obtener la info  del token
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Token incorrecto', 401);
        }
        //Agregamos  una nueva propiedad a la request
        req.idUser = token.id;

        //Saltamos al siguiente controlador
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
