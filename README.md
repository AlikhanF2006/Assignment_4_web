## 🔹 Steam-Style Game Website
Overview

This project is a Steam-style multi-page gaming website created as part of the Web Development Assignment 4.
It includes multiple HTML pages, custom CSS styles, and JavaScript functionality for interactivity and responsiveness.


- index.html — main page with featured games and navigation  
- about.html — information about the platform  
- community.html — community section with posts  
- recommendation.html — recommended games page  
- support.html — contact and feedback form  
- notfound.html — 404 error page  
- [game pages] — individual pages for each game (PUBG, Dota 2, Genshin Impact, etc.)


## 🔹 Features
Fully responsive design (desktop, tablet, mobile)

Light/Dark theme switch

Interactive navigation and sidebar

Game pages for PUBG, Dota 2, Genshin Impact, GTA, Witcher, and more

Dynamic clock and UI effects using JavaScript

Custom error page (notfound.html)

Separate CSS and JS files for each section


```STEAM PROJECT
│
├── Css/
│   ├── about.css
│   ├── community.css
│   ├── game.css
│   ├── notfound.css
│   ├── recomm.css
│   ├── steamcss.css
│   └── support.css
│
├── Photos/
├── Sounds/
│
├── index.html
├── about.html
├── community.html
├── recommendation.html
├── support.html
├── notfound.html
│
├── pubg.html
├── dota2.html
├── genshinindex.html
├── gta.html
├── witcher.html
├── skyrim.html
├── stardewvalley.html
├── terraria.html
│
├── games.js
├── recomm.js
├── support.js
├── script.js
└── community.js
```

## 🔹 Responsive Design
The website adapts to all screen sizes — desktop, tablet, and mobile.  
Built with Bootstrap 5.3.3, flexbox, and custom media queries for smooth layout transitions.


## 🔹 Hosting
The website is hosted on GitHub Pages.
https://alikhanf2006.github.io/Assignment_4_web/


## 🔹 4. Design Quality
The design is clean, polished, and professional.
All pages are visually consistent, with balanced layout, spacing, and typography.
The color scheme is readable and maintains good contrast in both light and dark modes.
All interface elements are relevant to the project’s gaming theme — no placeholders or unnecessary blocks.
Icons, buttons, and images match the overall Steam-inspired style, ensuring a cohesive look and user-friendly experience.


## 🔹 Light and Dark Modes    
The website supports **both light and dark modes** with an easy toggle in the header.  
The selected theme is **saved in localStorage** and automatically applies on every page.  
Styles are unified via shared CSS variables, ensuring consistent appearance.  


## 🔹 Authentication System  
The project includes a **functional authentication system** built with **JavaScript and LocalStorage**.  
Users can **register, log in, and stay signed in** between sessions.  
All inputs (name, email, password) are validated, and clear error messages are shown when necessary.  

- User info is saved under `steam:user`  
- Active session stored as `steam:session`  
- System works seamlessly across all pages and popups


## 🔹 Form Validation & Local Storage Features
All forms include full validation to ensure correct input and user safety:

Checks for password length and complexity

Email format validation

Ensures required fields are completed before submission

All entered data (where appropriate) is saved in LocalStorage for user convenience — including:

User accounts and sessions

Ratings and search results

Theme preference (light/dark)

Form validation and data saving work correctly and consistently across all pages.


## 🔹 Search and Filtration Features
The website includes search and filter functionality for easier navigation and user experience.
Search history and filtered results are saved in LocalStorage, so users can revisit their recent searches without retyping.
All added buttons and interface elements are fully functional — no placeholders or inactive features.

Search, filters, and buttons work correctly and improve usability.

  
## 🔹 External API Integration  
This project uses the **RAWG Video Games Database API** to display real game data — titles, genres, release dates, and ratings.  
The integration is handled via JavaScript using `fetch()` requests to the [RAWG API](https://rawg.io).  
Dynamic rendering makes game pages realistic and interactive.  


## 🔹 Feature Cohesion and Relevance to Project Theme 
All features and design elements are closely aligned with the gaming theme of the project.
Every component — from the layout and color scheme to interactive features like theme switching, search, and rating — supports the overall Steam-style concept.
There are no unrelated or unnecessary elements; everything serves a clear purpose and contributes to a smooth, engaging user experience.


## 🔹 Authors
POCHINKI Team

Developed by:

Faizrakhman Alikhan, Safaryan Artyom
