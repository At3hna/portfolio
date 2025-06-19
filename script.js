const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Swiper initialization for carousels
new Swiper('.projects-carousel', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.projects-carousel .swiper-button-next',
    prevEl: '.projects-carousel .swiper-button-prev'
  },
  pagination: {
    el: '.projects-carousel .swiper-pagination',
    clickable: true
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

new Swiper('.competence-carousel', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.competence-carousel .swiper-button-next',
    prevEl: '.competence-carousel .swiper-button-prev'
  },
  pagination: {
    el: '.competence-carousel .swiper-pagination',
    clickable: true
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// Modal for competence projects
const modal = document.getElementById('competence-modal');
const modalTitle = document.getElementById('modal-title');
const modalList = document.getElementById('modal-project-list');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.competence-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = `${card.dataset.code} - ${card.querySelector('h4').textContent}`;
    modalList.innerHTML = '';
    const projects = card.dataset.projects.split(',').map(p => p.trim());
    projects.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      modalList.appendChild(li);
    });
    modal.classList.add('show');
    modal.classList.remove('hidden');
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });
}

if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}
