const getConnection = require('../getConnection');

const selectAllTweetsQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [tweets] = await connection.query(
            `SELECT T.id, T.idUser, T.text, T.createdAt, U.email  
            FROM  tweets T
            LEFT JOIN users U
            ON T.idUser = U.id
            ORDER BY T.createdAt DESC

    `
        );
        return tweets;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllTweetsQuery;
