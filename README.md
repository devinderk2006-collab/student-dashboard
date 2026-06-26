# 📚 EduTrack — Student Performance Dashboard

A full-stack web application for tracking student academic performance, built with React, Python Flask, and MySQL. Features a beautiful dark-themed UI with real-time data visualization.

## 🌐 Live Demo
- **Frontend:** https://effortless-palmier-f735f0.netlify.app
- **Login (Student):** devinder@stu.upes.ac.in / devinder123
- **Login (Admin):** admin@upes.ac.in / admin123

## ✨ Features

### Student Portal
- 📊 Real-time CGPA tracking with animated counters
- 📈 CGPA progression charts across semesters
- 🎯 Skills radar chart showing performance across domains
- 📚 Subject-wise grade breakdown (Assignments, Exams, Practicals)
- 📅 Attendance tracking with warnings for low attendance
- 👤 Editable student profile

### Admin Portal
- 👥 View all students with performance overview
- ➕ Add new students
- ✏️ Edit student information
- 🗑️ Delete students
- 📊 Class-wide statistics (Average CGPA, Attendance)

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts (Data Visualization)
- Framer Motion (Animations)
- React Router DOM

### Backend
- Python Flask
- Flask-SQLAlchemy
- Flask-CORS
- MySQL / PostgreSQL

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD Pipeline
- Netlify (Frontend Deployment)
- Git Version Control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- MySQL

### Installation

1. **Clone the repository**

git clone https://github.com/devinderk2006-collab/student-dashboard.git
cd student-dashboard

2. **Setup Backend**

cd backend
pip install -r requirements.txt

3. **Setup Database**

CREATE DATABASE student_portal;

4. **Configure Environment**

Create backend/.env file:
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/student_portal
SECRET_KEY=your-secret-key

5. **Start Backend**

python app.py

6. **Setup Frontend**

cd frontend
npm install
npm start

## 🐳 Run with Docker

docker-compose up

## 📁 Project Structure

student-dashboard/
├── frontend/          # React application
│   ├── src/
│   │   ├── pages/     # Login, Grades, Attendance, Profile, Admin
│   │   └── Dashboard.jsx
│   └── Dockerfile
├── backend/           # Python Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── deploy.yml
└── docker-compose.yml

## 🔄 CI/CD Pipeline
Automated GitHub Actions pipeline that:
- Runs on every push to master
- Tests frontend build
- Validates backend syntax
- Ensures code quality

## 📸 Screenshots

### Login Page
Clean, modern login with Student/Admin toggle

### Student Dashboard
Real-time CGPA tracking with beautiful charts

### Grades Page
Subject-wise performance with score breakdown

### Admin Panel
Complete student management system

## 👩‍💻 Author
**Devinder Kaur**
- University: UPES Dehradun
- Branch: B.Tech CSE — DevOps
- Year: 2nd Year