# Task Management Web Application

This is a fullstack task management app built with:

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + MongoDB

---

## 📁 Project Structure

```
.
├── client       # React + Vite frontend
├── server       # Node.js + Express backend
└── README.md    # This file
```

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/task-manager-app.git
cd task-manager-app
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

## ⚙️ Environment Variables

### 📌 Create a `.env` file inside the `server/` folder:

```bash
touch server/.env
```

### 📝 Add the following variables:

```env
PORT=5003
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskapp?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

> Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

---

## ▶️ Running the App

### Start the backend server:

```bash
cd server
npm run dev     # or: node index.js
```

### Start the frontend app:

```bash
cd ../client
npm run dev
```

Frontend will run on: [http://localhost:5173](http://localhost:5173)  
Backend will run on: [http://localhost:5003](http://localhost:5003)

---

## 🔐 Authentication

- JWT is stored in `localStorage`
- Token is sent with every request via Axios interceptor
