const sidebar = document.getElementById('appSidebar');
const overlay = document.getElementById('sidebarOverlay');
const toggle = document.getElementById('sidebarToggle');
const closeBtn = document.getElementById('sidebarCloseBtn');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});
