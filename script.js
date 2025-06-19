const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

function initCarousel(carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      update();
    });
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
      d.setAttribute('aria-selected', i === index);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    update();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  let autoSlide = setInterval(nextSlide, 5000);
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 5000));

  update();
}

document.querySelectorAll('.carousel').forEach(initCarousel);

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
