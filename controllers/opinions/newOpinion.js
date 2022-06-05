const newOpinionQuery = require('../../db/opinionQueries/newOpinionQuery');
const { generateError } = require('../../helpers');

const newOpinion = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text || text.length > 280) {
            throw generateError('Texto Incorrecto ', 400);
        }

        await newOpinionQuery(req.idUser, text);
        res.send({
            status: 'ok',
            message: 'Mensaje creado',
        });
    } catch (err) {
        next(err);
    }
};
module.exports = newOpinion;
