const getConnection = require('../getConnection');

const newOpinionQuery = async (idUser, text) => {
    let connection;
    try {
        connection = await getConnection();

        await connection.query(
            'INSERT INTO opinions (idUser, text) VALUES (?, ?)',
            [idUser, text]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newOpinionQuery;
