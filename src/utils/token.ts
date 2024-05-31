// import config from "../config/config";
// import MySQL from '../db/mysql';
import MySQL from '../lib/mysql';




export const generateAccessToken2 = async () => {
  try {
    const connection = new MySQL({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    const result = await connection.executeQuery(
      "SELECT * FROM `camunda`.`token`"
    );

    connection.closeConnection();

    if (result) {
      return result[0].token_session;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// module.exports = {
//   generateAccessToken2,
// };
