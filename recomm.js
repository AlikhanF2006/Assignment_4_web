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

const THEME_KEY = 'steam:theme';
const themeManager = {
  isLight: localStorage.getItem(THEME_KEY) === 'light',
  apply(){ document.body.classList.toggle('light-theme', this.isLight); },
  toggle(){
    this.isLight = !this.isLight;
    this.apply();
    localStorage.setItem(THEME_KEY, this.isLight ? 'light' : 'dark');
  }
};
themeManager.apply();
document.getElementById("themeSwitch").checked = themeManager.isLight;
document.getElementById("themeSwitch").addEventListener("change", () => themeManager.toggle());


$(document).ready(function () {
  console.log("jQuery is ready!");
});



const games = [
  { name: "CS2", genre: "Shooter", link: "CSindex.html" },
  { name: "PUBG", genre: "Shooter", link: "pubg.html" },
  { name: "Dying Light", genre: "Horror", link: "DLindex.html" },
  { name: "Genshin", genre: "Adventure", link: "genshinindex.html" },
  { name: "The Witcher 3: Wild Hunt", genre: "RPG", link: "witcher.html" },
  { name: "Hollow Knight: Silksong", genre: "Indie", link: "hollowknight.html" },
  { name: "The Elder Scrolls V: Skyrim Special Edition", genre: "Adventure RPG", link: "skyrim.html" },
  { name: "Terraria", genre: "Sandbox", link: "terraria.html" },
  { name: "Grand Theft Auto V", genre: "Action", link: "gta.html" },
  { name: "Stardew Valley", genre: "Life Simulator", link: "stardewvalley.html" },
  { name: "SILENT HILL f", genre: "Psychological Horror", link: "silenthill.html" },
  { name: "EA SPORTS FC 26", genre: "Sport Simulation", link: "fifa.html" },
  { name: "Dota 2", genre: "MOBA", link: "dota2.html" }
];

const RAWG_KEY = "6320f0769e644d10a05e65aafb2407c4";  
const RAWG = {
  base: "https://api.rawg.io/api",
  url(path, params = {}) {
    const u = new URL(this.base + path);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    u.searchParams.set("key", RAWG_KEY);
    return u.toString();
  }
};

function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

async function fetchApiSuggestions(q) {
  if (!q) return [];
  try {
    const url = RAWG.url("/games", { search: q, page_size: 5 });
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return (data.results || []).map(g => ({
      name: g.name,
      link: `https://rawg.io/games/${g.slug}`,
      origin: "api"
    }));
  } catch (e) {
    console.warn("RAWG error:", e);
    return [];
  }
}

const liveApiSuggest = debounce(async (q) => {
  const $list = $('#suggestions');
  if (!q) { $list.hide().empty(); return; }

  const rx = new RegExp(`\\b${escRe(q)}`, 'i');
  const local = games.filter(g => rx.test(g.name) || rx.test(g.genre || ''));

  $list.show().addClass('show').empty();

if (local.length) {
  local.forEach(g => {
    $list.append(`<li class="suggest-item" data-link="${g.link}">${g.name}</li>`);
  });
}

const api = await fetchApiSuggestions(q);
if (api.length) {
  api.forEach(r => {
    $list.append(`<li class="suggest-item" data-link="${r.link}">${r.name}</li>`);
  });
}

}, 350);

$('#searchInput').on('input', function () {
  liveApiSuggest($(this).val().trim());
});

$('#searchInput').on('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); 

    const $list = $('#suggestions');
    const $first = $list.find('li.suggest-item').first();

    if ($list.is(':visible') && $first.length) {
      $first.trigger('click');
    } else {
      $('#searchBtn').trigger('click');
    }
  }
});


$('#suggestions').on('click', 'li.suggest-item', function () {
  const link = $(this).data('link');
  const term = $(this).text().trim().toLowerCase();
  saveRecent(term);
  localStorage.setItem(LS.lastSearch, term);
  if (link) window.open(link, '_blank', 'noopener');
});





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


$('#searchBtn').on('click', async function () {
  const q = $('#searchInput').val().trim();
  if (!q) return;

  const rx = new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
  const found = games.find(g => rx.test(g.name) || rx.test(g.genre || ''));
  if (found) {
    // сохраняем историю
    saveRecent(found.name.toLowerCase());
    localStorage.setItem(LS.lastSearch, found.name.toLowerCase());
    window.location.href = found.link;
    return;
  }

  // если локально не нашли — показываем API-результаты (как у тебя было)
  const results = await fetchApiSuggestions(q);
  const $list = $('#suggestions');
  $list.empty();

  if (results.length) {
    $list.addClass('show').show();
    $list.append('<li class="suggest-title">From RAWG API</li>');
    results.forEach(r => {
      $list.append(`<li class="api-item" data-link="${r.link}">${r.name} <span class="api-pill">API</span></li>`);
    });
  } else {
    $list.addClass('show').show().append('<li class="no-result">No results from API</li>');
  }
});


$('#suggestions').on('click', 'li.api-item', function () {
  const link = $(this).data('link');
  const term = $(this).text().trim().toLowerCase();
  saveRecent(term);
  localStorage.setItem(LS.lastSearch, term);
  if (link) window.open(link, '_blank', 'noopener');
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


$(document).on('mousedown', function (e) {
  if ($(e.target).closest('.search-container, #searchBtn').length) return;
  $('#suggestions').hide().empty().removeClass('show');
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



const ACC_LS = { user:'steam:user', session:'steam:session' };

function safeParse(json) {
  try {
    const v = JSON.parse(json);
    return (v && typeof v === 'object') ? v : null;
  } catch { return null; }
}
const normEmail = s => String(s || '').trim().toLowerCase();

const account = {
  getUser(){
    const raw = localStorage.getItem(ACC_LS.user);
    const obj = safeParse(raw);
    if (!obj || typeof obj.email !== 'string' || typeof obj.fullName !== 'string') return null;
    return obj;
  },
  saveUser(u){ localStorage.setItem(ACC_LS.user, JSON.stringify(u)); },
  isLoggedIn(){ return !!localStorage.getItem(ACC_LS.session); },
  currentEmail(){ return localStorage.getItem(ACC_LS.session) || null; },

  create(fullName, email, pass){
    if(!fullName || !email || !pass) return {ok:false, msg:'Fill all fields'};
    if(pass.length < 6) return {ok:false, msg:'Password must be at least 6 chars'};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRx.test(email)) return {ok:false, msg:'Invalid email'};

    const ex = this.getUser(); 
    if (ex && normEmail(ex.email) === normEmail(email)) {
      return {ok:false, msg:'User already exists'};
    }
    this.saveUser({ fullName, email: String(email).trim(), pass });
    return {ok:true};
  },

  login(email, pass){
    const u = this.getUser();
    if(!u) return {ok:false, msg:'No account found. Create one first'};
    if(normEmail(u.email) !== normEmail(email)) return {ok:false, msg:'Email not found'};
    if(String(u.pass) !== String(pass)) return {ok:false, msg:'Wrong password'};
    localStorage.setItem(ACC_LS.session, u.email);
    return {ok:true};
  },

  logout(){ localStorage.removeItem(ACC_LS.session); return {ok:true}; }
};

function modalOpen(id){ const el=document.querySelector(id); if(!el) return; el.style.display='flex'; document.body.style.overflow='hidden'; }
function modalClose(id){ const el=document.querySelector(id); if(!el) return; el.style.display='none'; document.body.style.overflow=''; }

document.querySelectorAll('.close[data-close]').forEach(x=>{
  x.addEventListener('click', ()=> modalClose(x.getAttribute('data-close')));
});

['#signupPopup','#loginPopup','#profilePopup'].forEach(sel=>{
  const el=document.querySelector(sel); if(!el) return;
  el.addEventListener('click', e=>{ if(e.target===el) modalClose(sel); });
});

function ensureProfileButton(){
  const box = document.querySelector('nav.navbar .d-flex.ms-lg-auto');
  if(!box) return;
  let profile = box.querySelector('.openProfile');
  if(!profile){
    profile = document.createElement('a');
    profile.className = 'btn btn-outline-light btn-sm openProfile';
    profile.href = '#'; profile.textContent = 'Profile'; profile.style.display='none';
    box.appendChild(profile);
  }
  const bSu = box.querySelector('.openSignup');
  const bLi = box.querySelector('.openLogin');
  if(account.isLoggedIn()){
    if(bSu) bSu.style.display='none';
    if(bLi) bLi.style.display='none';
    profile.style.display='';
  }else{
    if(bSu) bSu.style.display='';
    if(bLi) bLi.style.display='';
    profile.style.display='none';
  }
}
ensureProfileButton();

document.addEventListener('click', (e)=>{
  const a1 = e.target.closest('.openSignup');
  const a2 = e.target.closest('.openLogin');
  const a3 = e.target.closest('.openProfile');
  if(a1){ e.preventDefault(); modalClose('#loginPopup');  modalOpen('#signupPopup'); }
  if(a2){ e.preventDefault(); modalClose('#signupPopup'); modalOpen('#loginPopup'); }
  if(a3){ e.preventDefault(); renderProfile(); modalOpen('#profilePopup'); }
});

document.getElementById('toLoginFromSignup')?.addEventListener('click', ()=>{
  modalClose('#signupPopup'); modalOpen('#loginPopup');
});
document.getElementById('toSignupFromLogin')?.addEventListener('click', ()=>{
  modalClose('#loginPopup'); modalOpen('#signupPopup');
});

const suForm = document.getElementById('signupForm');
if(suForm){
  suForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fullName = (document.getElementById('suName').value  || '').trim();
    const email    = (document.getElementById('suEmail').value || '').trim();
    const pass     = (document.getElementById('suPass').value  || '').trim();
    const msgEl    = document.getElementById('signupMsg');
    if(msgEl) msgEl.textContent='';

    const res = account.create(fullName,email,pass);
    if(!res.ok){ if(msgEl){ msgEl.style.color='red'; msgEl.textContent=res.msg; } return; }
    if(msgEl){ msgEl.style.color='green'; msgEl.textContent='Account created. You can log in now.'; }
    setTimeout(()=>{ modalClose('#signupPopup'); modalOpen('#loginPopup'); }, 600);
  });
}

const liForm = document.getElementById('loginForm');
if(liForm){
  liForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = (document.getElementById('liEmail').value || '').trim();
    const pass  = (document.getElementById('liPass').value  || '').trim();
    const msgEl = document.getElementById('loginMsg');
    if(msgEl) msgEl.textContent='';

    const res = account.login(email,pass);
    if(!res.ok){ if(msgEl){ msgEl.style.color='red'; msgEl.textContent=res.msg; } return; }
    if(msgEl){ msgEl.style.color='green'; msgEl.textContent='Logged in'; }
    ensureProfileButton();
    setTimeout(()=> modalClose('#loginPopup'), 400);
  });
}

function renderProfile(){
  const box = document.getElementById('profileInfo');
  if(!box) return;
  const u = account.getUser();
  if(!u || !account.isLoggedIn()){ box.innerHTML='<div>Not logged in.</div>'; return; }
  box.innerHTML = `
    <div><strong>Name:</strong> ${u.fullName}</div>
    <div><strong>Email:</strong> ${u.email}</div>
  `;
}

document.addEventListener('click', (e)=>{
  if(e.target && e.target.id === 'logoutBtn'){
    account.logout();
    ensureProfileButton();
    modalClose('#profilePopup');
  }
});

function clearAuthForms() {
  const forms = ['#signupForm', '#loginForm'];
  forms.forEach(sel => {
    const form = document.querySelector(sel);
    if (!form) return;
    form.querySelectorAll('input').forEach(i => i.value = '');
  });
  const msgs = ['#signupMsg', '#loginMsg'];
  msgs.forEach(id => {
    const el = document.querySelector(id);
    if (el) el.textContent = '';
  });
}

const oldModalOpen = modalOpen;
modalOpen = function(id) {
  clearAuthForms();
  oldModalOpen(id);
};

