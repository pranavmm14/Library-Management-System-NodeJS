# Backend Application for Library Management System

## Overview
This backend application is built using **Node.js**, **Express.js**, and **MongoDB** (Atlas) to manage a library system. It provides RESTful APIs for users and administrators to interact with the system, such as borrowing and returning books, managing users, and updating book records.

---

## Features
- **User Management**:
  - Register new users.
  - Admin-specific functionalities.
- **Book Management**:
  - Add, update, and delete books (admin-only).
  - Borrow and return books.
  - Check availability of books.
- **Authentication**:
  - JWT-based authentication for secure access.
  - Authorization to restrict admin routes.

---

## Prerequisites
Ensure the following tools are installed:
- **Node.js** (v22 or later)
- **npm** (v11 or later)
- **MongoDB Atlas** (Database)
- **Postman** (for API testing)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pranavmm14/Library-Management-System-NodeJS.git
   cd Library-Management-System-NodeJS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   PORT=3000
   MONGO_URI=<Your MongoDB Atlas URI>
   JWT_SECRET=<Your JWT Secret Key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`.

---

## API Endpoints

### **User Routes**
- **Register User**:
  - `POST /register`
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "username": "johndoe",
      "password": "password123",
      "email": "johndoe@example.com",
      "mobile": "1234567890"
    }
    ```

- **Login User**:
  - `POST /login`
  - Request Body:
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```

- **Get All Users (Admin Only)**:
  - `GET /users`
  - Header:
    ```json
    {
      "Authorization": "Bearer <JWT Token>"
    }
    ```

### **Book Routes**
- **Add Book (Admin Only)**:
  - `POST /books`
  - Header:
    ```json
    {
      "Authorization": "Bearer <JWT Token>"
    }
    ```
  - Request Body:
    ```json
    {
      "name": "Book Name",
      "author": "Author Name",
      "genre": "Genre"
    }
    ```

- **Update Book (Admin Only)**:
  - `PUT /books/:id`
  - Header:
    ```json
    {
      "Authorization": "Bearer <JWT Token>"
    }
    ```
  - Request Body:
    ```json
    {
      "name": "Updated Book Name",
      "author": "Updated Author Name"
    }
    ```

- **Borrow Book**:
  - `POST /borrow`
  - Request Body:
    ```json
    {
      "username": "johndoe",
      "bookid": "<Book ID>"
    }
    ```

- **Return Book**:
  - `POST /return`
  - Request Body:
    ```json
    {
      "username": "johndoe",
      "bookid": "<Book ID>"
    }
    ```

### **Miscellaneous**
- **Get All Books**:
  - `GET /books`

---

## Folder Structure
```plaintext
├── config
│   └── db.cjs              # Database Connection and Configuration
|
├── controllers
│   ├── userController.cjs  # User-related logic
│   └── bookController.cjs  # Book-related logic
|
├── models
│   ├── User.cjs            # User schema
│   ├── Book.cjs            # Book schema
│   ├── Borrow.cjs          # Borrow schema
│   └── Return.cjs          # Return schema
|
├── routes
│   └── Routes.cjs         # All routes
|
├── .env                   # Environment variables (ignored in git)
├── app.cjs                # Express app setup
├── package.json           # npm dependencies
└── README.md              # Documentation
```

---

## Deployment

1. Configure MongoDB Atlas and update the `MONGO_URI` in `.env`.
2. Deploy the application on platforms like:
   - **Render**
   - **Heroku**
   - **AWS Elastic Beanstalk**

---

## Testing
Use **Postman** or any other API testing tool to test the endpoints.

### Steps:
1. Import the API endpoints into Postman.
2. Use the `Authorization` tab for protected routes with `Bearer Token`.
3. Test all CRUD operations for users and books.

---

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/pranavmm14/Library-Management-System-NodeJS/blob/master/LICENSE) file for details.

---

Happy Coding!

