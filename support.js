
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
    const btn   = item.querySelector(".accordion-header");
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

