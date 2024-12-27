document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return;

  // Create left grid container
  const leftGrid = document.createElement('div');
  leftGrid.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: calc((100% - 640px) / 2);
    height: 100%;
    pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  `;
  document.body.appendChild(leftGrid);

  // Create right grid container
  const rightGrid = document.createElement('div');
  rightGrid.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: calc((100% - 640px) / 2);
    height: 100%;
    pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  `;
  document.body.appendChild(rightGrid);

  // Create spotlights for each grid
  const leftSpotlight = document.createElement('div');
  leftSpotlight.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    pointer-events: none;
    background: radial-gradient(circle closest-side, white 0%, transparent 100%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(leftSpotlight);

  const rightSpotlight = document.createElement('div');
  rightSpotlight.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    pointer-events: none;
    background: radial-gradient(circle closest-side, white 0%, transparent 100%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(rightSpotlight);

  // Update spotlight positions and visibility
  document.addEventListener('mousemove', (e) => {
    const contentWidth = 640;
    const sideWidth = (window.innerWidth - contentWidth) / 2;
    
    // Only show spotlights when window is wide enough
    if (window.innerWidth <= 800) {
      leftSpotlight.style.opacity = '0';
      rightSpotlight.style.opacity = '0';
      return;
    }

    // Left grid spotlight
    if (e.clientX <= sideWidth) {
      leftSpotlight.style.opacity = '1';
      leftSpotlight.style.left = e.clientX + 'px';
      leftSpotlight.style.top = e.clientY + 'px';
    } else {
      leftSpotlight.style.opacity = '0';
    }

    // Right grid spotlight
    if (e.clientX >= window.innerWidth - sideWidth) {
      rightSpotlight.style.opacity = '1';
      rightSpotlight.style.left = e.clientX + 'px';
      rightSpotlight.style.top = e.clientY + 'px';
    } else {
      rightSpotlight.style.opacity = '0';
    }
  });

  // Hide grids on narrow screens
  const updateGridVisibility = () => {
    const show = window.innerWidth > 800;
    leftGrid.style.display = show ? 'block' : 'none';
    rightGrid.style.display = show ? 'block' : 'none';
  };

  // Initial check and listen for window resizes
  updateGridVisibility();
  window.addEventListener('resize', updateGridVisibility);
});
