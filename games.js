document.addEventListener('DOMContentLoaded', () => {



  const req = document.querySelector('.requirements');
  const anchor = document.getElementById('req-anchor');
  const infoCol = document.querySelector('.col.info');
  const comments = infoCol ? infoCol.querySelector('.comments') : null;

  function moveRequirements() {
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
      if (comments && comments.nextSibling !== req) comments.after(req);
    } else {
      if (anchor && anchor.nextSibling !== req) anchor.after(req);
    }
  }



  const copyBtn = document.getElementById('copyReq');

  function moveCopyButton() {
    const isMobile = window.innerWidth <= 992;
    const reqBlock = document.querySelector('.requirements');
    const rateBtn = document.getElementById('rateBtn');
    const mainCol = document.querySelector('.col.main');

    if (isMobile) {

      if (reqBlock && reqBlock.nextSibling !== copyBtn) {
        reqBlock.after(copyBtn);
      }
    } else {

      if (mainCol && rateBtn && rateBtn.nextSibling !== copyBtn) {
        rateBtn.after(copyBtn);
      }
    }
  }

  function moveRequirements() {
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
      if (comments && comments.nextSibling !== req) comments.after(req);
    } else {
      if (anchor && anchor.nextSibling !== req) anchor.after(req);
    }
    moveCopyButton();
  }

  moveRequirements();
  window.addEventListener('resize', moveRequirements);



  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const date = now.getDate();
    const month = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    document.getElementById("clock").textContent = `${hh}:${mm}:${ss}   ${date} ${month} ${year}`;
  }
  updateClock();
  setInterval(updateClock, 1000);



  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => header.parentElement.classList.toggle('open'));
  });


const stars        = document.querySelectorAll('.star');
const ratingValue  = document.getElementById('ratingValue');
const rateBtn      = document.getElementById('rateBtn');
const rateMessage  = document.getElementById('rateMessage');
let selectedRating = 0;

const ratingWrap = document.querySelector('.rating');
const GAME_ID    = ratingWrap?.dataset.gameId || location.pathname.replace(/\//g,'|') || 'home';
const RATING_KEY = `rating:${GAME_ID}`;

function paint(n){
  stars.forEach((s,i)=> s.classList.toggle('active', i < n));
  selectedRating = n;
  if (ratingValue) ratingValue.textContent = n ? `Your rating: ${n} / 5` : 'Your rating: 0 / 5';
}

(function restore(){
  const saved = Number(localStorage.getItem(RATING_KEY) || 0);
  if (saved) paint(saved);
})();

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    const n = index + 1;
    paint(n);
    localStorage.setItem(RATING_KEY, String(n));
    if (rateBtn){
      rateBtn.disabled = false;
      rateBtn.style.opacity = '1';
      rateBtn.style.cursor = 'pointer';
    }
    if (rateMessage) rateMessage.textContent = '';
  });
});

if (rateBtn){
  rateBtn.addEventListener('click', () => {
    if (selectedRating === 0){
      if (rateMessage){
        rateMessage.textContent = 'Please select a rating first ';
        rateMessage.style.color = '#ff4444';
      }
      return;
    }
    localStorage.setItem(RATING_KEY, String(selectedRating));
    if (rateMessage){
      rateMessage.innerHTML = `<b>Saved ${selectedRating}/5. You can change it anytime.</b>`;
      rateMessage.style.color = '#ffcc00';
      rateMessage.style.opacity = '1';
    }
    rateBtn.textContent = 'Save rating';
  });
}



  const contactForm = document.getElementById("contactForm");
  const status = document.getElementById("status");

  function showMessage(message, isSuccess = true) {
    status.textContent = message;
    status.style.color = isSuccess ? "lightgreen" : "tomato";
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const messageText = contactForm.querySelector('textarea[name="message"]').value.trim();


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showMessage("Please enter your email.", false);
      return;
    } else if (!emailPattern.test(email)) {
      showMessage("Invalid email format.", false);
      return;
    }


    if (!messageText) {
      showMessage("Please enter a message before sending.", false);
      return;
    }


    showMessage("Sending...", true);
    setTimeout(() => {
      showMessage("✅ Message sent successfully!");
      contactForm.reset();
    }, 1000);
  });


  const openPopupButtons = document.querySelectorAll(".openPopup, #openPopup");
  const closePopup = document.getElementById("closePopup");
  const popup = document.getElementById("popup");

  openPopupButtons.forEach(btn => btn.addEventListener("click", () => popup.style.display = "flex"));
  closePopup.addEventListener("click", () => popup.style.display = "none");
  window.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });


  const subForm = document.getElementById("subscribeForm");
  const resetBtn = document.getElementById("resetBtn");

  subForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = subForm.querySelector('input[type="text"]');
    const emailInput = subForm.querySelector('input[type="email"]');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();


    const oldMsg = document.getElementById("error");
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement("p");
    msg.id = "error";
    msg.style.marginTop = "10px";
    msg.style.fontWeight = "600";


    if (name.length < 2 || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
      msg.textContent = "Please enter a valid name (letters only, min 2 chars).";
      msg.style.color = "#ff4444";
      subForm.appendChild(msg);
      return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      msg.textContent = "❌ Please enter a valid email address.";
      msg.style.color = "#ff4444";
      subForm.appendChild(msg);
      return;
    }


    msg.textContent = "✅ Subscription successful!";
    msg.style.color = "lightgreen";
    subForm.appendChild(msg);
    subForm.reset();


    const achievement = document.getElementById("achievement");
    const sound = document.getElementById("achievementSound");
    if (achievement && sound) {
      sound.currentTime = 0;
      sound.play();
      achievement.classList.add("show");
      setTimeout(() => achievement.classList.remove("show"), 4000);
    }


    setTimeout(() => popup.style.display = "none", 2000);
  });


  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      subForm.querySelectorAll("input").forEach(i => i.value = "");
      const old = document.getElementById("error");
      if (old) old.remove();

      const info = document.createElement("p");
      info.id = "error";
      info.style.marginTop = "10px";
      info.textContent = "Form cleared!";
      info.style.color = "#00bfff";
      subForm.appendChild(info);
    });
  }



  const rating = document.querySelector('.rating');
  const column3 = document.querySelector('.column3');
  const mainCol = document.querySelector('.col.main');

  function moveMobileBlocks() {
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      if (column3 && rating && column3.nextSibling !== rating) {
        column3.appendChild(rating);
        column3.appendChild(ratingValue);
        column3.appendChild(rateBtn);
        column3.appendChild(rateMessage);
      }
    } else {
      if (mainCol && rating && rating.parentElement !== mainCol) {
        mainCol.appendChild(rating);
        mainCol.appendChild(ratingValue);
        mainCol.appendChild(rateBtn);
        mainCol.appendChild(rateMessage);
      }
    }
  }

  moveMobileBlocks();
  window.addEventListener('resize', moveMobileBlocks);

});



document.getElementById('copyReq').addEventListener('click', () => {
  const text = document.querySelector('.requirements').innerText.trim();
  navigator.clipboard.writeText(text);

  const btn = document.getElementById('copyReq');
  const oldText = btn.textContent;
  btn.textContent = '✅ Copied!';
  btn.disabled = true;

  const tooltip = document.createElement('span');
  tooltip.className = 'copy-tip';
  tooltip.textContent = 'Copied to clipboard!';
  btn.insertAdjacentElement('afterend', tooltip);

  setTimeout(() => {
    tooltip.remove();
    btn.textContent = oldText;
    btn.disabled = false;
  }, 1500);
});



$(document).ready(function () {
  let current = Math.floor(Math.random() * 1001);
  const $counter = $('#userCount');
  $counter.text(current);

  setInterval(() => {
    const change = Math.floor(Math.random() * 46) + 5;
    const direction = Math.random() < 0.5 ? -1 : 1;
    current += change * direction;

    if (current < 0) current = 0;
    if (current > 1000) current = 1000;

    $counter.text(current);
  }, 2000);
});



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

