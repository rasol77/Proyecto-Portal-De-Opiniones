const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const insertUserQuery = async (email, password) => {
    let connection;

    try {
        connection = await getConnection();

        //Obtenemos un array de usuarios que asigne la condición
        const [users] = await connection.query(
            `SELECT id from users WHERE email = ?`,
            [email]
        );

        // Para que no se logue un usuario con el mismo email.
        if (users.length > 0) {
            throw generateError(
                'Ya hay un usuario con ese mismo email en la DB',
                409
            );
        }

        //Encriptamos la password
        const hashPassword = await bcrypt.hash(password, 10);

        //Creamos el usuario.
        const [newUser] = await connection.query(
            `INSERT INTO users (email, password) VALUES(?, ?)`,
            [email, hashPassword]
        );

        //id del elemento
        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
