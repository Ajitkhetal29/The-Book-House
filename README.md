# 📚 Library Management System

A full-stack Library Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse, borrow, return books, track fines, and get notified with daily quotes and important alerts.

## 🚀 Live Demo

- Frontend: https://the-book-house.vercel.app/

---

## ✨ Features

### 👥 User Side
- Sign up & Login (JWT Auth)
- View & borrow available books (limit: 2)
- Return books and view fine (if overdue)
- Book wishlist and borrow history
- Daily motivational quotes as notifications
- Notifications for:
  - Welcome
  - Book due reminders
  - Fine reminders
  - Payment confirmations

### 🛠️ Admin Side
- Add, update, delete books
- View all users and their borrow/fine status
- Notifications sent on book addition

---

## 📦 Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS, Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT-based Authentication
- **Notifications**: Cron jobs with Node-Cron
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render

---



git clone https://github.com/your-username/library-management-system.git
