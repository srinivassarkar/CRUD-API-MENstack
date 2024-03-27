
**CRUD API with Node.js, Express.js, MongoDB, and Mongoose**

This repository contains a basic CRUD (Create, Read, Update, Delete) API built using Node.js, Express.js, MongoDB, and Mongoose. It provides endpoints to interact with a MongoDB database to perform CRUD operations on a collection of products.

### Prerequisites

Before running this project, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB
- Postman or any other API testing tool

### Installation

1. Clone this repository to your local machine using:

```

git clone <repository_url>

```

2. Navigate to the project directory:

```

cd <project_directory>

```

3. Install the dependencies:

```

npm install

```

### Usage

1. Start your MongoDB server.

2. Start the server:

```

npm start

```

3. The API endpoints are now accessible at `http://localhost:3000/`.

4. Use Postman or any other API testing tool to interact with the endpoints.

### Endpoints

- `GET /products`: Get all products
- `GET /products/:id`: Get a single product by ID
- `POST /products`: Create a new product
- `PUT /products/:id`: Update an existing product by ID
- `DELETE /products/:id`: Delete a product by ID


