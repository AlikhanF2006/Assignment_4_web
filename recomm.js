function updateClock() {
  const now = new Date();
  let hh = now.getHours();
  let mm = now.getMinutes();
  let ss = now.getSeconds();
  let date = now.getDate();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;

  const timeString = `${hh}:${mm}:${ss}         ${date} ${month} ${year}`;
  document.getElementById("clock").innerHTML = timeString;
}

updateClock();
setInterval(updateClock, 1000);


const themeSwitch = document.getElementById("themeSwitch");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light-theme", themeSwitch.checked);
});



const openPopupButtons = document.getElementsByClassName("openPopup");
const closePopup = document.getElementById("closePopup");
const popup = document.getElementById("popup");


Array.from(openPopupButtons).forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
});


closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});


const form = document.getElementById("subscribeForm");
const nameInput = document.getElementById("subName");
const emailInput = document.getElementById("subEmail");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const error = document.getElementById("error");


  if (error) error.remove();

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


  message.textContent = "Subscription successful!";
  message.style.color = "green";
  form.appendChild(message);

  form.reset();


  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
});


const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {

  document.querySelectorAll("#subscribeForm input").forEach(input => {
    input.value = "";
  });


  const error = document.getElementById("error");
  if (error) error.remove();


  const msg = document.createElement("p");
  msg.textContent = "Form cleared!";
  msg.style.color = "#00bfff";
  msg.style.marginTop = "10px";
  msg.id = "error";
  document.getElementById("subscribeForm").appendChild(msg);
});


document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-group .btn");
  const cards = document.querySelectorAll(".card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      cards.forEach(card => {
        const type = card.getAttribute("data-type");
        if (filter === "All" || type === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

function getGreeting() {
  const hour = new Date().getHours();
  let greetingText;

  switch (true) {
    case hour < 12:
      greetingText = "Good morning!";
      break;
    case hour < 18:
      greetingText = "Good afternoon!";
      break;
    default:
      greetingText = "Good evening!";
  }

  return greetingText;
}

const greetingElement = document.getElementById("greeting");
greetingElement.textContent = getGreeting();


const cards = document.querySelectorAll(".card-container .card");
let currentIndex = 0;

function updateActiveCard() {
  cards.forEach(card => card.classList.remove("active"));
  const active = cards[currentIndex];
  if (active) {
    active.classList.add("active");
    active.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }
}

document.addEventListener("keydown", (e) => {
  if (!cards.length) return;

  
  e.preventDefault();

  switch (e.key.toLowerCase()) {
    case "d": 
      currentIndex = (currentIndex + 1) % cards.length;
      break;
    case "a": 
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      break;
    case "s": 
      currentIndex = Math.min(currentIndex + 4, cards.length - 1); 
      break;
    case "w": 
      currentIndex = Math.max(currentIndex - 4, 0);
      break;
    case "enter":
      cards[currentIndex].click(); 
      break;
    default:
      return;
  }

  updateActiveCard();
});

if (cards.length) updateActiveCard();

