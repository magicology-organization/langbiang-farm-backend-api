// dbConfig.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mahou-db.csu9y7b3a0hk.us-east-1.rds.amazonaws.com",
  user: "anisphia",
  password: "euphyllia",
  database: "langbiang-farm-system",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as ID " + connection.threadId);
});

module.exports = connection;
