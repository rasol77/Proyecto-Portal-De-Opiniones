const getConnection = require('../getConnection');

const selectAllOpinionsQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [opinions] = await connection.query(
            `SELECT O.id, O.idUser, O.text, U.email, O.createdAt
            FROM opinions O
            LEFT JOIN users U
            ON O.idUser = U.id
            ORDER BY O.createdAt DESC`
        );
        return opinions;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllOpinionsQuery;
