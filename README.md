# BanaoSocial-MERN

## 🚀 Overview

BanaoSocial-MERN is a full-stack social media platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides user authentication, post creation, liking, commenting, and theming functionality with Redux state management.

## 🛠 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, ShadCN, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Passport.js (JWT-based authentication)
- **State Management:** Redux Toolkit with Persist
- **UI Components:** Radix UI, Lucide React

## ✨ Features

- User Authentication (Sign Up, Sign In, Forgot Password, Reset Password)
- Post Creation, Editing, and Deletion
- Commenting and Interacting with Posts (Like, Dislike, Bookmark)
- Dark and Light Theme Switching
- Redux-Persist for state management
- Responsive UI with TailwindCSS

## 📂 Folder Structure

```
me-safwan-07-banaosocial-mern/
├── client/  (Frontend - React with Vite)
│   ├── src/
│   │   ├── components/ (UI components)
│   │   ├── pages/ (Authentication & Home Pages)
│   │   ├── redux/ (State Management)
│   │   ├── hooks/ (Custom Hooks)
│   │   ├── lib/ (Utility functions)
│   │   └── constants/
│   ├── public/ (Static Assets)
│   ├── index.html (Main entry point)
│   ├── package.json
│   └── vite.config.js
├── server/  (Backend - Express & MongoDB)
│   ├── models/ (Mongoose Models)
│   ├── controllers/ (Business Logic)
│   ├── middleware/ (Auth & Validation Middleware)
│   ├── routes/ (API Routes)
│   ├── config/ (Database & JWT Configurations)
│   ├── server.js (Main Backend Entry Point)
│   ├── package.json
│   └── .gitignore
```

## 🏗️ Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or cloud-based e.g., MongoDB Atlas)

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/me-safwan-07/BanaoSocial-MERN.git
   cd BanaoSocial-MERN
   ```

2. **Install dependencies**

   ```sh
   npm run install:client  # Installs frontend dependencies
   npm run install:server  # Installs backend dependencies
   ```

3. **Configure Environment Variables**

   - Create a `.env` file in the `server/` directory with:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the project**

   ```sh
   npm run dev  # Runs both frontend & backend concurrently
   ```

## 🌍 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/forgot-password` - Reset password request

### Posts

- `GET /api/posts/` - Fetch all posts
- `POST /api/posts/` - Create a new post
- `PUT /api/posts/:id` - Edit a post
- `DELETE /api/posts/:id` - Delete a post

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Opense

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**[Muhammed Safwan](https://github.com/me-safwan-07)** - Developer & Maintainer

