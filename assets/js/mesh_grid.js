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

  // Create fixed grid for left side with mask
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
    opacity: 0;
    mask-image: radial-gradient(circle closest-side at 0 0, black 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle closest-side at 0 0, black 0%, transparent 100%);
    mask-size: 300px 300px;
    -webkit-mask-size: 300px 300px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    transition: opacity 2s ease;
  `;
  leftContainer.appendChild(leftGrid);

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

  // Create fixed grid for right side with mask
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
    opacity: 0;
    mask-image: radial-gradient(circle closest-side at 0 0, black 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle closest-side at 0 0, black 0%, transparent 100%);
    mask-size: 300px 300px;
    -webkit-mask-size: 300px 300px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    transition: opacity 2s ease;
  `;
  rightContainer.appendChild(rightGrid);

  // Update grid masks and opacity
  document.addEventListener('mousemove', (e) => {
    const contentWidth = 640;
    const sideWidth = (window.innerWidth - contentWidth) / 2;
    
    // Only show grids when window is wide enough
    if (window.innerWidth <= 800) {
      leftGrid.style.opacity = '0';
      rightGrid.style.opacity = '0';
      return;
    }

    // Left side
    if (e.clientX <= sideWidth) {
      leftGrid.style.opacity = '1';
      const x = e.clientX;
      const y = e.clientY;
      leftGrid.style.maskPosition = `${x}px ${y}px`;
      leftGrid.style.webkitMaskPosition = `${x}px ${y}px`;
    } else {
      leftGrid.style.opacity = '0';
    }

    // Right side
    if (e.clientX >= window.innerWidth - sideWidth) {
      rightGrid.style.opacity = '1';
      const x = e.clientX - (window.innerWidth - sideWidth);
      const y = e.clientY;
      rightGrid.style.maskPosition = `${x}px ${y}px`;
      rightGrid.style.webkitMaskPosition = `${x}px ${y}px`;
    } else {
      rightGrid.style.opacity = '0';
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
