document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('article')) return;

  // Create mesh container
  const mesh = document.createElement('div');
  mesh.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background-image: 
      linear-gradient(#00000015 1px, transparent 1px),
      linear-gradient(90deg, #00000015 1px, transparent 1px);
    background-size: 40px 40px;
  `;
  document.body.insertBefore(mesh, document.body.firstChild);

  // Create spotlight effect
  const spotlight = document.createElement('div');
  spotlight.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    pointer-events: none;
    background: radial-gradient(circle closest-side, #ffffff 0%, transparent 100%);
    transform: translate(-50%, -50%);
    z-index: -1;
  `;
  document.body.appendChild(spotlight);

  // Update spotlight position
  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  });
});
