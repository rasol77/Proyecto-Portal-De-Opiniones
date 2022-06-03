const opinionDB = require('../modules/opinionsDB');
const userRegisterDB = require('../modules/userRegisterDB');

const main = async () => {
    try {
        await userRegisterDB();
        await opinionDB();
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

main();
