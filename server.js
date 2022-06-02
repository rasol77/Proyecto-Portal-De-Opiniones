require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

//Body
app.use(express.json());
/**
 * ########################
 * ##   Middlewares     ##
 * ########################
 */
const gentToken = require('./middlewares/genToken');
gentToken;

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const { newUser, getTokenUser } = require('./controllers/users');

//Registra un nuevo usuario
app.post('/user', newUser);

//Info sobre el usuario con  token
app.post('/login', getTokenUser);

app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`);
});
