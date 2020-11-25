require ('dotenv').config();
module.exports = {
    database: {
  connectionLimit: 10,
    host: process.env.host, 
    user: "root",//process.env.user,
    password: "333atl1998", //process.env.password, 
    port: process.env.PORT, 
    database: "ecommerce", //process.env.database,
    insecureAuth: true
    }

};