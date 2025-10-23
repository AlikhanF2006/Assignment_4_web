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

  if (!openPopup || !popup || !closePopup) {
    console.log("[INFO] Попап-элементы (popup/closePopup) не найдены — пропускаю инициализацию попапа.");
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
