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
// const auth = require('./middlewares/auth');

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const { newUser, loginUser } = require('./controllers/users');

//Registra un nuevo usuario
app.post('/users', newUser);

//Info sobre el usuario con  token
app.post('/login', loginUser);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send({
        message: err.message,
        status: 'Error',
    });
});
/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 404,
        message: 'Not Found',
    });
});

/**
 * ##################
 * ## Server Listen##
 * ##################
 * */
app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`);
});
