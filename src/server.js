// startServer.js
const app = require("./routes");
// This runs the server development environment

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
