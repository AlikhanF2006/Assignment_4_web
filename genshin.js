document.addEventListener('DOMContentLoaded', () => {
  const req = document.querySelector('.requirements');
  const anchor = document.getElementById('req-anchor');
  const infoCol = document.querySelector('.col.info');
  const comments = infoCol ? infoCol.querySelector('.comments') : null;

  function moveRequirements() {
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
      
      if (comments && comments.nextSibling !== req) {
        comments.after(req);
      }
    } else {
      
      if (anchor && anchor.nextSibling !== req) {
        anchor.after(req);
      }
    }
  }

  moveRequirements();
  window.addEventListener('resize', moveRequirements);
});




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


document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement; 
    item.classList.toggle('open');    
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const req = document.querySelector('.requirements');
  const anchor = document.getElementById('req-anchor');
  const infoCol = document.querySelector('.col.info');
  const comments = infoCol ? infoCol.querySelector('.comments') : null;
  const rating = document.querySelector('.rating'); 
  const ratingValue = document.getElementById('ratingValue');

  function moveRequirementsAndRating() {
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      
      if (req && rating && req.nextSibling !== rating) {
        req.after(rating);
        rating.after(ratingValue);
      }
    } else {
      
      const mainCol = document.querySelector('.col.main');
      if (mainCol && rating && ratingValue && rating.parentElement !== mainCol) {
        mainCol.appendChild(rating);
        mainCol.appendChild(ratingValue);
      }
    }
  }

  moveRequirementsAndRating();
  window.addEventListener('resize', moveRequirementsAndRating);
});




const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');
const rateBtn = document.getElementById('rateBtn');
const rateMessage = document.getElementById('rateMessage');

let selectedRating = 0; 


stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    
    stars.forEach(s => s.classList.remove('active'));
    
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('active');
    }

    selectedRating = index + 1;
    ratingValue.textContent = `Your rating: ${selectedRating} / 5`;

    
    rateBtn.disabled = false;
    rateBtn.style.opacity = '1';
    rateBtn.style.cursor = 'pointer';

    
    rateMessage.textContent = "";
  });
});


rateBtn.addEventListener('click', () => {
  if (selectedRating === 0) {
    
    rateMessage.textContent = "Please select a rating first ⭐";
    rateMessage.style.color = "#ff4444";
    return;
  }

  
  rateMessage.innerHTML = `<b>Rated ${selectedRating}/5! ⭐ Thanks for your feedback!</b>`;
  rateMessage.style.color = "#ffcc00"; 
  rateMessage.style.transition = "opacity 0.4s ease";
  rateMessage.style.opacity = "1";

  
  rateBtn.textContent = "Rated";
  rateBtn.disabled = true;
  rateBtn.style.backgroundColor = "#4b6b0f";
  rateBtn.style.cursor = "default";
});






document.addEventListener('DOMContentLoaded', () => {
  const req = document.querySelector('.requirements');
  const anchor = document.getElementById('req-anchor');
  const infoCol = document.querySelector('.col.info');
  const comments = infoCol ? infoCol.querySelector('.comments') : null;
  const rating = document.querySelector('.rating');
  const ratingValue = document.getElementById('ratingValue');
  const rateBtn = document.getElementById('rateBtn');
  const rateMessage = document.getElementById('rateMessage');

  function moveMobileBlocks() {
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      
      if (req && rating && req.nextSibling !== rating) {
        req.after(rating);
      }
      if (rating && rating.nextSibling !== ratingValue) {
        rating.after(ratingValue);
      }
      if (ratingValue && ratingValue.nextSibling !== rateBtn) {
        ratingValue.after(rateBtn);
      }
      if (rateBtn && rateBtn.nextSibling !== rateMessage) {
        rateBtn.after(rateMessage);
      }
    } else {
      
      const mainCol = document.querySelector('.col.main');
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
