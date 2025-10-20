document.addEventListener('DOMContentLoaded', () => {
  const req = document.querySelector('.requirements');
  const anchor = document.getElementById('req-anchor');
  const infoCol = document.querySelector('.col.info');
  const comments = infoCol ? infoCol.querySelector('.comments') : null;

  function moveRequirements() {
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
      // На мобильной версии — под комментариями
      if (comments && comments.nextSibling !== req) {
        comments.after(req);
      }
    } else {
      // На ПК — вернуть на место под фото
      if (anchor && anchor.nextSibling !== req) {
        anchor.after(req);
      }
    }
  }

  moveRequirements();
  window.addEventListener('resize', moveRequirements);
});
