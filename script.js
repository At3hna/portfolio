const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Carousel functionality
const track = document.querySelector('.projects-grid');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (track && prevBtn && nextBtn) {
  const cards = track.querySelectorAll('.project-card');
  let index = 0;

  const scrollToCard = () => {
    const card = cards[index];
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  };

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    scrollToCard();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    scrollToCard();
  });
}

// Competence carousel
const compTrack = document.querySelector('.competences-grid');
const compPrev = document.querySelector('.carousel-btn.comp-prev');
const compNext = document.querySelector('.carousel-btn.comp-next');

if (compTrack && compPrev && compNext) {
  const cards = compTrack.querySelectorAll('.competence-card');
  let index = 0;

  const scrollToCard = () => {
    const card = cards[index];
    if (card) {
      compTrack.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  };

  compPrev.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    scrollToCard();
  });

  compNext.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    scrollToCard();
  });
}

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
