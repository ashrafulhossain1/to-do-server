# Task Management Backend

## Short Description
This is the backend for a Task Management Application. It provides APIs to manage tasks categorized into three sections: **To-Do**, **In Progress**, and **Done**. The backend uses **Express.js** and **MongoDB** for handling CRUD operations and persists task data in real-time.

---

## Live Links
- **Backend API**: [https://to-do-server-black.vercel.app/](https://to-do-server-black.vercel.app/)

---

## Dependencies
The following dependencies are used in this project:
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `mongodb`: ^6.12.0

---

## Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ashrafulhossain1/to-do-server
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   USER_DB=your_mongodb_username
   PASS_DB=your_mongodb_password
   ```

4. Start the server:
   ```bash
   nodemon start 
   ```

5. The backend will run on `http://localhost:5000`.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose** (optional, if schema validation is needed)
- **Vercel** (for deployment)

