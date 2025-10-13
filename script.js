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

  const timeString =`${hh}:${mm}:${ss}         ${date} ${month} ${year}`;
  document.getElementById("clock").innerHTML = timeString;
}

updateClock();
setInterval(updateClock, 1000);


const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popup = document.getElementById("popup");

openPopup.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});


const sideBar = document.getElementById('appSidebar');
const sideBarOverlay = document.getElementById('sidebarOverlay');
const sideBarToggle = document.getElementById('sidebarToggle');
const sideBarCloseBtn = document.getElementById('sidebarCloseBtn');

toggle.addEventListener('click', () => {
  sideBar.classList.toggle('active');
  sideBarOverlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sideBar.classList.remove('active');
  sideBarOverlay.classList.remove('active');
});

closeBtn.addEventListener('click', () => {
  sideBar.classList.remove('active');
  sideBarOverlay.classList.remove('active');
});

