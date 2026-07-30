# 🌿 Environmental Awareness & Carbon Footprint Calculator

A responsive, front-end-only web application that helps people understand and
reduce their daily carbon footprint. Built as a **B.Sc Computer Science Final
Year Project**, using nothing but **HTML5, CSS3, and Vanilla JavaScript**.

---

## 📖 Project Description

Every day, our transportation, electricity use, food choices, and plastic
consumption add up to a personal "carbon footprint" — the amount of CO₂ we
each contribute to the atmosphere. This calculator lets a user enter a few
simple daily habits and instantly see:

- Their estimated carbon footprint in **kg CO₂/day**
- A category rating (**Excellent / Moderate / High**)
- An animated progress bar visualizing their impact
- Personalized suggestions to reduce emissions
- A bar chart breaking down emissions by category
- General environmental awareness tips

The goal is to make an abstract concept (carbon emissions) concrete and
actionable, in a friendly, nature-themed interface.

---

## ✨ Features

- 🌍 Modern, nature-inspired green UI with smooth animations
- 📱 Fully responsive layout (desktop, tablet, mobile)
- 🧮 Real-time carbon footprint calculator with input validation
- 📊 Animated progress bar with color-coded impact levels
- 💡 Dynamic, category-based suggestions (High / Moderate / Low footprint)
- 📈 Interactive bar chart of emissions by category (Chart.js)
- 🃏 Informational cards on Transportation, Electricity, Food & Plastic
- 🌱 Environmental Awareness tips section with hover animations
- 🔁 Reset button to clear the form and results
- ⏳ Loading animation before results are displayed
- 🔼 Scroll-to-top button and smooth scrolling navigation
- 🍔 Responsive hamburger navigation bar for mobile devices
- ♿ Respects `prefers-reduced-motion` for accessibility

---

## 🛠️ Technologies Used

| Technology         | Purpose                                   |
|--------------------|--------------------------------------------|
| HTML5              | Page structure and semantic markup          |
| CSS3               | Styling, Flexbox, Grid, animations, media queries |
| Vanilla JavaScript | Calculation logic, DOM manipulation, validation |
| Font Awesome       | Icons throughout the UI (via CDN)           |
| Chart.js           | Emissions bar chart visualization (via CDN) |

> No frameworks (React/Bootstrap), no backend, and no database are used —
> this is a 100% static, client-side website.

---

## 📁 Folder Structure

```
Environmental-Carbon-Calculator/
│
├── index.html      # Main HTML page (all sections)
├── style.css        # All styling, theme variables & responsive rules
├── script.js         # Calculator logic, validation, chart & interactions
├── images/           # Folder reserved for any additional image assets
└── README.md         # Project documentation (this file)
```

---

## ▶️ How to Run

1. Download or clone this project folder.
2. Open the `Environmental-Carbon-Calculator` folder.
3. Double-click **`index.html`** — it will open directly in your default
   web browser.
4. No installation, server, or build steps are required. Everything runs
   entirely in the browser.

> 💡 Tip: For the best experience (and to avoid any browser restrictions on
> local files), you can also right-click `index.html` → **Open with** → your
> preferred browser, or serve the folder with any simple static server, e.g.
> `npx serve` or the VS Code "Live Server" extension.

---

## 🧮 Calculation Logic

| Category        | Formula                                  |
|------------------|-------------------------------------------|
| Transportation   | `distance (km) × 0.21`                    |
| Electricity      | `units × 0.82`                             |
| Food             | Vegetarian = `2`, Non-Vegetarian = `5`     |
| Plastic          | No Plastic = `0`, 1–3 items = `1`, 3+ items = `2` |
| **Total**        | Transport + Electricity + Food + Plastic   |

**Result classification:**

| Range              | Category   | Color  |
|--------------------|------------|--------|
| Less than 10        | Excellent  | 🟢 Green  |
| 10 – 20             | Moderate   | 🟠 Orange |
| Above 20            | High       | 🔴 Red    |

---

## 📸 Screenshots

> _Add your own screenshots here after running the project locally._

- Hero Section: `images/screenshot-hero.png`
- Calculator & Results: `images/screenshot-calculator.png`
- Awareness Section: `images/screenshot-awareness.png`
- Statistics Chart: `images/screenshot-stats.png`

---

## 🚀 Future Enhancements

- Save calculation history using browser `localStorage`
- Add a monthly/yearly footprint projection
- Multi-language support for wider accessibility
- Downloadable PDF report of results
- Dark mode toggle
- Country-specific emission factors for more accurate results
- Social sharing of results/achievements

---

## 👨‍🎓 Credits

**Project Name:** Environmental Awareness and Carbon Footprint Calculator
**Developed for:** B.Sc Computer Science Final Year Project
**Built with:** HTML5, CSS3 & Vanilla JavaScript

© 2026 EcoTrack. All rights reserved.
