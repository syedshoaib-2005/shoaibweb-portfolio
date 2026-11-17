(() => {
  const FRAME_COUNT = 210;
  const FOLDER_PATH = 'video-frames-30fps-jpg-q92';
  const LERP_FACTOR = 0.1; // Smooth interpolation factor

  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderText = document.getElementById('loader-text');
  const scrollHint = document.getElementById('scroll-hint');

  const images = new Array(FRAME_COUNT);
  let loadedCount = 0;
  let targetProgress = 0;
  let smoothProgress = 0;
  let currentRenderedIndex = -1;
  let isInitialRenderDone = false;
  let needsRedraw = false;

  // Format frame filename: frame_00000.jpg ... frame_00209.jpg
  function getFramePath(index) {
    const padded = String(index).padStart(5, '0');
    return `${FOLDER_PATH}/frame_${padded}.jpg`;
  }

  // Calculate target scroll progress [0, 1]
  function updateScrollTarget() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) {
      targetProgress = 0;
    } else {
      targetProgress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
    }

    if (window.scrollY > 30 && scrollHint) {
      scrollHint.classList.add('hidden');
    } else if (window.scrollY <= 30 && scrollHint) {
      scrollHint.classList.remove('hidden');
    }
  }

  // Resize canvas for crisp Retina rendering
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = Math.floor(displayWidth * dpr);
    canvas.height = Math.floor(displayHeight * dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    needsRedraw = true;
  }

  // Draw image to fill screen ("object-fit: cover")
  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const canvasAspect = canvasW / canvasH;
    const imgAspect = imgW / imgH;

    let drawW, drawH, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawW = canvasW;
      drawH = canvasW / imgAspect;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgAspect;
      offsetX = (canvasW - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  // Return the closest already-loaded frame to avoid any flickering
  function getBestAvailableFrame(index) {
    if (images[index] && images[index].complete && images[index].naturalWidth !== 0) {
      return { img: images[index], index };
    }
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const prev = index - offset;
      if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth !== 0) {
        return { img: images[prev], index: prev };
      }
      const next = index + offset;
      if (next < FRAME_COUNT && images[next] && images[next].complete && images[next].naturalWidth !== 0) {
        return { img: images[next], index: next };
      }
    }
    return null;
  }

  // Preload all frames
  function preloadImages() {
    // 1. Immediately load frame 0
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    images[0] = firstImg;

    firstImg.onload = () => {
      loadedCount++;
      updateLoaderProgress();
      if (!isInitialRenderDone) {
        drawFrame(firstImg);
        currentRenderedIndex = 0;
        isInitialRenderDone = true;
      }
    };
    firstImg.onerror = () => {
      loadedCount++;
      updateLoaderProgress();
    };

    // 2. Preload remaining frames
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;

      img.onload = () => {
        loadedCount++;
        updateLoaderProgress();
        needsRedraw = true;
      };
      img.onerror = () => {
        loadedCount++;
        updateLoaderProgress();
      };
    }
  }

  function updateLoaderProgress() {
    const percent = Math.floor((loadedCount / FRAME_COUNT) * 100);
    if (loaderBar) loaderBar.style.width = `${percent}%`;
    if (loaderText) loaderText.textContent = `${percent}%`;

    if (loadedCount >= FRAME_COUNT) {
      setTimeout(() => {
        if (loader) loader.classList.add('loaded');
      }, 250);
    }
  }

  // Setup Lenis smooth scrolling if available
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenis.on('scroll', updateScrollTarget);
  }

  // Main animation / render loop
  function tick(time) {
    if (lenis) {
      lenis.raf(time);
    }

    // Lerp progress for smooth cinematic scrub
    smoothProgress += (targetProgress - smoothProgress) * LERP_FACTOR;

    if (Math.abs(targetProgress - smoothProgress) < 0.0001) {
      smoothProgress = targetProgress;
    }

    const targetFrameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(smoothProgress * (FRAME_COUNT - 1)))
    );

    if (targetFrameIndex !== currentRenderedIndex || needsRedraw) {
      const best = getBestAvailableFrame(targetFrameIndex);
      if (best) {
        drawFrame(best.img);
        currentRenderedIndex = targetFrameIndex;
        needsRedraw = false;
      }
    }

    requestAnimationFrame(tick);
  }

  // Event Listeners
  window.addEventListener('scroll', updateScrollTarget, { passive: true });
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Initialize
  resizeCanvas();
  updateScrollTarget();
  preloadImages();
  requestAnimationFrame(tick);
})();
