const express = require("express");
const mysql = require("mysql");

const app = express();

// Database connection setup
const connection = mysql.createConnection({
  host: "mahou-db.csu9y7b3a0hk.us-east-1.rds.amazonaws.com",
  user: "anisphia",
  password: "euphyllia",
  database: "test_db",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as ID " + connection.threadId);
});

// Route to fetch data from the 'users' table
app.get("/users", (req, res) => {
  // Query to select all records from the 'users' table
  const query = "SELECT * FROM users";

  // Execute the query
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error querying database: " + error.stack);
      res.status(500).send("Error fetching data from the database");
      return;
    }

    // Send the results as JSON response
    res.json(results);
  });
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
