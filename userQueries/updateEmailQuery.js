const getConnection = require('../getConnection');

const UpdateEmailQuery = async (email, id) => {
    let connection;
    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `UPDATE users SET email = ? WHERE id = ? `,
            [email, id]
        );
        return users;
    } finally {
        if (connection) connection.release();
    }
};
module.exports = UpdateEmailQuery;
