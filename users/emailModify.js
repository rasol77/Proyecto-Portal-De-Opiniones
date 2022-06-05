const UpdateEmailQuery = require('../../db/userQueries/updateEmailQuery');
const { generateError } = require('../../helpers');

const emailModify = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            await generateError('email no correcto', 401);
        }

        const UpdateEmail = await UpdateEmailQuery(email, req.idUser);
        res.send({
            status: 'ok',
            data: {
                UpdateEmail,
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = emailModify;
