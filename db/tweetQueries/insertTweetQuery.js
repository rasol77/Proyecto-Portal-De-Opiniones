const getConnection = require('../getConnection');

const insertTweetQuery = async (idUser, text) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
        INSERT INTO  tweets (idUser, text)
        VALUES (?, ?)

    `,
            [idUser, text]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertTweetQuery;
