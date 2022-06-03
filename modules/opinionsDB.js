const getConnection = require('../db/getConnection');

const opinionDB = async () => {
    let connection;
    try {
        connection = await getConnection();
        console.log('----- Delete (opinions) table -----');

        await connection.query('DROP TABLE IF EXISTS opinions');

        console.log('----- Created (opinions) table -----');

        await connection.query(`
            CREATE TABLE opinions (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                text VARCHAR(280) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = opinionDB;
