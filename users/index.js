const emailModify = require('./emailModify');
const getOwnUser = require('./getOwnUser');
const getUser = require('./getUser');
const loginUser = require('./loginUser');
const newUser = require('./newUser');
const passModify = require('./passModify');
module.exports = {
    passModify,
    loginUser,
    newUser,
    getOwnUser,
    getUser,
    emailModify,
};
