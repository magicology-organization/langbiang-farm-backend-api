const express = require("express");
const mysql = require("mysql");

const app = express();

// Database connection setup
const connection = mysql.createConnection({
  host: "mahou-db.csu9y7b3a0hk.us-east-1.rds.amazonaws.com",
  user: "anisphia",
  password: "euphyllia",
  database: "langbiang-farm-system",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as ID " + connection.threadId);
});

app.get("/api/products", (req, res) => {
  const query = `
    SELECT ProductID, ProductName, Price, CategoryID, CategoryType, CategoryDescription, IllustrateImage, ImageDescription
    FROM (
      SELECT
        ProductID,
        ProductName,
        Price,
        CategoryID,
        CategoryType,
        CategoryDescription,
        IllustrateImage,
        ImageDescription,
        ROW_NUMBER() OVER (PARTITION BY ProductID ORDER BY IllustrateImage) AS RowNum
      FROM ProductWithDetails
    ) AS RankedProducts
    WHERE RowNum = 1;
  `;

  // Execute the query
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
