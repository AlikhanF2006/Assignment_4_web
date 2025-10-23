document.addEventListener("DOMContentLoaded", () => {
  function updateClock() {
    const now = new Date();
    let hh = String(now.getHours()).padStart(2, "0");
    let mm = String(now.getMinutes()).padStart(2, "0");
    let ss = String(now.getSeconds()).padStart(2, "0");
    const date = now.getDate();
    const month = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    const timeString = `${hh}:${mm}:${ss}         ${date} ${month} ${year}`;
    const clockEl = document.getElementById("clock");
    if (clockEl) clockEl.innerHTML = timeString;
  }
  updateClock();
  setInterval(updateClock, 1000);

 // === POPUP OPEN/CLOSE ===
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const openPopupButtons = document.getElementsByClassName("openPopup");

Array.from(openPopupButtons).forEach(btn => {
  btn.addEventListener("click", () => {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  document.body.style.overflow = "";
});
window.addEventListener("click", e => {
  if (e.target === popup) {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }
});

// === FORM VALIDATION & SUCCESS ===
const form = document.getElementById("subscribeForm");
const nameInput = document.getElementById("subName");
const emailInput = document.getElementById("subEmail");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const oldMsg = document.getElementById("error");
  if (oldMsg) oldMsg.remove();

  const msg = document.createElement("p");
  msg.id = "error";
  msg.style.marginTop = "10px";

  if (name.length < 2) {
    msg.textContent = "Please enter a valid name (at least 2 letters).";
    msg.style.color = "red";
    form.appendChild(msg);
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    msg.textContent = "Please enter a valid email address.";
    msg.style.color = "red";
    form.appendChild(msg);
    return;
  }

  msg.textContent = "Subscription successful!";
  msg.style.color = "green";
  form.appendChild(msg);
  form.reset();

  // === Achievement ===
  const achievement = document.getElementById("achievement");
  const sound = document.getElementById("achievementSound");
  sound.currentTime = 0;
  sound.play();
  achievement.classList.add("show");
  setTimeout(() => achievement.classList.remove("show"), 4000);

  setTimeout(() => popup.style.display = "none", 2000);
});

// === RESET BUTTON ===
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  document.querySelectorAll("#subscribeForm input").forEach(i => i.value = "");
  const old = document.getElementById("error");
  if (old) old.remove();

  const info = document.createElement("p");
  info.id = "error";
  info.style.marginTop = "10px";
  info.textContent = "Form cleared!";
  info.style.color = "#00bfff";
  form.appendChild(info);
});


  const sideBar = document.getElementById("appSidebar");
  const sideBarOverlay = document.getElementById("sidebarOverlay");
  const sideBarToggle = document.getElementById("sidebarToggle");
  const sideBarCloseBtn = document.getElementById("sidebarCloseBtn");

  if (sideBar && sideBarOverlay && sideBarToggle && sideBarCloseBtn) {
    const open = () => {
      sideBar.classList.add("active");
      sideBarOverlay.classList.add("active");
      sideBar.setAttribute("aria-hidden", "false");
      sideBarToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      sideBar.classList.remove("active");
      sideBarOverlay.classList.remove("active");
      sideBar.setAttribute("aria-hidden", "true");
      sideBarToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    sideBarToggle.addEventListener("click", () => {
      if (sideBar.classList.contains("active")) {
        close();
      } else {
        open();
      }
    });

    sideBarOverlay.addEventListener("click", close);
    sideBarCloseBtn.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sideBar.classList.contains("active")) close();
    });
  }

  if (!sideBar || !sideBarOverlay || !sideBarToggle || !sideBarCloseBtn) {
    console.warn("[WARN] Sidebar элементы не найдены. Проверь id: appSidebar, sidebarOverlay, sidebarToggle, sidebarCloseBtn.");
  }
});


const quackBtn = document.getElementById("quackButton");
const quackSound = document.getElementById("quackSound");

quackBtn.addEventListener("click", () => {
  quackSound.currentTime = 0;
  quackSound.play();
});


//===============================


$(document).ready(function() {
  console.log("jQuery is ready!");
});



// === Task 2: Smart Autocomplete Search Suggestions ===
const games = [
  { name: "CS2", link: "CSindex.html" },
  { name: "PUBG", link: "pubg.html" },
  { name: "Dying Light", link: "DLindex.html" },
  { name: "Genshin", link: "genshinindex.html" },
  { name: "The Witcher 3: Wild Hunt", link: "notfound.html" },
  { name: "Hollow Knight: Silksong", link: "notfound.html" },
  { name: "The Elder Scrolls V: Skyrim Special Edition", link: "notfound.html" },
  { name: "Terraria", link: "notfound.html" },
  { name: "Grand Theft Auto V", link: "notfound.html" },
  { name: "Stardew Valley", link: "notfound.html" },
  { name: "SILENT HILL f", link: "notfound.html" },
  { name: "EA SPORTS FC 26", link: "notfound.html" },
  { name: "Dota 2", link: "notfound.html" }
];

$('#q').on('keyup', function () {
  const input = $(this).val().toLowerCase().trim();
  const suggestions = $('#suggestions');
  suggestions.empty();

  if (input.length === 0) {
    suggestions.removeClass('show');
    return;
  }

  // 🔍 Поиск только по началу каждого слова
  const matches = games.filter(g => 
    g.name.toLowerCase().split(/\s+/).some(word => word.startsWith(input))
  );

  if (matches.length === 0) {
    suggestions.append(`<li class="no-result">No results found</li>`);
  } else {
    matches.forEach(g => {
      const regex = new RegExp(`\\b(${input})`, 'gi'); // выделяем только начало слова
      const highlighted = g.name.replace(regex, '<b style="color:#66c0f4;">$1</b>');
      suggestions.append(`<li data-link="${g.link}">${highlighted}</li>`);
    });
  }

  suggestions.addClass('show');

  // Клик по подсказке
  $('.search-suggestions li').on('click', function() {
    const link = $(this).data('link');
    if (link) window.location.href = link;
  });
});

// Прячем при клике вне
$(document).on('click', function(e) {
  if (!$(e.target).closest('#q, #suggestions').length) {
    $('#suggestions').empty().removeClass('show');
  }
});


// === Prevent default form submit & redirect properly ===
$('#filters').on('submit', function (e) {
  e.preventDefault(); // отменяем стандартный переход на recommendation.html

  const input = $('#q').val().toLowerCase().trim();
  if (!input) return;

  // ищем точное совпадение по названию игры
  const foundGame = games.find(g => g.name.toLowerCase() === input);

  if (foundGame) {
    // если найдено точное совпадение — переходим на соответствующую страницу
    window.location.href = foundGame.link;
  } else {
    // если нет точного совпадения — можно открыть notfound.html или вывести сообщение
    alert('Game not found. Try selecting from suggestions.');
  }
});






