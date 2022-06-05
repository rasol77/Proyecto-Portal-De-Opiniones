const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const getOpinionByIdQuery = async (idOpinion) => {
    let connection;

    try {
        connection = await getConnection();

        const [opinions] = await connection.query(
            `SELECT O.id, O.idUser, O.text, U.email, O.createdAt
            FROM opinions O
            LEFT JOIN users U
            ON O.idUser = U.id
            WHERE O.id = ?`,
            [idOpinion]
        );
        if (opinions.length < 1) {
            throw generateError('Opinión no encontrada', 404);
        }
        return opinions[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getOpinionByIdQuery;
