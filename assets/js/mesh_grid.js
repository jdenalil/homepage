document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return;

  // Create left side elements
  const leftContainer = document.createElement('div');
  leftContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: calc((100% - 640px) / 2);
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  `;
  document.body.appendChild(leftContainer);

  // Create fixed grid for left side
  const leftGrid = document.createElement('div');
  leftGrid.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.1;
  `;
  leftContainer.appendChild(leftGrid);

  // Create spotlight for left side
  const leftSpotlight = document.createElement('div');
  leftSpotlight.style.cssText = `
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle closest-side, rgba(0, 0, 0, 0.1) 0%, transparent 100%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 2s ease;
  `;
  leftContainer.appendChild(leftSpotlight);

  // Create right side elements
  const rightContainer = document.createElement('div');
  rightContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: calc((100% - 640px) / 2);
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  `;
  document.body.appendChild(rightContainer);

  // Create fixed grid for right side
  const rightGrid = document.createElement('div');
  rightGrid.style.cssText = `
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.1;
  `;
  rightContainer.appendChild(rightGrid);

  // Create spotlight for right side
  const rightSpotlight = document.createElement('div');
  rightSpotlight.style.cssText = `
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle closest-side, rgba(0, 0, 0, 0.1) 0%, transparent 100%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 2s ease;
  `;
  rightContainer.appendChild(rightSpotlight);

  // Update spotlight positions
  document.addEventListener('mousemove', (e) => {
    const contentWidth = 640;
    const sideWidth = (window.innerWidth - contentWidth) / 2;
    
    // Only show spotlights when window is wide enough
    if (window.innerWidth <= 800) {
      leftSpotlight.style.opacity = '0';
      rightSpotlight.style.opacity = '0';
      return;
    }

    // Left side
    if (e.clientX <= sideWidth) {
      leftSpotlight.style.opacity = '1';
      leftSpotlight.style.left = e.clientX + 'px';
      leftSpotlight.style.top = e.clientY + 'px';
    } else {
      leftSpotlight.style.opacity = '0';
    }

    // Right side
    if (e.clientX >= window.innerWidth - sideWidth) {
      rightSpotlight.style.opacity = '1';
      rightSpotlight.style.left = (e.clientX - (window.innerWidth - sideWidth)) + 'px';
      rightSpotlight.style.top = e.clientY + 'px';
    } else {
      rightSpotlight.style.opacity = '0';
    }
  });

  // Hide containers on narrow screens
  const updateVisibility = () => {
    const show = window.innerWidth > 800;
    leftContainer.style.display = show ? 'block' : 'none';
    rightContainer.style.display = show ? 'block' : 'none';
  };

  // Initial check and listen for window resizes
  updateVisibility();
  window.addEventListener('resize', updateVisibility);
});
