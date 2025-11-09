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



(function(){
  const LS = { last:'search:last', recent:'search:recent' };
  const $inp  = $('#q');
  const $list = $('#suggestions');

  function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function saveRecent(term){
    const t = term.trim().toLowerCase();
    if(!t) return;
    let arr = JSON.parse(localStorage.getItem(LS.recent) || '[]');
    arr = [t, ...arr.filter(x => x!==t)].slice(0,5);
    localStorage.setItem(LS.recent, JSON.stringify(arr));
  }
  function getRecent(){ return JSON.parse(localStorage.getItem(LS.recent)||'[]'); }

  
  function matchByWordStart(q){
    const rx = new RegExp(`\\b${escRe(q)}`,'i');
    return games.filter(g => rx.test(g.name));
  }

  let matches = [];
  let activeIndex = -1;

  function render(list, q=''){
    $list.empty();
    if(!list.length){ $list.removeClass('show'); activeIndex=-1; return; }
    const rx = q ? new RegExp(`\\b(${escRe(q)})`,'ig') : null;
    list.forEach((g,i)=>{
      const name = rx ? g.name.replace(rx,'<span class="suggest-hl">$1</span>') : g.name;
      $list.append(`<li data-index="${i}" data-link="${g.link}" tabindex="-1">${name}</li>`);
    });
    $list.addClass('show');
    activeIndex = 0;
    updateActiveRow();
  }

  function renderRecent(){
    const arr = getRecent();
    $list.empty();
    if(!arr.length){ $list.removeClass('show'); activeIndex=-1; return; }
    $list.append('<li class="suggest-title" tabindex="-1">Recent searches</li>');
    arr.forEach(t => $list.append(`<li class="recent-item" data-name="${t}" tabindex="-1">${t}</li>`));
    $list.addClass('show');
    activeIndex = 1; 
    updateActiveRow();
  }

  function updateActiveRow(){
    const $rows = $list.find('li').not('.suggest-title');
    $rows.removeClass('is-active');
    if(activeIndex<0 || activeIndex >= $rows.length) return;
    $rows.eq(activeIndex).addClass('is-active');
  }

  
  $inp.on('input', function(){
    const q = $(this).val().trim().toLowerCase();
    if(!q){ renderRecent(); return; }
    matches = matchByWordStart(q);
    render(matches, q);
  });

  
  $inp.on('focus', function(){
    if(!$(this).val().trim()) renderRecent();
  });

  
  $inp.on('keydown', function(e){
    if(!$list.hasClass('show')) return;
    const $rows = $list.find('li').not('.suggest-title');
    if(!$rows.length) return;

    if(e.key === 'ArrowDown'){
      e.preventDefault();
      activeIndex = (activeIndex + 1) % $rows.length;
      updateActiveRow();
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      activeIndex = (activeIndex - 1 + $rows.length) % $rows.length;
      updateActiveRow();
    } else if(e.key === 'Enter'){
      e.preventDefault();
      const $li = $rows.eq(activeIndex);

      if($li.hasClass('recent-item')){
        const term = $li.data('name');
        $inp.val(term);
        matches = matchByWordStart(term);
        render(matches, term);
        return;
      }

      const idx = parseInt($li.data('index'),10);
      const choice = matches[idx];
      if(choice){
        localStorage.setItem(LS.last, choice.name.toLowerCase());
        saveRecent(choice.name);
        window.location.href = $li.data('link');
      }
    } else if(e.key === 'Escape'){
      $list.removeClass('show').empty();
    }
  });

  
  $list.on('mousedown','li:not(.suggest-title)', e => e.preventDefault());
  $list.on('click','li.recent-item', function(){
    const term = $(this).data('name');
    $inp.val(term);
    matches = matchByWordStart(term);
    render(matches, term);
  });
  $list.on('click','li:not(.suggest-title):not(.recent-item)', function(){
    const idx = parseInt($(this).data('index'),10);
    const choice = matches[idx];
    if(choice){
      localStorage.setItem(LS.last, choice.name.toLowerCase());
      saveRecent(choice.name);
      const link = $(this).data('link');
      if(link) window.location.href = link;
    }
  });

  
  $(document).on('click', function(e){
    if(!$(e.target).closest('#q, #suggestions').length){
      $list.empty().removeClass('show');
    }
  });

  
  $('#filters').on('submit', function(e){
    e.preventDefault();
    const q = $inp.val().trim().toLowerCase();
    if(!q) return;
    let found = games.find(g => g.name.toLowerCase() === q);
    if(!found){
      const m = matchByWordStart(q);
      if(m.length) found = m[0];
    }
    if(found){
      localStorage.setItem(LS.last, found.name.toLowerCase());
      saveRecent(found.name);
      window.location.href = found.link;
    } else {
      alert('Game not found. Try selecting from suggestions.');
    }
  });

  
  document.addEventListener('DOMContentLoaded', ()=>{
    const prev = localStorage.getItem(LS.last) || '';
    if(prev){
      $inp.val(prev);
      matches = matchByWordStart(prev);
      render(matches, prev);
    }
  });
})();




$(document).on('click', function (e) {
  if (!$(e.target).closest('#q, #suggestions').length) {
    $('#suggestions').empty().removeClass('show');
  }
});







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