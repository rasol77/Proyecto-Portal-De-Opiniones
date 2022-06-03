const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectTweetByIdQuery = async (idTweet) => {
    let connection;

    try {
        connection = await getConnection();

        const [tweets] = await connection.query(
            `SELECT T.id, T.idUser, T.text, T.createdAt, U.email  
            FROM  tweets T
            LEFT JOIN users U
            ON T.idUser = U.id
            WHERE T.id = ?

         `,
            [idTweet]
        );
        if (tweets.length < 1) {
            throw generateError('Tweet no encontrado', 404);
        }
        return tweets[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectTweetByIdQuery;
