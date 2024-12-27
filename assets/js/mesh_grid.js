document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return;

  // Create left grid
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

  // Create right grid
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

  // Hide grids on narrow screens
  const updateGridVisibility = () => {
    const show = window.innerWidth > 800; // Only show when there's room for side columns
    leftGrid.style.display = show ? 'block' : 'none';
    rightGrid.style.display = show ? 'block' : 'none';
  };

  // Initial check and listen for window resizes
  updateGridVisibility();
  window.addEventListener('resize', updateGridVisibility);
});
