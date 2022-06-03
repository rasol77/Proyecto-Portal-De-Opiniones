const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');

const UpdatePassQuery = async (password, id) => {
    let connection;
    try {
        connection = await getConnection();
        const hashPassword = await bcrypt.hash(password, 10);

        const [users] = await connection.query(
            `UPDATE users SET password = ? WHERE id = ?`,
            [hashPassword, id]
        );
        return users;
    } finally {
        if (connection) connection.release();
    }
};
module.exports = UpdatePassQuery;
