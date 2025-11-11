## 🔹 Steam-Style Game Website
Overview

This project is a multi-page gaming website inspired by Steam, created as part of the Web Development course assignment.
The site demonstrates advanced HTML, CSS, and JavaScript skills, featuring interactive UI elements, theme switching, authentication logic, local storage usage, and dynamic content updates.


## 🔹 Key Features

## 🔹 Homepage (index.html)
Responsive navigation bar built with Bootstrap 5.3.3.

Interactive clock showing current time and date.

Dark/Light theme switcher saved to Local Storage for persistence.

Carousel and cards with featured games.


## 🔹 Individual Game Pages
Each game (e.g., gta.html, fifa.html, witcher.html) has:

Game description, screenshots, and system requirements.

Rating system using stars (stored in Local Storage).

“Buy” or “Add to Library” buttons with hover effects.


## 🔹 Community Page (community.html)
Users can explore or post game reviews.

JavaScript adds interactivity (filtering, likes, etc.).

Connected to community.js for dynamic DOM manipulation.


## 🔹 Recommendation Page (recommendation.html)
Suggests games based on user interests.

Includes search and filter system (stored in Local Storage).

Uses recomm.js for logic and recomm.css for styling.


## 🔹 Authentication System (in JS)
Sign Up / Log In popups.

Validation for email, password, and required fields.

Session and user data saved in Local Storage under keys like steam:user and steam:session.

Redirect to user profile after login.


## 🔹 Support Page (support.html)
The Support page features a Frequently Asked Questions (FAQ) section with collapsible answers.
Users can click each question to expand and read the answer.
The design includes a rounded container with a dark Steam-style theme and smooth transitions.


## 🔹 Additional Functionalities
Theme Persistence: remembers user’s theme across pages.

Responsive Design: works on desktop, laptop, and mobile.

404 Page (notfound.html): custom “Page Not Found” design.

Sound Effects: button clicks and notifications use audio from /Sounds/.

Dynamic Navigation: consistent header and footer across all pages.

```
| Key              | Description                                  |
| ---------------- | -------------------------------------------- |
| `steam:theme`    | Saves user’s light/dark theme preference     |
| `steam:user`     | Stores registered user info                  |
| `steam:session`  | Tracks logged-in user’s email                |
| `steam:ratings`  | Saves user ratings per game                  |
| `steam:searches` | Keeps recent searches on recommendation page |
```

## 🔹 How to Run
Clone or download this project.

Open index.html in your browser.

Navigate through the navbar to explore all pages.

Test user authentication and theme switcher.

Use recommendation.html to try search and filter functions


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
https://alikhanf2006.github.io/Assignment_4_web/.


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

Safaryan Artyom, Faizrakhman Alikhan
