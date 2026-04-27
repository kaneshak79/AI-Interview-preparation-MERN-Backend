# 🚀 Intervexa AI – Backend (AI Interview Preparation Platform)

An intelligent backend system for AI-powered interview preparation, built using Node.js, Express, MongoDB, and AI integrations (LLM + Razorpay + Cloud services).

This backend powers an AI-driven interview simulator that generates questions, evaluates responses, and tracks user performance.

## 📌 Features

🤖 AI-generated interview questions (LLM-based)

🧠 Dynamic interview session handling

📊 Analytics & performance tracking

💬 User authentication (JWT-based)

💳 Razorpay payment integration

☁️ Cloudinary media storage support

📧 Email notifications (Brevo integration)

🗂️ Interview history tracking

🔐 Secure API with middleware protection

⚡ RESTful API architecture

## 🧰 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Razorpay API

Cloudinary

Brevo (Email service)

## AI Model API (LLM integration like LLaMA / Groq / Gemini)

### 📁 Folder Structure

backend/
│

├── config/

│   ├── cloudinary.js

│   ├── db.js

│   └── razorpay.js
│
├── controllers/

│   ├── aiController.js

│   ├── analytics.controller.js

│   ├── auth.controller.js

│   ├── interview.controller.js

│   ├── media.controller.js

│   ├── payment.controller.js

│   ├── question.controller.js

│   ├── response.controller.js

│   └── user.controller.js
│
├── middleware/

│   └── (auth & validation middleware)
│
├── models/

│   ├── Interview.js

│   ├── Question.js

│   ├── Response.js

│   └── User.js
│
├── routes/

│   ├── aiRoutes.js

│   ├── analytics.routes.js

│   ├── auth.routes.js

│   ├── interview.routes.js

│   ├── media.routes.js

│   ├── payment.routes.js

│   ├── question.routes.js

│   └── response.routes.js
│
├── node_modules/

├── .env

├── app.js / server.js

└── package.json

## ⚙️ Environment Variables

Create a .env file in root:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

### Cloudinary
CLOUD_NAME=your_cloud_name

CLOUD_API_KEY=your_api_key

CLOUD_API_SECRET=your_api_secret

### Email (Brevo)
BREVO_API_KEY=your_brevo_key

BREVO_SENDER_EMAIL=your_email

BREVO_SENDER_NAME=IntervexaAI

### Razorpay
RAZORPAY_KEY_ID=your_key_id

RAZORPAY_KEY_SECRET=your_key_secret

### AI APIs
GEMINI_API_KEY=your_key

GROQ_API_KEY=your_key

## 🚀 Installation & Setup

1. Clone the repository
 
2.git clone https://github.com/your-username/intervexa-ai-backend.git

3.cd intervexa-ai-backend

4. Install dependencies

5. npm install
   
6. Setup environment variables

## Create .env file and add required keys.

Run the server

npm run dev

Server will run at:

http://localhost:5000

## 🧠 AI Flow (Core Logic)

User selects role (Frontend / Backend / Full Stack)

Backend sends prompt to AI model

AI generates interview questions

User answers questions

AI evaluates response (score + feedback)

Data stored in MongoDB

## 📊 System Architecture

Frontend (React)
      ↓
Backend (Express API)
      ↓
AI Services (LLM APIs)
      ↓
MongoDB Database
      ↓
Cloudinary + Email + Razorpay Services

## 🔐 Security Features

JWT Authentication

Password hashing (bcrypt)

Protected routes middleware

Environment variable protection

Input validation

## 👨‍💻 Author

Kanesha K

GitHub: @kaneshak79

## ⭐ Future Enhancements

Real-time interview simulation (WebSockets)

AI coding round evaluation
Resume analyzer module
Leaderboard system
