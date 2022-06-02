const opinionDB = require('./opinionsDB');
const userRegisterDB = require('./userRegisterDB');

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
