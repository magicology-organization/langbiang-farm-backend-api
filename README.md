# Langbiang Farm Backend API

This repository contains the backend API for Langbiang Farm, built using Express.js and managed with npm. To get started, follow the installation guidelines below.

## Installation

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) installed on your machine

### Clone the Repository

```bash
git clone https://github.com/magicology-organization/langbiang-farm-backend-api.git
cd langbiang-farm-backend-api
```

### Install Dependencies

```bash
npm install
```

## Running the Application

### Development Mode

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the server on `http://localhost:3000` by default. You can change the port in `src/server.js` if needed.

```javascript
// src/server.js
const app = require("./routes");

const PORT = 3000; // Change this to your desired port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Serverless Deployment

For serverless deployment, the entry point is in `api/index.js`. This exports the Express app, and you can use it for serverless deployments.

```javascript
// api/index.js
import app from "../src/routes";

export default app;
```

## Contributing

If you'd like to contribute to this project, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
