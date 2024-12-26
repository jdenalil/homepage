// Only initialize on post pages
if (document.querySelector('article')) {
  const coordsDisplay = document.createElement("div");
  coordsDisplay.style.position = "fixed";
  coordsDisplay.style.bottom = "10px";
  coordsDisplay.style.left = "10px";
  coordsDisplay.style.fontSize = "14px";
  coordsDisplay.style.color = "#666";
  coordsDisplay.style.fontFamily = "monospace";
  coordsDisplay.style.padding = "5px";
  coordsDisplay.style.zIndex = "1000";
  coordsDisplay.innerHTML = "X: 0, Y: 0";
  document.body.appendChild(coordsDisplay);

  document.addEventListener("mousemove", e => {
    coordsDisplay.innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`;
  });
}