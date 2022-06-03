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
const auth = require('./middlewares/auth');

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const {
    newUser,
    loginUser,
    getUser,
    getOwnUser,
    emailModify,
    passModify,
} = require('./controllers/users');

//Registra un nuevo usuario
app.post('/users', newUser);

//Login de usuario
app.post('/login', loginUser);

//Información sobre el usuario
app.get('/users/:idUser', getUser);

//Info del usuario con token
app.get('/users', auth, getOwnUser);

//Para cambiar el email
app.put('/email', auth, emailModify);

//Para modificar la password
app.put('/password', auth, passModify);

/**
 * #########################
 * ## Endpoints Opiniones ##
 * #########################
 */

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
