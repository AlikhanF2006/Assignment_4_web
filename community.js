const themeManager = {
  isLight: false, // по умолчанию тёмная тема страницы

  init() {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      this.isLight = true;
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      document.getElementById("themeSwitch").checked = true;
    } else {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    }
  },

  toggleTheme() {
    this.isLight = !this.isLight;
    document.body.classList.toggle("light-theme", this.isLight);
    document.body.classList.toggle("dark-theme", !this.isLight);
    localStorage.setItem("theme", this.isLight ? "light" : "dark");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  themeManager.init();
  document.getElementById("themeSwitch").addEventListener("change", () => {
    themeManager.toggleTheme();
  });
});




function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const date = now.getDate();
    const month = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    document.getElementById("clock").textContent = `${hh}:${mm}:${ss}   ${date} ${month} ${year}`;
}
updateClock();
setInterval(updateClock, 1000);


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


    const achievement = document.getElementById("achievement");
    const sound = document.getElementById("achievementSound");
    sound.currentTime = 0;
    sound.play();
    achievement.classList.add("show");
    setTimeout(() => achievement.classList.remove("show"), 4000);

    setTimeout(() => popup.style.display = "none", 2000);
});


document.querySelectorAll(".accordion-item").forEach((item) => {
    const btn = item.querySelector(".accordion-header");
    const panel = item.querySelector(".accordion-content");
    if (!btn || !panel) return;

    btn.type = "button";

    btn.addEventListener("click", () => {
        const willOpen = !item.classList.contains("open");
        item.classList.toggle("open");

        if (willOpen) {

            panel.style.maxHeight = null;
            panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
            panel.style.maxHeight = null;
        }
    });
});


window.addEventListener("resize", () => {
    document.querySelectorAll(".accordion-item.open .accordion-content")
        .forEach((p) => { p.style.maxHeight = p.scrollHeight + "px"; });
});

