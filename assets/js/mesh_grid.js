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

  // Create grid container for left side
  const leftGridContainer = document.createElement('div');
  leftGridContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s ease;
  `;
  leftContainer.appendChild(leftGridContainer);

  // Create actual grid for left side
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
  `;
  leftGridContainer.appendChild(leftGrid);

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

  // Create grid container for right side
  const rightGridContainer = document.createElement('div');
  rightGridContainer.style.cssText = `
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s ease;
  `;
  rightContainer.appendChild(rightGridContainer);

  // Create actual grid for right side
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
  `;
  rightGridContainer.appendChild(rightGrid);

  // Update grid visibility and clipping
  document.addEventListener('mousemove', (e) => {
    const contentWidth = 640;
    const sideWidth = (window.innerWidth - contentWidth) / 2;
    const spotlightSize = 150; // Diameter of the spotlight
    
    // Only show grids when window is wide enough
    if (window.innerWidth <= 800) {
      leftGridContainer.style.opacity = '0';
      rightGridContainer.style.opacity = '0';
      return;
    }

    // Left side
    if (e.clientX <= sideWidth) {
      const x = e.clientX;
      const y = e.clientY;
      leftGridContainer.style.opacity = '1';
      leftGrid.style.clipPath = `circle(${spotlightSize}px at ${x}px ${y}px)`;
    } else {
      leftGridContainer.style.opacity = '0';
    }

    // Right side
    if (e.clientX >= window.innerWidth - sideWidth) {
      const x = e.clientX - (window.innerWidth - sideWidth);
      const y = e.clientY;
      rightGridContainer.style.opacity = '1';
      rightGrid.style.clipPath = `circle(${spotlightSize}px at ${x}px ${y}px)`;
    } else {
      rightGridContainer.style.opacity = '0';
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
