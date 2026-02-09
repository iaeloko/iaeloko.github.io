const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const smartGrids = document.querySelectorAll('.smart-grid');

const updateSmartGrid = (grid) => {
  const items = Array.from(grid.children).filter((node) => node.nodeType === 1);
  const count = items.length;
  if (!count) return;

  const minCardWidth = Number(grid.dataset.minCard || grid.dataset.minCardWidth || 220);
  const gap = parseFloat(getComputedStyle(grid).gap) || 20;
  const gridWidth = grid.clientWidth;
  const maxCols = Math.max(1, Math.floor((gridWidth + gap) / (minCardWidth + gap)));

  let cols = Math.min(maxCols, count);

  if (count === 5 && maxCols >= 5) {
    cols = 5;
  } else if (count % 3 === 0 && maxCols >= 3) {
    cols = 3;
  } else {
    for (let c = Math.min(maxCols, count); c >= 1; c -= 1) {
      const remainder = count % c;
      if (remainder === 0 || remainder >= 2 || c === count) {
        cols = c;
        break;
      }
    }
  }

  grid.style.setProperty('--cols', cols);
};

const updateAllSmartGrids = () => {
  smartGrids.forEach(updateSmartGrid);
};

let resizeTimer;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(updateAllSmartGrids, 120);
});

requestAnimationFrame(updateAllSmartGrids);

const videoRoot = document.querySelector('.video');

const initYouTubePlayer = () => {
  if (!videoRoot || !window.YT || !window.YT.Player) return;

  const videoId = videoRoot.dataset.videoId;
  const playerEl = videoRoot.querySelector('.video__player');

  if (!videoId || !playerEl) return;

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      videoRoot.classList.add('is-ended');
    }

    if (event.data === window.YT.PlayerState.PLAYING) {
      videoRoot.classList.remove('is-ended');
    }
  };

  new window.YT.Player(playerEl, {
    width: '100%',
    height: '100%',
    videoId,
    playerVars: {
      autoplay: 1,
      mute: 1,
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
    },
    events: {
      onStateChange,
    },
  });
};

if (videoRoot) {
  if (window.YT && window.YT.Player) {
    initYouTubePlayer();
  } else {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
    window.onYouTubeIframeAPIReady = initYouTubePlayer;
  }
}

