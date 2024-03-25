// dbConfig.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "endpoint(foo)-db.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "admin",
  database: "db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as ID " + connection.threadId);
});

module.exports = connection;
