
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


document.addEventListener("DOMContentLoaded", () => {
  
  const openPopup  = document.getElementById("openPopup");
  const popup      = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  if (openPopup && popup && closePopup) {
    openPopup.addEventListener("click", () => (popup.style.display = "flex"));
    closePopup.addEventListener("click", () => (popup.style.display = "none"));
    window.addEventListener("click", (e) => { if (e.target === popup) popup.style.display = "none"; });
  }

  
  const buttons = document.querySelectorAll(".btn-group .btn");
  const cards   = document.querySelectorAll(".card");
  if (buttons.length && cards.length) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        buttons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        cards.forEach((card) => {
          const type = card.getAttribute("data-type");
          card.style.display = (filter === "All" || type === filter) ? "block" : "none";
        });
      });
    });
  }

  
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
});
