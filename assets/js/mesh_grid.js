document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return;

  // Create containers for each side
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

  // Create spotlights with grid pattern
  const leftSpotlight = document.createElement('div');
  leftSpotlight.style.cssText = `
    position: absolute;
    width: 200px;
    height: 200px;
    pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 2s ease;
  `;
  leftContainer.appendChild(leftSpotlight);

  const rightSpotlight = document.createElement('div');
  rightSpotlight.style.cssText = `
    position: absolute;
    width: 200px;
    height: 200px;
    pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 2s ease;
  `;
  rightContainer.appendChild(rightSpotlight);

  // Smooth movement variables
  let currentLeftX = 0, currentLeftY = 0;
  let currentRightX = 0, currentRightY = 0;
  let targetLeftX = 0, targetLeftY = 0;
  let targetRightX = 0, targetRightY = 0;
  let leftActive = false, rightActive = false;
  const easing = 0.08; // Lower = smoother/slower movement

  function updateSpotlights() {
    // Update left spotlight position with easing
    if (leftActive) {
      currentLeftX += (targetLeftX - currentLeftX) * easing;
      currentLeftY += (targetLeftY - currentLeftY) * easing;
      leftSpotlight.style.left = currentLeftX + 'px';
      leftSpotlight.style.top = currentLeftY + 'px';
    }

    // Update right spotlight position with easing
    if (rightActive) {
      currentRightX += (targetRightX - currentRightX) * easing;
      currentRightY += (targetRightY - currentRightY) * easing;
      rightSpotlight.style.left = currentRightX + 'px';
      rightSpotlight.style.top = currentRightY + 'px';
    }

    requestAnimationFrame(updateSpotlights);
  }

  // Start the animation loop
  requestAnimationFrame(updateSpotlights);

  // Update spotlight positions and visibility
  document.addEventListener('mousemove', (e) => {
    const contentWidth = 640;
    const sideWidth = (window.innerWidth - contentWidth) / 2;
    
    // Only show spotlights when window is wide enough
    if (window.innerWidth <= 800) {
      leftSpotlight.style.opacity = '0';
      rightSpotlight.style.opacity = '0';
      leftActive = rightActive = false;
      return;
    }

    // Left side spotlight
    if (e.clientX <= sideWidth) {
      leftActive = true;
      leftSpotlight.style.opacity = '1';
      targetLeftX = e.clientX;
      targetLeftY = e.clientY;
    } else {
      leftActive = false;
      leftSpotlight.style.opacity = '0';
    }

    // Right side spotlight
    if (e.clientX >= window.innerWidth - sideWidth) {
      rightActive = true;
      rightSpotlight.style.opacity = '1';
      targetRightX = e.clientX - (window.innerWidth - sideWidth);
      targetRightY = e.clientY;
    } else {
      rightActive = false;
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
