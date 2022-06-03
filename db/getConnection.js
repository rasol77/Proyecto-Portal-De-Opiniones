require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

//Variable que almacena un pool de conexiones
let pool;

//Función que retorna conexión libre
const getConnection = async () => {
  try {
    //Si no ay un pool conectado se crea
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: 'Z',
      });
    }
    //Retornamos una conexión libre
    return await pool.getConnection();
  } catch (err) {
    throw new Error('BD no encontrada o Error al conectar con SQL');
  }
};

module.exports = getConnection;
