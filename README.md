# 🚀 Pradeep S — MERN Stack Portfolio

A full-stack developer portfolio built with **MongoDB · Express · React · Node.js**, featuring a live contact form that saves enquiries to MongoDB **and** sends email notifications via Gmail.

---

## 📁 Project Structure

```
portfolio-mern/
├── client/                  # ⚛️  React Frontend (Vite)
│   ├── public/
│   │   └── img/             # ← Put your images here (pradeep.jpg, internproject.jpg …)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── BarsBox.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Service.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # 🟢  Node.js + Express Backend
│   ├── models/
│   │   └── Contact.js       # Mongoose schema
│   ├── routes/
│   │   └── contact.js       # POST /api/contact + GET /api/contact
│   ├── server.js            # Entry point
│   ├── .env.example         # Copy this to .env and fill values
│   └── package.json
│
├── package.json             # Root — runs both servers together
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone / Download the project

```bash
cd portfolio-mern
```

### 2. Install all dependencies

```bash
npm run install-all
```

### 3. Configure environment variables

```bash
cd server
cp .env.example .env
```

Open `server/.env` and fill in:

```env
MONGO_URI=mongodb://localhost:27017/portfolio_db
PORT=5000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password      # See "Gmail App Password" below
EMAIL_TO=pradeepp54980@gmail.com
CLIENT_URL=http://localhost:5173
```

### 4. Add your images

Place your images inside `client/public/img/`:
- `pradeep.jpg` — your profile photo
- `internproject.jpg` — project screenshot
- `green.png`, `orege.png`, `purple.png` — project placeholders

### 5. Start the development servers

```bash
# From root folder — starts BOTH frontend and backend
npm run dev
```

- Frontend → http://localhost:5173
- Backend  → http://localhost:5000
- API test → http://localhost:5000/api/health

---

## 📧 Gmail App Password Setup

> Regular Gmail passwords do **not** work. You need an **App Password**.

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already done)
3. Search "App passwords" → Select app: **Mail** → Select device: **Other** → type "Portfolio"
4. Copy the 16-character password → paste it in `.env` as `EMAIL_PASS`

---

## 🗄️ MongoDB Options

**Option A — Local MongoDB**
```
MONGO_URI=mongodb://localhost:27017/portfolio_db
```
Install MongoDB Community Edition: https://www.mongodb.com/try/download/community

**Option B — MongoDB Atlas (Free Cloud)**
1. Create free account at https://cloud.mongodb.com
2. Create a cluster → Database Access → Add user
3. Network Access → Allow 0.0.0.0/0
4. Connect → Copy connection string
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio_db
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/health` | Health check |
| `POST` | `/api/contact` | Save enquiry + send emails |
| `GET`  | `/api/contact` | Retrieve all enquiries |

### POST /api/contact — Request body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Project Enquiry",
  "message": "Hello Pradeep, I'd like to discuss..."
}
```

---

## 🚀 Deploy to Production

**Frontend** → [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
```bash
cd client && npm run build  # Creates dist/ folder
```

**Backend** → [Railway](https://railway.app) or [Render](https://render.com)
- Set the environment variables in the platform dashboard
- Point to `server/server.js` as the entry file

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS3, Boxicons |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Email | Nodemailer (Gmail SMTP) |
| HTTP Client | Axios |
| Dev Tools | Nodemon, Concurrently |

---

Made with 💚 by **Pradeep S**
