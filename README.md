https://clairypeng-dotcom.github.io/0916/https://clairypeng-dotcom.github.io/0916/

[http://localhost:8080
](https://clairypeng-dotcom.github.io/0916/)# 🚀 Pengjie - Modern Personal Portfolio & Real-Time Clock

A sleek, responsive personal portfolio website with an interactive JavaScript real-time clock widget, designed specifically for zero-configuration hosting on **GitHub Pages**.

![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen?style=flat-square&logo=github)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-blue?style=flat-square)
![Pure HTML/CSS/JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-orange?style=flat-square)

---

## ✨ Features

- ⏱️ **Precision Real-Time Clock**:
  - Dual analog clock face with smooth ticking hands and glowing futuristic digital display.
  - 12-hour / 24-hour mode switch.
  - Automatic timezone detection and live GMT offset display.
  - Smart status indicator based on local time (*In Focus Work Hours* vs *Recharging*).
  - World clocks mini-dashboard (Beijing/Shanghai, Tokyo, London, New York, San Francisco).
- 🌓 **Dynamic Theme Switcher**:
  - Dark mode by default with modern glassmorphism aesthetics and glowing radial accents.
  - Instant Light mode toggle with persistent preferences saved to `localStorage`.
- 🛠️ **Interactive Skills & Project Filtering**:
  - Categorized skill cards with tags and proficiency indicators.
  - Filterable project showcase cards with live demo links and GitHub links.
- 📱 **Fully Responsive & Accessible**:
  - Tailored layouts for desktop, tablet, and mobile with a sliding navigation drawer.
- 📬 **Interactive Contact Section**:
  - One-click copy email button with visual toast feedback.
  - Direct message form simulator with responsive notifications.

---

## 📂 Project Structure

```text
.
├── index.html        # Main semantic HTML5 document
├── style.css         # Modern CSS3 design system, dark/light themes & animations
├── script.js         # Real-time clock engine, skills/projects data & UI logic
├── assets/
│   └── avatar.jpg    # Profile portrait picture
└── README.md         # Documentation & GitHub Pages deployment guide
```

---

## 🌐 Deploy to GitHub Pages in 2 Minutes

Because this site is built using pure modern HTML5, CSS3, and Vanilla JavaScript, there is **no build step, no Node.js compilation, and no bundler required**.

### Option 1: Personal User Site (`https://<username>.github.io`)

1. Create a new GitHub repository named: `<username>.github.io` (replace `<username>` with your GitHub handle).
2. Open your terminal in this project directory:
   ```bash
   git init
   git add .
   git commit -m "feat: initial modern personal portfolio with real-time clock"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```
3. Your site will automatically go live at `https://<username>.github.io` within seconds!

### Option 2: Project Repository (`https://<username>.github.io/portfolio`)

1. Create a repository on GitHub (e.g., `portfolio`).
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial personal portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/portfolio.git
   git push -u origin main
   ```
3. Go to your repository **Settings** on GitHub:
   - Navigate to **Pages** in the left sidebar.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch: `main`, folder: `/ (root)`.
   - Click **Save**.
4. Your website is now live!

---

## ⚙️ Customization Guide

All personal data, skills, and projects are centralized for easy updating:

### 1. Update Personal Info & Socials
- Open `index.html`:
  - Search for `Pengjie` to edit your name or title.
  - Search for `pengjie.dev@example.com` to change your public contact email.
  - Update the GitHub, LinkedIn, and X/Twitter URLs under `<div class="social-links">`.

### 2. Update Profile Picture
- Replace `assets/avatar.jpg` with your own image, or point `<img id="profile-avatar">` in `index.html` to any image URL.

### 3. Add or Edit Skills & Projects
- Open `script.js`:
  - Modify `SkillsData` array: add/remove skills, change categories (`frontend`, `backend`, `devops`, `core`).
  - Modify `ProjectsData` array: update project titles, descriptions, live demo links, and tech badges.

---

## 💻 Local Preview

You can test locally using any simple web server:

```bash
# Using Python:
python3 -m http.server 8080

# Or using npx:
npx serve .
```
Then open `http://localhost:8080` in your web browser.
