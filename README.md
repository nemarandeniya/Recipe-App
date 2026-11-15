# 🍽️ GustoHub — MERN Recipe App

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Local-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> **GustoHub** is a modern, full-stack recipe management web application built with the **MERN** stack (MongoDB, Express, React 19, Node.js). It empowers users to explore culinary recipes, create and publish custom recipes with dynamic ingredients, search & paginate through catalog items, bookmark favorites to a personal collection, and toggle between dark and light themes seamlessly.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
- [Scripts](#-scripts)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

- **🔐 User Authentication & Authorization**:
  - Secure registration and login using **JWT (JSON Web Tokens)** and **bcrypt** password hashing.
  - Persistent login session handling using cookies and local storage.

- **📖 Recipe Discovery & Browsing**:
  - Paginated recipe feed powered by server-side pagination.
  - Instant client-side search filtering by recipe name.
  - Interactive recipe preview modal displaying ingredients, step-by-step instructions, and cooking time.

- **✍️ Recipe Creation**:
  - Add new recipes with title, cooking time, instructions, and image URL.
  - **Dynamic ingredient builder**: add multiple ingredients dynamically on the fly.
  - Automatically associates recipes with the authenticated author.

- **❤️ Saved Recipes Collection**:
  - Bookmark favorite recipes to your personal profile with one click.
  - Dedicated Saved Recipes page to view and manage bookmarked dishes.
  - Easily remove recipes from your saved collection.

- **🌓 Dark & Light Mode**:
  - Built-in theme switcher with smooth animated transitions using Context API and Tailwind CSS.

- **🎨 Modern Animated UI**:
  - Smooth interactive micro-interactions built with **Framer Motion**.
  - Clean notifications with **React Toastify**.
  - Modern icons from **React Icons** (`react-icons/gi`, `react-icons/fa`).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State & Storage**: React Context API (`ThemeContext`), `react-cookie`
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications & Icons**: [React Toastify](https://fkhadra.github.io/react-toastify/), [React Icons](https://react-icons.github.io/react-icons/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM 9](https://mongoosejs.com/)
- **Authentication**: [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken), [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Utilities**: [cors](https://github.com/expressjs/cors), [dotenv](https://github.com/motdotla/dotenv), [nodemon](https://nodemon.io/)

---

## 📁 Project Architecture

```plaintext
RecipeApp/
├── Client/                     # Frontend React (Vite) application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images and SVG icons
│   │   ├── Context/            # ThemeContext (Dark / Light mode)
│   │   ├── hooks/              # Custom hooks (e.g. useGetUserID)
│   │   ├── Views/              # Views and components
│   │   │   ├── CreateRecipe.jsx# Recipe creation form
│   │   │   ├── Dashboard.jsx   # Dashboard page
│   │   │   ├── Home.jsx        # Recipe feed & search view
│   │   │   ├── Login.jsx       # User login page
│   │   │   ├── Navbar.jsx      # Navigation bar & theme switcher
│   │   │   ├── RecipeCard.jsx  # Recipe card & details modal
│   │   │   ├── SaveRecipe.jsx  # Saved/favorite recipes view
│   │   │   └── Signup.jsx      # User registration page
│   │   ├── App.jsx             # App root & routing setup
│   │   ├── index.css           # Tailwind CSS imports
│   │   └── main.jsx            # Application entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Server/                     # Backend Express REST API
│   ├── src/
│   │   ├── config/             # Database connection (MongoDB)
│   │   ├── models/             # Mongoose schemas (Users, Recipes)
│   │   ├── routes/             # Express route handlers
│   │   │   ├── auth.js         # Authentication endpoints (/register, /login)
│   │   │   └── recipe.js       # Recipe CRUD & bookmark endpoints
│   │   └── index.js            # Express server initialization
│   ├── .env                    # Environment variables (do not commit)
│   ├── .env.sample             # Sample environment variables template
│   └── package.json
└── README.md
```

---

## 📡 API Reference

Base URL: `http://localhost:3001`

### 1. Authentication Routes (`/auth`)

| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | `{ "username": "...", "password": "..." }` |
| `POST` | `/auth/login` | Login user & return JWT token | `{ "username": "...", "password": "..." }` |

### 2. Recipe Routes (`/recipes`)

| Method | Endpoint | Description | Query / Body Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/recipes` | Get paginated recipe list | Query: `?page=1&limit=3` |
| `POST` | `/recipes` | Create a new recipe | `{ name, ingrediants, instructions, imageUrl, cookingTime, userOwner }` |
| `PUT` | `/recipes` | Save/bookmark recipe to user profile | `{ recipeId, userId }` |
| `GET` | `/recipes/savedRecipes/ids/:userID` | Get array of saved recipe IDs | `userID` in URL params |
| `GET` | `/recipes/savedRecipes/:userID` | Get full details of saved recipes | `userID` in URL params |
| `POST` | `/recipes/removerecipe` | Remove recipe from saved collection | `{ userId, recipeID }` |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB service or a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster)
- [Git](https://git-scm.com/)

---

### Installation & Setup

#### 1. Clone the repository
```bash
git clone https://github.com/nemarandeniya/Recipe-App.git
cd Recipe-App
```

#### 2. Backend Setup
Navigate into the `Server` directory:
```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory based on `.env.sample`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipe_app?retryWrites=true&w=majority
TOKEN_KEY=your_super_secret_jwt_key
```

Start the backend server (runs with Nodemon on port `3001`):
```bash
npm start
```
You should see:
```plaintext
Server Started
Database Connected
```

#### 3. Frontend Setup
Open a new terminal window, navigate into the `Client` directory:
```bash
cd Client
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to:
```plaintext
http://localhost:5173
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `Server/` directory:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Connection String (Atlas URI or Local URI) | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `TOKEN_KEY` | Secret key used to sign and verify JWT authentication tokens | `your_secret_jwt_key_here` |

---

## 📜 Scripts

### Client (`/Client`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production bundle.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint checks.

### Server (`/Server`)
- `npm start`: Starts the Express server with `nodemon` for hot reloading.

---

## 🗺️ Roadmap

- [ ] Image upload via Cloudinary or AWS S3.
- [ ] Recipe category and cuisine filters (e.g. Italian, Mexican, Vegan, Desserts).
- [ ] User profile customisation (bio, avatar, published recipes list).
- [ ] Recipe ratings and comment reviews.
- [ ] Recipe editing and deletion for authors.

---

## 🤝 Contributing

Contributions are always welcome!

1. **Fork** the project repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👨‍💻 Author

**Nema Randeniya**
- GitHub: [@nemarandeniya](https://github.com/nemarandeniya)
- Repository: [Recipe-App](https://github.com/nemarandeniya/Recipe-App)
