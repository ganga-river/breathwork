(function () {
  function initializeAurora(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
      canvas.remove();
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(Math.floor(width), 1);
      canvas.height = Math.max(Math.floor(height), 1);
      draw();
    }

    function draw() {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(72, 181, 174, 0.25)');
      gradient.addColorStop(0.6, 'rgba(47, 105, 158, 0.35)');
      gradient.addColorStop(1, 'rgba(28, 54, 60, 0.28)');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.classList.add('is-ready');
    }

    resize();

    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
    } else {
      window.addEventListener('resize', resize, { passive: true });
    }
  }

  window.initializeAurora = initializeAurora;
})();
