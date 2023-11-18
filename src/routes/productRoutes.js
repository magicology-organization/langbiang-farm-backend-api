// productRoutes.js
const express = require("express");
const connection = require("../dbConfig");
const productRoutes = express.Router();

productRoutes.get("/", (req, res) => {
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

productRoutes.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  const productQuery = `
      SELECT
        p.ProductID,
        p.Name AS ProductName,
        p.Description AS ProductDescription,
        p.Price,
        c.Type AS CategoryType,
        c.Description AS CategoryDescription
      FROM Product p
      JOIN Category c ON p.CategoryID = c.CategoryID
      WHERE p.ProductID = ?;
    `;

  const detailsQuery = `
      SELECT ProductID, IllustrateImage, ImageDescription
      FROM ProductDetails
      WHERE ProductID = ?
      ORDER BY ProductID;
    `;

  // Execute the product query
  connection.query(productQuery, [productId], (err, productResult) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Execute the details query
      connection.query(detailsQuery, [productId], (err, detailsResult) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          // Merge details into an array
          const productWithDetails = {
            ...productResult[0],
            details: detailsResult,
          };
          res.json(productWithDetails);
        }
      });
    }
  });
});

productRoutes.get("/category/:categoryid", (req, res) => {
  const categoryId = req.params.categoryid;

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
        WHERE CategoryID = ${categoryId}
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

module.exports = productRoutes;
