
---

# Task Manager API

## About The Project

This project provides a simple Express.js API for managing tasks. It allows you to perform basic CRUD operations (Create, Read, Update, Delete) on tasks.

The purpose of this API is to demonstrate how to create a basic RESTful API using Express.js and perform CRUD operations on JSON data stored locally.

## Built With

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [fs (File System)](https://nodejs.org/api/fs.html) - For reading and writing JSON data
- [Validator](https://www.npmjs.com/package/validator) - A custom validation helper

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```

## Usage

### Retrieve all tasks
```http
GET /tasks
```

### Retrieve a specific task
```http
GET /tasks/:id
```

### Create a new task
```http
POST /tasks
```


### Update an existing task
```http
PUT /tasks/:id
```


### Delete a task
```http
DELETE /tasks/:id
```
