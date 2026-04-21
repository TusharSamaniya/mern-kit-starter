
# 🌟 MERN Project Setup 🌟

🚀 **A boilerplate project for creating full-stack applications using the MERN stack**
(MongoDB, Express.js, React.js, Node.js). This starter kit includes all essential functionalities to kickstart your project with ease.

## ✨ Features

### 🔒 Authentication

* 🛡️ JWT-based authentication (Signup, Login, Logout).
* 📧 Email verification using  **Nodemailer** .
* 🔄 Refresh tokens for seamless session management.
* 🔐 Two-factor authentication (optional).

### 👥 User Management

* ✏️ Profile CRUD operations.
* 📸 Profile picture upload and management using  **Cloudinary** .
* 🧑‍💻 Role-based access control (Admin, User, etc.).

### 📡 Backend API Features

* 🌐 RESTful API with controllers, routes, and service-based architecture.
* ⚙️ Middleware for authentication, validation, and error handling.
* 🔓 CORS setup for cross-origin requests.

### 🖥️ Frontend Features

* ⚛️ React components with **Redux** for state management.
* 📱 Responsive UI built with  **Tailwind CSS** .
* 🔒 Private and public routes for secure navigation.

### 🔔 Notifications

* 📤 Email notifications for key actions (Password Reset, Verification).
* 🛎️ In-app notification support.

### 🛠️ Admin Panel

* 👨‍💼 Manage users (Create, Block/Unblock, Verify).
* 📨 View and respond to support tickets.

### 📈 Logging and Error Handling

* 📝 Centralized logging using **Winston** and  **Morgan** .
* ❌ Error handling with descriptive messages and status codes.

### 📂 Additional Utilities

* 🖊️ Dynamic form validation.
* 🔑 Forgot password and change password functionality.
* 📂 File uploads and management using  **Cloudinary** .

---

## 🗂️ Project Structure

### ⚙️ Backend

/backend

### 💻 Frontend

```
/frontend  
  /src  
    /components  # Reusable UI components  
    /redux       # State management  
    /pages       # React pages  
    /utils       # Utility functions  
  App.js          # Main React application  
```

## 🛠️ Installation

### ✅ Prerequisites

* 📦 Node.js (v14+)
* 🍃 MongoDB (locally or using a cloud service like Atlas)
* ☁️ Cloudinary account

### 📋 Steps

1. Clone the repository:

```bash
   git clone https://github.com/vipindagar7/mern-project-setup.git  
   cd mern-starter-kit  
```

2. Install dependencies for both backend and frontend:

   ```bash
   cd backend  
   npm install  
   cd ../frontend  
   npm install  
   ```
3. Set up environment variables:Create a `.env` file in the `backend` folder with the following keys:

   ```env
   MONGO_URI=<Your MongoDB URI>  
   JWT_SECRET=<Your JWT Secret>  
   ACCESS_TOKEN_SECRET=<Your Access Token Secret>  
   REFRESH_TOKEN_SECRET=<Your Refresh Token Secret>  
   ACCESS_TOKEN_LIFETIME=10m
   REFRESH_TOKEN_LIFETIME=15d
   EMAIL=<Your Email Address>  
   EMAIL_PASSWORD=<Your Email Password>  
   CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>  
   CLOUDINARY_API_KEY=<Your Cloudinary API Key>  
   CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>  
   ```
4. Start the development server:

   - Backend:
     ```bash
     cd backend  
     npm start  
     ```
   - Frontend~~:~~
     ```bash
     cd frontend  
     npm run dev
     ```
5. **Open your browser at** `http://localhost:3000`. 🎉

## ☁️ Cloudinary Integration

**Cloudinary** is used for managing image and file uploads.

### 🌟 Key Features:

* 📤 Image and file uploads stored in the cloud.
* 🔗 Automatically generated URLs for media access.
* 🛡️ Secure and scalable file handling.

### 🛠️ Usage in Backend:

1. Install Cloudinary and Multer:

```bash
   npm install cloudinary multer multer-storage-cloudinary  
```

2. Set up Cloudinary in the `/backend/config/cloudinary.js` file:

   ```javascript
   const cloudinary = require('cloudinary').v2;  

   cloudinary.config({  
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
     api_key: process.env.CLOUDINARY_API_KEY,  
     api_secret: process.env.CLOUDINARY_API_SECRET,  
   });  

   module.exports = cloudinary;  
   ```
3. Use `multer-storage-cloudinary` for file uploads.
4. ~~:~~

   ## 💻 Tech Stack


   * **Frontend:** React.js, Redux, Tailwind CSS
   * **Backend:** Node.js, Express.js, MongoDB
   * **Utilities:** Nodemailer, Multer, Winston, Morgan, Cloudinary

   ---

   ## 🤝 Contributing

   Contributions are welcome! Here's how you can help:

   1. **Fork the repository.**
   2. **Create a new branch:**

   ```bash
   git checkout -b feature-name  
   ```
5. **Commit your changes:**

   ```bash
   git commit -m "Add your message"  
   ```
6. **Push to the branch:**

   ```bash
   git push origin feature-name  
   ```
7. **Open a pull request.**

## 📜 License

This project is licensed under the  **MIT License** .
