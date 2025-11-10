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



$(document).ready(function () {
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


const LS = {
  lastSearch: 'steam:lastSearch',
  recent: 'steam:recentSearches',
  lastFilter: 'steam:lastFilter'
};

function saveRecent(term) {
  if (!term) return;
  let arr = JSON.parse(localStorage.getItem(LS.recent) || '[]');
  arr = [term, ...arr.filter(t => t !== term)].slice(0, 5); 
  localStorage.setItem(LS.recent, JSON.stringify(arr));
}

function getRecent() {
  return JSON.parse(localStorage.getItem(LS.recent) || '[]');
}

document.addEventListener('DOMContentLoaded', () => {
  updateGrid('', DATA_CARDS);
  $('#searchInput').val(''); 

  const lastF = localStorage.getItem(LS.lastFilter);
  if (lastF) {
    const $btn = $(`.btn-group .btn[data-filter="${lastF}"]`);
    if ($btn.length) $btn.trigger('click');
  }
}); 


$('#searchBtn').on('click', function () {
  const input = $('#searchInput').val().toLowerCase().trim();
  if (!input) return;

  localStorage.setItem(LS.lastSearch, input);
  saveRecent(input);

  const regex = new RegExp(`\\b${input}`, 'i');
  const foundGame = games.find(g => regex.test(g.name.toLowerCase()) || regex.test(g.genre.toLowerCase()));

  if (foundGame) {
    window.location.href = foundGame.link;
  } else {
    alert('No game found for this query.');
  }
});

$(document).on('click', function (e) {
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



const $input   = $('#searchInput');
const $suggest = $('#suggestions');


function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }


const cardsIndex = $('.card-container .card').map(function () {
  const $c = $(this);
  return {
    name:  $c.find('h3').text().trim(),
    genre: $c.find('.genre').text().trim() || '',
    link:  $c.attr('href') || '#'
  };
}).get();


const DATA_ALL   = games;       

const DATA_CARDS = cardsIndex;


function matchByWordStart(q, list){
  const rx = new RegExp(`\\b${escRe(q)}`, 'i');
  return list.filter(g => rx.test(g.name) || rx.test(g.genre));
}


let filtered    = [];   
let activeIndex = -1;   


function renderRecent() {
  const arr = getRecent();                 
  $suggest.empty();
  if (!arr.length){ $suggest.hide(); activeIndex = -1; return; }

  $suggest.append('<li class="suggest-title">Recent searches</li>');
  arr.forEach((t, i) => {
    const li = $(
      `<li class="recent-item py-2 px-3" data-index="${i}" data-name="${t}" style="cursor:pointer;">${t}</li>`
    );
    $suggest.append(li);
  });

  $suggest.show();
  activeIndex = 0;
  updateActiveRow();
}

function renderSuggestions(list, query = '') {
  $suggest.empty();
  if (!list.length) { $suggest.hide(); activeIndex = -1; return; }

  
  const rx = query ? new RegExp(`\\b(${escRe(query)})`, 'ig') : null;

  list.forEach((g, i) => {
    const name  = rx ? g.name.replace(rx, '<span class="suggest-hl">$1</span>')  : g.name;
    const genre = rx ? g.genre.replace(rx,'<span class="suggest-hl">$1</span>') : g.genre;

    const li = $(`
      <li class="py-2 px-3" data-index="${i}" style="cursor:pointer;">
        ${name} <span style="color:#666;">(${genre})</span>
      </li>
    `);
    $suggest.append(li);
  });

  $suggest.show();
}



function filterBy(query){
  const q = query.trim().toLowerCase();
  if (!q){
    renderRecent();
    updateGrid('', DATA_CARDS); 
    return;
  }

  
  filtered = matchByWordStart(q, DATA_ALL);
  activeIndex = filtered.length ? 0 : -1;
  renderSuggestions(filtered, q);
  updateActiveRow();

  
  const names = new Set(filtered.map(g => g.name.toLowerCase()));
  const onlyExisting = DATA_CARDS.filter(g => names.has(g.name.toLowerCase()));
  updateGrid(q, onlyExisting);
}




function updateActiveRow() {
  $suggest.find('li').removeClass('is-active');

  
  let $rows = $suggest.find('li').not('.suggest-title');

  if (activeIndex >= 0 && activeIndex < $rows.length) {
    const $li = $rows.eq(activeIndex).addClass('is-active');

    
    const cTop = $suggest.scrollTop();
    const cBot = cTop + $suggest.innerHeight();
    const eTop = $li.position().top + cTop;
    const eBot = eTop + $li.outerHeight();
    if (eTop < cTop) $suggest.scrollTop(eTop);
    else if (eBot > cBot) $suggest.scrollTop(eBot - $suggest.innerHeight());
  }
}


function applySelectionToInput() {
  
  const $rows = $suggest.find('li').not('.suggest-title');
  if (!$rows.length || activeIndex < 0) return;

  const $li = $rows.eq(activeIndex);

  
  if ($li.hasClass('recent-item')) {
    $input.val($li.data('name'));
    return;
  }

  
  if (filtered[activeIndex]) {
    $input.val(filtered[activeIndex].name);
  }
}




$input.on('focus', function(){
  if (!$(this).val().trim()) renderRecent();
});


$input.on('input', function () {
  filterBy($(this).val());
});


$input.on('keydown', function (e) {
  if (!$suggest.is(':visible')) return;

  const key = e.key;
  
  const $rows = $suggest.find('li').not('.suggest-title');
  if (!$rows.length) return;

  if (key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % $rows.length;
    updateActiveRow();
    applySelectionToInput();     
  }
  else if (key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + $rows.length) % $rows.length;
    updateActiveRow();
    applySelectionToInput();
  }
  else if (key === 'Enter') {
    e.preventDefault();

    const $li = $rows.eq(activeIndex);
    
    if ($li.hasClass('recent-item')) {
      const term = $li.data('name');
      $input.val(term);
      $suggest.hide();
      filterBy(term);
      return;
    }

    
    if (filtered[activeIndex]) {
      const chosen = filtered[activeIndex];
      $input.val(chosen.name);

      localStorage.setItem(LS.lastSearch, chosen.name.toLowerCase());
      saveRecent(chosen.name.toLowerCase());

      $suggest.hide();
      window.location.href = chosen.link;
    }
  }
  else if (key === 'Escape') {
    $suggest.hide();
  }
});


$suggest.on('mouseenter', 'li:not(.suggest-title)', function () {
  
  const $rows = $suggest.find('li').not('.suggest-title');
  activeIndex = $rows.index(this);
  updateActiveRow();
});

$suggest.on('mousedown', 'li:not(.suggest-title)', function (e) {
  e.preventDefault();        
  applySelectionToInput();   
  $input.focus();            
});


$suggest.on('click', 'li.recent-item', function(){
  const term = $(this).data('name');
  if (!term) return;
  $input.val(term);
  $suggest.hide();
  filterBy(term);
});

$suggest.on('click', 'li:not(.suggest-title):not(.recent-item)', function () {
  const $rows = $suggest.find('li').not('.suggest-title');
  const idx = $rows.index(this);
  if (filtered[idx]) {
    const chosen = filtered[idx];
    $input.val(chosen.name);

    localStorage.setItem(LS.lastSearch, chosen.name.toLowerCase());
    saveRecent(chosen.name.toLowerCase());

    $suggest.hide();
    window.location.href = chosen.link;
  }
});


$(document).on('click', function (e) {
  if (!$(e.target).closest('#searchInput, #suggestions').length) {
    $suggest.hide();
  }
});


$(window).on("scroll", function () {
  const scrollTop = $(this).scrollTop();
  const docHeight = $(document).height() - $(window).height();
  const scrollPercent = (scrollTop / docHeight) * 100;
  $("#progressBar").css("width", scrollPercent + "%");
});



document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-group .btn");
  const cards = document.querySelectorAll(".card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      localStorage.setItem(LS.lastFilter, filter);


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



$(document).ready(function () {
  const $btn = $("#quackButton");
  const $toast = $("#quackToast");
  const quackSound = $("#quackSound")[0];

  $btn.on("click", function () {

    try {
      quackSound.currentTime = 0;
      quackSound.play();
    } catch (err) {
      console.warn("Audio playback blocked:", err);
    }

    $toast.addClass("show");

    setTimeout(() => {
      $toast.removeClass("show");
    }, 1500);
  });
});


function updateGrid(query, list){
  const q  = (query || '').trim().toLowerCase();
  const set = new Set(list.map(g => g.name.toLowerCase()));
  const rx  = q ? new RegExp(`\\b(${escRe(q)})`, 'ig') : null;

  $('.card-container .card').each(function(){
    const $card = $(this);
    const $h3   = $card.find('h3');

    
    if (!$h3.data('orig')) $h3.data('orig', $h3.text());
    const orig = $h3.data('orig');

    const show = !q || set.has(orig.toLowerCase());
    $card.toggle(show);

    if (show && rx){
      $h3.html(orig.replace(rx, '<mark class="fade-mark">$1</mark>'));
    } else {
      $h3.html(orig);
    }
  });
}
