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

  const timeString = `${hh}:${mm}:${ss}   ${date} ${month} ${year}`;
  document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);

const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

openPopup.addEventListener("click", () => popup.style.display = "flex");
closePopup.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});




document.addEventListener("DOMContentLoaded", function () {
      const buttons = document.querySelectorAll(".btn-group .btn");
      const cards = document.querySelectorAll(".card");

      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");

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



const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    content.classList.toggle("open");
  });
});