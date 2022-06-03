const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectUserIdQuery = async (email) => {
    let connection;
    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, password  FROM users WHERE email = ?`,
            [email]
        );

        //Si no ay users con ese id damos error
        if (users.length < 1) {
            throw generateError('No ay ese usuario en la DB', 404);
        }

        //Retornamos ese usuario en la posición 0 del array
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};
module.exports = selectUserIdQuery;
