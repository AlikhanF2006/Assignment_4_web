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



$(document).ready(function () {
  console.log("jQuery is ready!");
});



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



const games = [
  { name: "CS2", link: "CSindex.html" },
  { name: "PUBG", link: "pubg.html" },
  { name: "Dying Light", link: "DLindex.html" },
  { name: "Genshin", link: "genshinindex.html" },
  { name: "The Witcher 3: Wild Hunt", link: "witcher.html" },
  { name: "Hollow Knight: Silksong", link: "hollowknight.html" },
  { name: "The Elder Scrolls V: Skyrim Special Edition", link: "skyrim.html" },
  { name: "Terraria", link: "terraria.html" },
  { name: "Grand Theft Auto V", link: "gta.html" },
  { name: "Stardew Valley", link: "stardewvalley.html" },
  { name: "SILENT HILL f", link: "silenthill.html" },
  { name: "EA SPORTS FC 26", link: "fifa.html" },
  { name: "Dota 2", link: "dota2.html" }
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

function debounce(fn, ms = 350) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
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
      link: `https://rawg.io/games/${g.slug}`
    }));
  } catch (e) {
    console.warn("RAWG error:", e);
    return [];
  }
}


(function(){
const LS = {
  last:   'steam:lastSearch',
  recent: 'steam:recentSearches'
};
  const $inp  = $('#q');
  const $list = $('#suggestions');

function renderHeader(title){ return `<li class="suggest-title" tabindex="-1">${title}</li>`; }
function renderDivider(){ return `<li class="suggest-divider" tabindex="-1"></li>`; }
function renderItem(label, link){ return `<li class="suggest-item" data-link="${link}" tabindex="-1">${label}</li>`; }

function highlight(txt, q){
  if(!q) return txt;
  const rx = new RegExp(`\\b(${escRe(q)})`, 'ig');
  return txt.replace(rx, '<span class="suggest-hl">$1</span>');
}


  function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function saveRecent(term){
    const t = term.trim().toLowerCase();
    if(!t) return;
    let arr = JSON.parse(localStorage.getItem(LS.recent) || '[]');
    arr = [t, ...arr.filter(x => x!==t)].slice(0,5);
    localStorage.setItem(LS.recent, JSON.stringify(arr));
  }
  function getRecent(){
  try { return JSON.parse(localStorage.getItem(LS.recent) || '[]'); }
  catch { return []; }
}

  
  function matchByWordStart(q){
    const rx = new RegExp(`\\b${escRe(q)}`,'i');
    return games.filter(g => rx.test(g.name));
  }

  let matches = [];
  let activeIndex = -1;

  function updateActiveRow(){
    const $rows = $list.find('li').not('.suggest-title');
    $rows.removeClass('is-active');
    if(activeIndex<0 || activeIndex >= $rows.length) return;
    $rows.eq(activeIndex).addClass('is-active');
  }

  function renderRecent(){
  const arr = getRecent();
  $list.empty();
  if(!arr.length){ $list.removeClass('show'); activeIndex=-1; return; }
  $list.append(renderHeader('Recent searches'));
  arr.forEach(t => $list.append(`<li class="recent-item" data-name="${t}" tabindex="-1">${t}</li>`));
  $list.addClass('show');
  activeIndex = 0;
  updateActiveRow();
}

const liveSuggest = debounce(async (qRaw) => {
  const q = qRaw.trim();
  $list.empty();
  if (!q) { $list.removeClass('show'); activeIndex = -1; return; }

  const rxStart = new RegExp(`\\b${escRe(q)}`, 'i');

  const local = games
    .filter(g => rxStart.test(g.name))
    .map(g => ({ label: highlight(g.name, q), link: g.link }));

  const api = (await fetchApiSuggestions(q))
    .map(r => ({ label: highlight(r.name, q), link: r.link })); 

  const all = [...local, ...api];
  if (!all.length) {
    $list.append('<li class="no-result" tabindex="-1">No results</li>');
    activeIndex = -1;
    $list.addClass('show');
    return;
  }

  all.forEach(item => $list.append(renderItem(item.label, item.link)));

  $list.addClass('show');
  const $rows = $list.find('li.suggest-item, li.recent-item');
  activeIndex = $rows.length ? 0 : -1;
  updateActiveRow();
}, 350);

$inp.on('input', function(){ liveSuggest($(this).val()); });
$inp.on('focus', function(){ if(!$(this).val().trim()) renderRecent(); });

if (!$inp.val().trim()) {
  renderRecent();
}
  
$inp.on('keydown', function(e){
  if (!$list.hasClass('show')) return;

  const $rows = $list.find('li.suggest-item, li.recent-item');
  if (!$rows.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % $rows.length;
    updateActiveRow();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + $rows.length) % $rows.length;
    updateActiveRow();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const $li = $rows.eq(activeIndex);

    if ($li.hasClass('recent-item')) {
      const term = $li.data('name');
      $inp.val(term);
      liveSuggest(term);
      return;
    }

    const link = $li.data('link');
    if (link) {
      if (/^https?:\/\//i.test(link)) window.open(link, '_blank', 'noopener');
      else window.location.href = link;
    }
  } else if (e.key === 'Escape') {
    $list.removeClass('show').empty();
  }
});
  
$list.on('mousedown','li', e => e.preventDefault());

$list.on('click','li.recent-item, li.suggest-item', function(){
  const $li = $(this);

  const term = ($li.data('name') || $li.text() || '').trim().toLowerCase();
  if (term) {
    let arr = JSON.parse(localStorage.getItem(LS.recent) || '[]');
    arr = [term, ...arr.filter(t => t !== term)].slice(0,5);
    localStorage.setItem(LS.recent, JSON.stringify(arr));
    localStorage.setItem(LS.last, term);
  }

  if ($li.hasClass('recent-item')) {
    $inp.val($li.data('name'));
    liveSuggest($li.data('name'));
    return;
  }

  const link = $li.data('link');
  if (link) {
    if (/^https?:\/\//i.test(link)) window.open(link, '_blank', 'noopener');
    else window.location.href = link;
  }
});
  
  $(document).on('click', function(e){
    if(!$(e.target).closest('#q, #suggestions').length){
      $list.empty().removeClass('show');
    }
  });

  
$('#filters').on('submit', function(e){
  e.preventDefault();

  const q = $inp.val().trim();
  if (!q) return;

  const term = q.toLowerCase();

  let found = games.find(g => g.name.toLowerCase() === term);
  if (!found) {
    const rxStart = new RegExp(`\\b${escRe(term)}`, 'i');
    const m = games.filter(g => rxStart.test(g.name));
    if (m.length) found = m[0];
  }

  let arr = JSON.parse(localStorage.getItem(LS.recent) || '[]');
  arr = [term, ...arr.filter(t => t !== term)].slice(0, 5);
  localStorage.setItem(LS.recent, JSON.stringify(arr));
  localStorage.setItem(LS.last, term);

  if (found) {
    window.location.href = found.link;
    return;
  }

  liveSuggest(q);
  setTimeout(() => {
    const $first = $list.find('li.suggest-item').first();
    if ($first.length) $first.trigger('click');
    else alert('Game not found. Try selecting from suggestions.');
  }, 120);
});


  $inp.val('');
  $list.empty().removeClass('show');
})();   

const btn = document.getElementById("quackButton");
const sound = document.getElementById("quackSound");
const toast = document.getElementById("quackToast");

btn.addEventListener("click", () => {
  sound.currentTime = 0;
  sound.play();

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
});






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

