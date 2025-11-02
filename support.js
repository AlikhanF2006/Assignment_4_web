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


const form = document.getElementById("subscribeForm");
const nameInput = document.getElementById("subName");
const emailInput = document.getElementById("subEmail");
const popup = document.getElementById("popup");
const openPopupButtons = document.getElementsByClassName("openPopup");
const closePopup = document.getElementById("closePopup");


Array.from(openPopupButtons).forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
});
closePopup.addEventListener("click", () => (popup.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});


$(document).ready(function () {
  $("#subscribeForm").on("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const oldMsg = document.getElementById("error");
    if (oldMsg) oldMsg.remove();

    const message = document.createElement("p");
    message.id = "error";
    message.style.marginTop = "10px";

    if (name.length < 2) {
      message.textContent = "Please enter a valid name (at least 2 letters).";
      message.style.color = "red";
      form.appendChild(message);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.style.color = "red";
      form.appendChild(message);
      return;
    }


    const btn = $("#subscribeForm button[type='submit']");
    btn.prop("disabled", true);
    const originalText = btn.text();
    btn.html(`<span class="spinner"></span> Please wait...`);


    setTimeout(() => {
      btn.prop("disabled", false);
      btn.text(originalText);


      message.textContent = "Subscription successful!";
      message.style.color = "green";
      form.appendChild(message);
      form.reset();


      const achievement = document.getElementById("achievement");
      const sound = document.getElementById("achievementSound");

      sound.currentTime = 0;
      sound.play();

      achievement.classList.add("show");
      setTimeout(() => achievement.classList.remove("show"), 4000);

      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    }, 1500);
  });
});



const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  document.querySelectorAll("#subscribeForm input").forEach(input => input.value = "");
  const error = document.getElementById("error");
  if (error) error.remove();

  const msg = document.createElement("p");
  msg.textContent = "Form cleared!";
  msg.style.color = "#00bfff";
  msg.style.marginTop = "10px";
  msg.id = "error";
  document.getElementById("subscribeForm").appendChild(msg);
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