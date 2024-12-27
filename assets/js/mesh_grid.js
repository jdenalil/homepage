document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return;

  // Create containers and canvases
  const createSideElements = (isLeft) => {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      ${isLeft ? 'left' : 'right'}: 0;
      width: calc((100% - 640px) / 2);
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    `;

    // Create grid element
    const grid = document.createElement('div');
    grid.style.cssText = `
      position: absolute;
      top: 0;
      ${isLeft ? 'left' : 'right'}: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 40px 40px;
    `;

    // Create canvas for mask
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;

    container.appendChild(grid);
    container.appendChild(canvas);
    document.body.appendChild(container);

    return { container, grid, canvas };
  };

  const left = createSideElements(true);
  const right = createSideElements(false);

  // Initialize canvases
  const initCanvas = (canvas) => {
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return canvas.getContext('2d');
  };

  const leftCtx = initCanvas(left.canvas);
  const rightCtx = initCanvas(right.canvas);

  // Function to draw and update the fade effect
  const fadeAmount = 0.98; // How quickly the effect fades (0-1)
  const spotlightSize = 150;
  let animationFrame;

  const updateFade = () => {
    // Fade out existing pixels
    [leftCtx, rightCtx].forEach(ctx => {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const pixels = imageData.data;
      for (let i = 3; i < pixels.length; i += 4) {
        pixels[i] *= fadeAmount;
      }
      ctx.putImageData(imageData, 0, 0);
    });

    // Use the canvas as a mask for the grid
    left.grid.style.opacity = Math.min(1, Math.max(...new Uint8Array(leftCtx.getImageData(0, 0, leftCtx.canvas.width, leftCtx.canvas.height).data.filter((_, i) => i % 4 === 3))) / 255);
    right.grid.style.opacity = Math.min(1, Math.max(...new Uint8Array(rightCtx.getImageData(0, 0, rightCtx.canvas.width, rightCtx.canvas.height).data.filter((_, i) => i % 4 === 3))) / 255);

    animationFrame = requestAnimationFrame(updateFade);
  };

  // Start the animation
  updateFade();

  // Handle mouse movement
  document.addEventListener('mousemove', (e) => {
    const contentWidth = 640;
    const sideWidth = (window.innerWidth - contentWidth) / 2;
    
    if (window.innerWidth <= 800) {
      leftCtx.clearRect(0, 0, leftCtx.canvas.width, leftCtx.canvas.height);
      rightCtx.clearRect(0, 0, rightCtx.canvas.width, rightCtx.canvas.height);
      return;
    }

    const scale = window.devicePixelRatio;

    // Left side
    if (e.clientX <= sideWidth) {
      const x = e.clientX * scale;
      const y = e.clientY * scale;
      
      const gradient = leftCtx.createRadialGradient(x, y, 0, x, y, spotlightSize * scale);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      leftCtx.fillStyle = gradient;
      leftCtx.fillRect(x - spotlightSize * scale, y - spotlightSize * scale, spotlightSize * 2 * scale, spotlightSize * 2 * scale);
    }

    // Right side
    if (e.clientX >= window.innerWidth - sideWidth) {
      const x = (e.clientX - (window.innerWidth - sideWidth)) * scale;
      const y = e.clientY * scale;
      
      const gradient = rightCtx.createRadialGradient(x, y, 0, x, y, spotlightSize * scale);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      rightCtx.fillStyle = gradient;
      rightCtx.fillRect(x - spotlightSize * scale, y - spotlightSize * scale, spotlightSize * 2 * scale, spotlightSize * 2 * scale);
    }
  });

  // Handle visibility
  const updateVisibility = () => {
    const show = window.innerWidth > 800;
    left.container.style.display = show ? 'block' : 'none';
    right.container.style.display = show ? 'block' : 'none';
  };

  updateVisibility();
  window.addEventListener('resize', updateVisibility);

  // Cleanup
  return () => {
    cancelAnimationFrame(animationFrame);
  };
});
