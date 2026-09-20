# 🔗 Trimzo — URL Shortener

A full-stack URL shortener with quick link shortening via API or UI

**Live Demo:** [Frontend](https://trimzo.vercel.app/) | [Backend API](https://trimzo-api.onrender.com/api)

---

## ✨ Features

- 🔗 Shorten long URLs
- ✏️ Optional custom aliases
- 👤 Guest users can create links (stored locally)
- 🔄 Links are saved to your account after login/signup
- 🔐 JWT-based authentication

---

## 🧠 How it works

- When not logged in, links are stored in `localStorage`
- After logging in or signing up, those links are synced to your account
- Authenticated users have persistent access to their links
- Developers can interact directly with the Trimzo API using the [`/api/shortenUrl`](https://trimzo-api.onrender.com/) endpoints

---

## 🛠️ Tech Stack

**Frontend**: React + TypeScript, TailwindCSS, TanStack Query
**Backend**: Node.js + Express, JWT Authentication, Mongoose

---

## ⚠️ Note

The backend is hosted on a free service.
The first request may take a few seconds due to cold starts.

---

## 🚀 Run Locally

```bash
git clone https://github.com/hlakokabelo/trimzo.git
cd trimzo

# backend
cd backend && npm install && npm run dev

# frontend
cd ../frontend && npm install && npm run dev
```

---

## 📁 Structure

```
/frontend   → React app
/backend    → Express API
```

---

## 📜 License

MIT
