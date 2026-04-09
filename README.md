# 🚀 AI Resume Builder (MERN Stack)

A full-stack AI-powered Resume Builder web application that enables users to create, edit, analyze, and optimize resumes with real-time preview, ATS scoring, and job matching capabilities.

---

## 🌐 Live Demo

* 🚀 Frontend: https://ai-resume-builder-mern-three.vercel.app
---

## ✨ Features

### 🧾 Resume Builder

* Step-by-step resume creation flow
* Sections included:

  * Personal Information (Name, Email, Phone, Address, Links)
  * Education (with date handling)
  * Professional Summary
  * Experience (with roles & descriptions)
  * Skills (comma-separated dynamic input)
  * Projects (with live links)
* Add / Remove dynamic fields for Education, Experience, Projects

---

### 🎨 Resume Templates

* Multiple professional templates:

  * Modern
  * Classic
  * Minimal
* Real-time preview using iframe
* Print-ready formatting (A4 optimized)

---

### 🤖 AI Resume Analysis

* ATS (Applicant Tracking System) score generation
* AI-based feedback & suggestions
* Resume quality insights
* Re-scan functionality for updated resumes

---

### 📊 Job Match Checker

* Paste job description
* Get match percentage
* Detect missing skills
* Re-check compatibility after edits

---

### 💾 Save & Edit Functionality

* Save resume to database
* Edit existing resumes anytime
* Resume title editing support
* Persistent data via backend API

---

### 🔐 Authentication & Security

* User Signup & Login
* JWT-based authentication
* Protected routes using AuthLayout
* Secure API access using cookies/token

---

### ⚡ Performance & UX

* Clean modern UI using Tailwind CSS
* Toast notifications (success/error/loading states)
* Step navigation sidebar
* Smooth user experience with loading states

---

## 🛠️ Tech Stack

### Frontend

* TypeScript
* React.js
* Tailwind CSS
* React Router DOM
* Context API (Auth Management)
* React Hot Toast
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* REST API Architecture

### Concepts Used

* Authentication & Authorization
* CRUD Operations
* State Management
* API Integration
* AI-based Resume Analysis Logic
* Job Description Matching System

---

## 📂 Project Structure

```
frontend/
  ├── components/
  │   └── layout/
  │ 
  ├── pages/
  │   ├── Home
  │   ├── Dashboard
  │   ├── Login 
  │   ├── Signup
  │   └── EditResume
  ├── context/
  ├── layout/
  ├── services/
  └── App.tsx

backend/
  ├── controllers/
  ├── services/
  ├── models/
  ├── routes/
  ├── middlewares/
  ├── app.ts
  └── server.ts
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/thummarprinsi/ai-resume-builder-mern.git
cd ai-resume
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret_key
GEMINI_API_KEY=your_key
FRONTEND_URI=http://localhost:5173
```

Run backend:
npm run dev
```

---

### 3️⃣ Frontend Setup


cd frontend
npm install
```

Create `.env` file:

VITE_BACKEND_URL=http://localhost:5000/api
```


Run frontend:
npm run dev
```

## 📤 Deployment

### Frontend

* Deploy using Vercel

### Backend

* Deploy using Render / Railway

---

## 🚀 Future Enhancements

* PDF Download Feature (Advanced formatting)
* Drag & Drop Section Reordering
* Public Resume Share Link
* Dark Mode
* More Resume Templates

---

## 👩‍💻 Author

**Thummar Prinsi**
**GitHub Link: https://github.com/thummarprinsi**
MERN Stack Developer passionate about building scalable real-world applications.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub!
