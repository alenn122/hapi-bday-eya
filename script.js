// PERSONALIZE HERE: change the name and photo details below.
// Photos live in the img folder. Update a src and caption together to change a memory.
const birthdayName = 'Athaiah Mae';

// Put your chosen song at music.mp3 beside index.html. Music starts when tapped.
const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
music.volume = 0.35;

function updateMusicButton() {
  const playing = !music.paused;
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  musicToggle.title = playing ? 'Pause background music' : 'Play background music';
  musicToggle.querySelector('.music-label').textContent = playing ? 'Pause music' : 'Play music';
}

musicToggle.addEventListener('click', async () => {
  if (!music.paused) {
    music.pause();
    return;
  }
  try {
    await music.play();
  } catch {
    musicToggle.querySelector('.music-label').textContent = 'Add music.mp3';
    musicToggle.title = 'Add music.mp3 to the website folder';
  }
});
music.addEventListener('play', updateMusicButton);
music.addEventListener('pause', updateMusicButton);
music.addEventListener('ended', updateMusicButton);

const photos = [
  { src: 'img/your smile.jpg', alt: 'A favorite picture of her', caption: 'your smile', color: '#eacbd0', icon: '♡' },
  { src: 'img/you + me.jpg', alt: 'A picture of us together', caption: 'you + me', color: '#e9d6ca', icon: '✿' },
  { src: 'img/that one day.jpg', alt: 'A special date together', caption: 'that one day', color: '#decbd4', icon: '✧' },
  { src: 'img/my favorite view.jpg', alt: 'A candid picture of her', caption: 'my favorite view', color: '#ebd5c7', icon: '♡' },
  { src: 'img/little moments.png', alt: 'A sweet memory together', caption: 'little moments', color: '#dcd2cc', icon: '✳' },
  { src: 'img/always us.jpg', alt: 'Another picture of us', caption: 'always us', color: '#e4c7c9', icon: '♡' },
  { src: 'img/adventures.jpg', alt: 'A picture from an adventure', caption: 'adventures', color: '#e3d2d7', icon: '✿' },
  { src: 'img/that laugh.jpg', alt: 'A picture of her laughing', caption: 'that laugh', color: '#efd9cf', icon: '✧' },
  { src: 'img/sweetest day.jpg', alt: 'A cozy memory together', caption: 'sweetest days', color: '#d8ccd4', icon: '♡' },
  { src: 'img/my person.jpg', alt: 'A favorite picture of us', caption: 'my person', color: '#ecd1d0', icon: '✳' },
  { src: 'img/all of you.jpg', alt: 'A picture of her shining', caption: 'all of you', color: '#e6d9c9', icon: '✿' },
  { src: 'img/more to come.jpg', alt: 'A new memory to make', caption: 'more to come', color: '#dfcbd0', icon: '♡' }
];

document.querySelectorAll('[data-name]').forEach((element) => {
  element.textContent = birthdayName;
});

const letterDialog = document.getElementById('love-letter');
document.getElementById('open-letter').addEventListener('click', () => letterDialog.showModal());
document.getElementById('close-letter').addEventListener('click', () => letterDialog.close());
letterDialog.addEventListener('click', (event) => {
  if (event.target === letterDialog) letterDialog.close();
});

const grid = document.getElementById('photo-grid');

photos.forEach((photo, index) => {
  const card = document.createElement('article');
  card.className = 'photo-card reveal';
  card.style.setProperty('--tilt', `${[-3, 2, -2, 3, 2, -3][index % 6]}deg`);
  card.style.setProperty('--frame', photo.color);

  const frame = document.createElement('div');
  frame.className = 'photo-frame';

  if (photo.src) {
    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = 'lazy';
    frame.appendChild(image);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    const placeholderIcon = document.createElement('span');
    placeholderIcon.className = 'placeholder-icon';
    placeholderIcon.setAttribute('aria-hidden', 'true');
    placeholderIcon.textContent = photo.icon;
    const placeholderLabel = document.createElement('span');
    placeholderLabel.textContent = 'YOUR PHOTO HERE';
    placeholder.append(placeholderIcon, placeholderLabel);
    frame.appendChild(placeholder);
  }

  const caption = document.createElement('div');
  caption.className = 'photo-caption';
  const captionText = document.createElement('span');
  captionText.textContent = photo.caption;
  const heart = document.createElement('span');
  heart.setAttribute('aria-hidden', 'true');
  heart.textContent = '♡';
  caption.append(captionText, heart);
  card.append(frame, caption);
  grid.appendChild(card);
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const wishButton = document.getElementById('wish-button');
const wishResponse = document.getElementById('wish-response');
let wishCount = 0;

wishButton.addEventListener('click', () => {
  const messages = ['You are so, so loved. ♡', 'Life is sweeter with you in it. ♡', 'Happy birthday, my favorite person. ♡'];
  wishResponse.textContent = messages[wishCount % messages.length];
  wishCount += 1;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (let i = 0; i < 22; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'confetti-heart';
    heart.textContent = ['♡', '✦', '✿'][i % 3];
    heart.style.setProperty('--left', `${Math.random() * 100}vw`);
    heart.style.setProperty('--size', `${14 + Math.random() * 19}px`);
    heart.style.setProperty('--duration', `${3 + Math.random() * 2}s`);
    heart.style.setProperty('--sway', `${(Math.random() - .5) * 200}px`);
    heart.style.setProperty('--spin', `${(Math.random() - .5) * 280}deg`);
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
});
