// server.js
const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Use the productRoutes for all product-related routes
app.use("/api/products", productRoutes);

module.exports = app;
