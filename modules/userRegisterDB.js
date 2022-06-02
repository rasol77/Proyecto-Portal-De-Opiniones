const getConnection = require('./getConnection');

const userRegisterDB = async () => {
  let connection;
  try {
    connection = await getConnection();
    console.log('----- Delete (users) table -----');

    await connection.query('DROP TABLE IF EXISTS users');

    console.log('----- Created (users) table -----');

    await connection.query(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
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

module.exports = userRegisterDB;
