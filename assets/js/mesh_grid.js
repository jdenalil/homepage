document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return; // Only run on post pages
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  // Setup canvas
  const ctx = canvas.getContext('2d');
  let width, height;
  let mouseX = 0, mouseY = 0;
  
  // Grid properties
  const gridSize = 30;
  const lineWidth = 0.5;
  const baseAlpha = 0.15;
  const fadeRadius = 200; // Radius of transparency around mouse

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = lineWidth;

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      for (let y = 0; y <= height; y += 2) {
        const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
        const alpha = Math.max(0, Math.min(baseAlpha, (distance / fadeRadius) * baseAlpha));
        ctx.globalAlpha = alpha;
        
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 1);
      }
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
        const alpha = Math.max(0, Math.min(baseAlpha, (distance / fadeRadius) * baseAlpha));
        ctx.globalAlpha = alpha;
        
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y);
      }
      ctx.stroke();
    }
  }

  // Event listeners
  window.addEventListener('resize', () => {
    resize();
    drawGrid();
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    drawGrid();
  });

  // Initial setup
  resize();
  drawGrid();
});
