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


