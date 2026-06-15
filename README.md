# JobOrbit 🚀

A modern, full-stack MERN (MongoDB, Express, React, Node.js) application designed to help job seekers seamlessly track, manage, and analyze their job and internship applications.

## ✨ Features
- **Secure Authentication**: JWT-based user login and registration.
- **Intuitive Dashboard**: Visual statistics showing applications by status (Applied, Interview, Offer, Rejected).
- **Application Management**: Full CRUD capabilities to add, edit, and delete job applications.
- **Priority Tracking**: Keep tabs on High, Medium, and Low priority opportunities.
- **Modern UI/UX**: Built with Vite, React, and TailwindCSS v4 featuring a clean, responsive, glassmorphic design.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, TailwindCSS v4, React Router, Context API, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas, Mongoose.
- **Security**: bcryptjs (password hashing), jsonwebtoken (JWT).

## 🚀 Running Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas connection string

### 1. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
PORT=5000
```
Run the backend:
```bash
npm run dev
```

### 2. Setup the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173` in your browser.
