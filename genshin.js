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

    
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('ratingValue');
    const rateBtn = document.getElementById('rateBtn');
    const rateMessage = document.getElementById('rateMessage');
    let selectedRating = 0;

    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach(s => s.classList.remove('active'));
        for (let i = 0; i <= index; i++) stars[i].classList.add('active');
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
      rateMessage.style.opacity = "1";

      rateBtn.textContent = "Rated";
      rateBtn.disabled = true;
      rateBtn.style.backgroundColor = "#4b6b0f";
      rateBtn.style.cursor = "default";
    });

    
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
    let subMsg = document.createElement("p");
    subMsg.id = "formMessage";
    subMsg.style.marginTop = "10px";
    subMsg.style.fontWeight = "600";
    subMsg.style.transition = "opacity 0.3s ease";
    subMsg.style.opacity = "0";
    subForm.appendChild(subMsg);

    subForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = subForm.querySelector('input[type="text"]');
      const emailInput = subForm.querySelector('input[type="email"]');
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      subMsg.style.opacity = "0";
      subMsg.textContent = "";
      nameInput.style.borderColor = "#5c7e10";
      emailInput.style.borderColor = "#5c7e10";

      if (name.length < 2 || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
        subMsg.textContent = "❌ Please enter a valid name (letters only, min 2 chars).";
        subMsg.style.color = "#ff4444";
        nameInput.style.borderColor = "#ff4444";
      } 
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        subMsg.textContent = "❌ Please enter a valid email address.";
        subMsg.style.color = "#ff4444";
        emailInput.style.borderColor = "#ff4444";
      } 
      else {
        subMsg.textContent = "✅ Subscription successful!";
        subMsg.style.color = "lightgreen";
        subForm.reset();
        setTimeout(() => popup.style.display = "none", 2000);
      }

      setTimeout(() => subMsg.style.opacity = "1", 100);
    });

    
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








