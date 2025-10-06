<!-- Improved README for TypingTest -->

# ✅ Typing Test

![React](https://img.shields.io/badge/Frontend-ReactJS-61DBFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)

A lightweight, customizable typing practice app built with React and Tailwind CSS. Use it to practice typing, track your speed and accuracy, and compare sessions with helpful stats.

---

## ✨ Highlights
- Real-time typing practice with word-by-word rendering
- Session stats: WPM (words per minute), CPM (characters per minute), and Accuracy
- Theme switching to change the look & feel
- Control how many words appear in a session
- Lightweight and fast (Vite + React)

---

## 🚀 Quick start

These commands assume you have Node.js (v16+) and npm installed.

1) Install dependencies

```bash
npm install
```

2) Run the dev server (hot reload)

```bash
npm run dev
```

---

## 🛠️ Tech stack

- React 19
- Vite (dev server & build)
- Tailwind CSS (styles)
- React Icons

---

## ⚙️ Customization

- Words: Edit `src/Words.json` to change the pool of words used during practice.
- Themes: Check `src/components/Theme.jsx` to add or modify themes.
- Word count: The UI exposes controls to change word count; default logic lives in `src/components/Options.jsx` and `src/components/TypingArea.jsx`.

---

## 📸 Screenshot

<img src="./Blue.png" alt="Typing preview" style="max-width:100%;height:auto;" />

---

Thanks for using Typing Test — happy typing! ⌨️