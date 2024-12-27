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
      opacity: 0;
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
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return canvas.getContext('2d', { willReadFrequently: true });
  };

  const leftCtx = initCanvas(left.canvas);
  const rightCtx = initCanvas(right.canvas);

  // Keep track of object URLs to revoke them
  let leftURL = null;
  let rightURL = null;

  // Function to update mask with new canvas content
  const updateMask = (canvas, grid) => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      grid.style.webkitMaskImage = `url(${url})`;
      grid.style.maskImage = `url(${url})`;
      
      // Revoke old URL if it exists
      if (canvas === left.canvas && leftURL) {
        URL.revokeObjectURL(leftURL);
      } else if (canvas === right.canvas && rightURL) {
        URL.revokeObjectURL(rightURL);
      }
      
      // Store new URL
      if (canvas === left.canvas) {
        leftURL = url;
      } else {
        rightURL = url;
      }
    });
  };

  // Function to draw and update the fade effect
  const fadeAmount = 2;
  const spotlightSize = 150;
  let animationFrame;

  const updateFade = () => {
    [leftCtx, rightCtx].forEach(ctx => {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const data = imageData.data;
      let hasVisiblePixels = false;
      
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) {
          data[i] = Math.max(0, data[i] - fadeAmount);
          hasVisiblePixels = true;
        }
      }
      
      if (hasVisiblePixels) {
        ctx.putImageData(imageData, 0, 0);
        updateMask(ctx.canvas, ctx === leftCtx ? left.grid : right.grid);
      }
    });

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

    // Left side
    if (e.clientX <= sideWidth) {
      const rect = left.canvas.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY - rect.top;
      
      leftCtx.fillStyle = 'rgba(255, 255, 255, 255)';
      leftCtx.beginPath();
      leftCtx.arc(x, y, spotlightSize / 2, 0, Math.PI * 2);
      leftCtx.fill();
    }

    // Right side
    if (e.clientX >= window.innerWidth - sideWidth) {
      const rect = right.canvas.getBoundingClientRect();
      const x = e.clientX - (window.innerWidth - sideWidth);
      const y = e.clientY - rect.top;
      
      rightCtx.fillStyle = 'rgba(255, 255, 255, 255)';
      rightCtx.beginPath();
      rightCtx.arc(x, y, spotlightSize / 2, 0, Math.PI * 2);
      rightCtx.fill();
    }
  });

  // Handle visibility
  const updateVisibility = () => {
    const show = window.innerWidth > 800;
    left.container.style.display = show ? 'block' : 'none';
    right.container.style.display = show ? 'block' : 'none';
    
    // Reset canvases when showing
    if (show) {
      leftCtx.clearRect(0, 0, leftCtx.canvas.width, leftCtx.canvas.height);
      rightCtx.clearRect(0, 0, rightCtx.canvas.width, rightCtx.canvas.height);
      left.grid.style.webkitMaskImage = 'none';
      left.grid.style.maskImage = 'none';
      right.grid.style.webkitMaskImage = 'none';
      right.grid.style.maskImage = 'none';
      
      // Revoke any existing URLs
      if (leftURL) {
        URL.revokeObjectURL(leftURL);
        leftURL = null;
      }
      if (rightURL) {
        URL.revokeObjectURL(rightURL);
        rightURL = null;
      }
    }
  };

  updateVisibility();
  window.addEventListener('resize', updateVisibility);

  // Cleanup
  return () => {
    cancelAnimationFrame(animationFrame);
    if (leftURL) URL.revokeObjectURL(leftURL);
    if (rightURL) URL.revokeObjectURL(rightURL);
  };
});
