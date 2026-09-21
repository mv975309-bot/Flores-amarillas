const body = document.body;
const bouquet = document.getElementById('bouquet');
const sparkleLayer = document.getElementById('sparkleLayer');
const petalLayer = document.getElementById('petalLayer');
const heartLayer = document.getElementById('heartLayer');
const surpriseBtn = document.getElementById('openSurprise');
const closeBtn = document.getElementById('closeMessage');
const messageCard = document.getElementById('messageCard');
const musicToggle = document.getElementById('musicToggle');
const music = document.getElementById('music');

let sparkleAmount = 24;
let petalSeed = 0;

function createSparkles() {
  sparkleLayer.innerHTML = '';

  for (let i = 0; i < sparkleAmount; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';

    const size = 5 + Math.random() * 7;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.8);
    const delay = Math.random() * 5;
    const dur = 2 + Math.random() * 4;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.animationDuration = `${dur}s`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`);
    sparkle.style.setProperty('--dy', `${(Math.random() - 0.5) * 30}px`);

    sparkleLayer.appendChild(sparkle);
  }
}

function createPetals() {
  petalLayer.innerHTML = '';

  const count = window.innerWidth < 600 ? 18 : 30;

  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'floating-petal';

    const size = 10 + Math.random() * 12;
    const left = Math.random() * window.innerWidth;
    const duration = 10 + Math.random() * 12;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 120;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.6}px`;
    petal.style.left = `${left}px`;
    petal.style.top = `${-20 - Math.random() * 100}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty('--drift', `${drift}px`);

    petalLayer.appendChild(petal);
  }
}

function createFloatingHeart(x, y) {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = '❤';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.animationDelay = `${Math.random() * 0.6}s`;
  heartLayer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2200);
}

function createMiniHeartBurst(x, y) {
  const heart = document.createElement('span');
  heart.className = 'floating-mini-heart';
  heart.textContent = '❤';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--x', `${(Math.random() - 0.5) * 56}px`);
  heart.style.setProperty('--y', `${-18 - Math.random() * 24}px`);
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 900);
}

function showMessageCard() {
  messageCard.classList.add('show');
  messageCard.setAttribute('aria-hidden', 'false');

  for (let i = 0; i < 22; i += 1) {
    const x = window.innerWidth * 0.25 + Math.random() * (window.innerWidth * 0.5);
    const y = window.innerHeight * 0.25 + Math.random() * (window.innerHeight * 0.35);
    createFloatingHeart(x, y);
  }
}

function closeMessageCard() {
  messageCard.classList.remove('show');
  messageCard.setAttribute('aria-hidden', 'true');
}

function triggerSurprise() {
  body.classList.add('surprise-mode');
  bouquet.style.transform = 'scale(1.08)';
  bouquet.style.transition = 'transform 0.8s ease';

  sparkleAmount = 90;
  createSparkles();

  for (let i = 0; i < 26; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'floating-petal';

    const size = 12 + Math.random() * 18;
    const left = Math.random() * window.innerWidth;
    const top = -30 - Math.random() * 60;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.7}px`;
    petal.style.left = `${left}px`;
    petal.style.top = `${top}px`;
    petal.style.animationDuration = `${7 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 3}s`;
    petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 160}px`);
    petalLayer.appendChild(petal);
  }

  const interval = setInterval(() => {
    const x = window.innerWidth * 0.2 + Math.random() * (window.innerWidth * 0.6);
    const y = window.innerHeight * 0.12 + Math.random() * (window.innerHeight * 0.6);
    createFloatingHeart(x, y);
  }, 360);

  setTimeout(() => {
    clearInterval(interval);
  }, 3200);

  showMessageCard();

  setTimeout(() => {
    bouquet.style.transform = 'scale(1)';
  }, 1400);
}

function handleFlowerClick(event) {
  const flower = event.currentTarget;
  const rect = flower.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  createMiniHeartBurst(x, y);
}

function addFlowerInteractions() {
  document.querySelectorAll('.flower').forEach((flower) => {
    flower.addEventListener('click', handleFlowerClick);
  });
}

function setupMusicToggle() {
  const toggle = () => {
    if (music.paused) {
      music.load();
      music.play().catch(() => {
        // La reproducción se controla por interacción del usuario.
      });
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-label', 'Pausar música');
    } else {
      music.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-label', 'Activar música');
    }
  };

  musicToggle.addEventListener('click', toggle);
}

function initializePage() {
  createSparkles();
  createPetals();
  addFlowerInteractions();
  setupMusicToggle();

  const interval = setInterval(() => {
    if (Math.random() > 0.55) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.6;
      createFloatingHeart(x, y);
    }
  }, 2600);

  setTimeout(() => {
    clearInterval(interval);
  }, 18000);

  setTimeout(() => {
    body.classList.add('loaded');
  }, 50);
}

surpriseBtn.addEventListener('click', triggerSurprise);
closeBtn.addEventListener('click', closeMessageCard);
messageCard.addEventListener('click', (event) => {
  if (event.target === messageCard) {
    closeMessageCard();
  }
});

window.addEventListener('resize', () => {
  createSparkles();
  createPetals();
});

initializePage();
