# Blogify

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://mysocialnet.onrender.com/)
[![GitHub stars](https://img.shields.io/github/stars/petardjorovic/blogify?style=for-the-badge)](https://github.com/petardjorovic/blogify/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/petardjorovic/blogify?style=for-the-badge)](https://github.com/petardjorovic/blogify/network)
[![GitHub issues](https://img.shields.io/github/issues/petardjorovic/blogify?style=for-the-badge)](https://github.com/petardjorovic/blogify/issues)
[![License](https://img.shields.io/github/license/petardjorovic/blogify?style=for-the-badge)](./LICENSE)

---

### 🛠 Tech Stack

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=for-the-badge\&logo=cloudinary\&logoColor=white)

---

## 📸 Preview

*Add your screenshots here*

---

## 📌 About Blogify

**Blogify** is a full-stack social network application where users can create posts, like, comment, and interact in real-time. It is built with **React + Vite** on the frontend, **Node.js + Express** on the backend, and **MongoDB** for data storage. Images are hosted via **Cloudinary**.

---

## 🚀 Features

* 🔐 **Authentication**: Register, login, and secure sessions with JWT
* 📝 **Post Management**: Create, edit, and delete posts
* ❤️ **Likes & Comments**: Interact with other users’ content
* 🔍 **Search & Filters**: Quickly find posts by title or category
* 👤 **User Profiles**: View and edit user info
* ☁️ **Cloud Image Uploads** via Cloudinary
* 📱 **Responsive UI** powered by TailwindCSS

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/petardjorovic/Blogify.git
cd blogify
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Run the App

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd ../frontend
npm run dev
```

The app will run on:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`

---

## 📂 Project Structure

```
Blogify/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 🌐 API & Authentication

| Method | Endpoint           | Description         | Auth Required |
| ------ | ------------------ | ------------------- | ------------- |
| POST   | /api/auth/register | Register a new user | ❌             |
| POST   | /api/auth/login    | Login user          | ❌             |
| GET    | /api/posts         | Get all posts       | ❌             |
| POST   | /api/posts         | Create a new post   | ✅             |
| PUT    | /api/posts/\:id    | Update a post       | ✅             |
| DELETE | /api/posts/\:id    | Delete a post       | ✅             |

---

## 👤 Author

**Petar Djorovic**
[GitHub](https://github.com/petardjorovic) • [LinkedIn](https://linkedin.com/in/petar-djorovic)

---

### 🌐 Live Demo

[https://mysocialnet.onrender.com/](https://mysocialnet.onrender.com/)
