const form = document.getElementById("subscribeForm");
const nameInput = document.getElementById("subName");
const emailInput = document.getElementById("subEmail");
const popup = document.getElementById("popup");


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






const openPopupButtons = document.getElementsByClassName("openPopup");
const closePopup = document.getElementById("closePopup");

Array.from(openPopupButtons).forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
});
closePopup.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});


form.addEventListener("submit", (e) => {
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


  message.textContent = "Subscription successful!";
  message.style.color = "green";
  form.appendChild(message);
  form.reset();
  
  

  const achievement = document.getElementById('achievement');
  const sound = document.getElementById('achievementSound');
  
  sound.currentTime = 0; 
  sound.play();
  
  achievement.classList.add('show');
  setTimeout(() => achievement.classList.remove('show'), 4000);

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
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

  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea") return;

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

const themeManager = {
  isLight: false,
  toggleTheme() {
    this.isLight = !this.isLight;
    document.body.classList.toggle("light-theme", this.isLight);
  },
  getStatus() {
    return this.isLight ? "Light Mode" : "Dark Mode";
  }
};

document.getElementById("themeSwitch").addEventListener("change", () => {
  themeManager.toggleTheme();
  console.log("Current theme:", themeManager.getStatus());
});





$(document).ready(function(){
  console.log("jQuery is ready!");
});




const games = [
  { name: "CS2", genre: "Shooter", link: "CSindex.html" },
  { name: "PUBG", genre: "Shooter", link: "pubg.html" },
  { name: "Dying Light", genre: "Horror", link: "DLindex.html" },
  { name: "Genshin", genre: "Adventure", link: "genshinindex.html" },
  { name: "The Witcher 3: Wild Hunt", genre: "RPG", link: "notfound.html" },
  { name: "Hollow Knight: Silksong", genre: "Indie", link: "notfound.html" },
  { name: "The Elder Scrolls V: Skyrim Special Edition", genre: "Adventure RPG", link: "notfound.html" },
  { name: "Terraria", genre: "Sandbox", link: "notfound.html" },
  { name: "Grand Theft Auto V", genre: "Action", link: "notfound.html" },
  { name: "Stardew Valley", genre: "Life Simulator", link: "notfound.html" },
  { name: "SILENT HILL f", genre: "Psychological Horror", link: "notfound.html" },
  { name: "EA SPORTS FC 26", genre: "Sport Simulation", link: "notfound.html" },
  { name: "Dota 2", genre: "MOBA", link: "notfound.html" }
];

$('#searchInput').on('keyup', function() {
  const input = $(this).val().toLowerCase().trim();
  const suggestions = $('#suggestions');
  suggestions.empty();
  let anyVisible = false;

  $('.card').each(function() {
    const title = $(this).find('h3').text().toLowerCase();
    const genre = $(this).find('.genre').text().toLowerCase();
    const regex = new RegExp(`\\b${input}`, 'i');
    const match = regex.test(title) || regex.test(genre);

    $(this).toggle(match);
    if (match) anyVisible = true;
  });

  
  $('.card h3').each(function() {
    const originalText = $(this).text();
    if (input.length > 0) {
      const regex = new RegExp(`(${input})`, 'gi');
      const highlighted = originalText.replace(regex, '<mark class="fade-mark">$1</mark>');
      $(this).html(highlighted);
    } else {
      $(this).html(originalText);
    }
  });

  $('.no-cards-msg').remove();
  if (!anyVisible && input.length > 0) $('.card').hide();

  if (input.length === 0) {
    suggestions.hide();
    return;
  }

  const regex = new RegExp(`\\b${input}`, 'i');
  const matches = games.filter(g => regex.test(g.name.toLowerCase()) || regex.test(g.genre.toLowerCase()));

  if (matches.length === 0) {
    suggestions.append(`<li class="no-result text-muted text-center py-2">No results found</li>`);
  } else {
    matches.forEach(g => {
      const highlightRegex = new RegExp(`\\b(${input})`, 'gi');
      const highlighted = g.name.replace(highlightRegex, `<b style="color:#007bff;">$1</b>`);
      suggestions.append(
        `<li data-link="${g.link}" class="py-2 px-3" style="cursor:pointer;">${highlighted} <span style="color:#666;">(${g.genre})</span></li>`
      );
    });
  }

  suggestions.show();

  $('.search-suggestions li').on('click', function() {
    const link = $(this).data('link');
    if (link) window.location.href = link;
  });
});

$('#searchBtn').on('click', function() {
  const input = $('#searchInput').val().toLowerCase().trim();
  if (!input) return;

  const regex = new RegExp(`\\b${input}`, 'i');
  const foundGame = games.find(g => regex.test(g.name.toLowerCase()) || regex.test(g.genre.toLowerCase()));

  if (foundGame) {
    window.location.href = foundGame.link;
  } else {
    alert('No game found for this query.');
  }
});

$(document).on('click', function(e) {
  if (!$(e.target).closest('#searchInput, #suggestions').length) {
    $('#suggestions').hide();
  }
});






$(window).on("scroll load", function () {
  $("img.lazy").each(function () {
    const img = $(this);
    const windowBottom = $(window).scrollTop() + $(window).height();
    const imgTop = img.offset().top;

    
    if (windowBottom > imgTop && !img.hasClass("loaded")) {
      img.attr("src", img.data("src")); 
      img.addClass("loaded");
    }
  });
});




$(window).on("scroll", function () {
  const scrollTop = $(this).scrollTop();
  const docHeight = $(document).height() - $(window).height();
  const scrollPercent = (scrollTop / docHeight) * 100;
  $("#progressBar").css("width", scrollPercent + "%");
});
