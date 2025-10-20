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

  const openPopup = document.getElementById("openPopup");
  const closePopup = document.getElementById("closePopup");
  const popup = document.getElementById("popup");

  if (openPopup && popup && closePopup) {
    const open = () => {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      popup.style.display = "none";
      document.body.style.overflow = "";
    };
    openPopup.addEventListener("click", open);
    closePopup.addEventListener("click", close);
    window.addEventListener("click", (e) => {
      if (e.target === popup) close();
    });
  }

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
