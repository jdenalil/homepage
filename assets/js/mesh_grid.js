document.addEventListener('DOMContentLoaded', () => {
  console.log('Mesh grid script loaded');
  
  const article = document.querySelector('article');
  console.log('Article element found:', article);
  
  if (!article) {
    console.log('No article element found, exiting');
    return;
  }

  // Create mesh container with a visible background color first for debugging
  const mesh = document.createElement('div');
  mesh.id = 'debug-mesh-grid';
  mesh.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    background-color: rgba(255, 0, 0, 0.1);
    background-image: 
      linear-gradient(#000000 1px, transparent 1px),
      linear-gradient(90deg, #000000 1px, transparent 1px);
    background-size: 40px 40px;
  `;
  
  document.body.insertBefore(mesh, document.body.firstChild);
  console.log('Mesh element created and inserted:', mesh);
  console.log('Mesh element computed style:', window.getComputedStyle(mesh));

  // Create spotlight effect
  const spotlight = document.createElement('div');
  spotlight.id = 'debug-spotlight';
  spotlight.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    pointer-events: none;
    background: radial-gradient(circle closest-side, #ffffff 0%, transparent 100%);
    transform: translate(-50%, -50%);
    z-index: 2;
  `;
  document.body.appendChild(spotlight);
  console.log('Spotlight element created and inserted:', spotlight);

  // Update spotlight position
  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    console.log('Mouse moved:', e.clientX, e.clientY);
  });
});
