// Efecto glass con forma de pergamino (silueta exacta de ui/a.png)
// Uso en Articulate Storyline: trigger "Execute JavaScript" → When: Timeline starts
(function () {
  var ID = 'glassScroll';
  if (document.getElementById(ID)) return; // evita duplicados

  var host = document.querySelector('#slide') ||
             document.querySelector('.slide-container') ||
             document.querySelector('#frame') ||
             document.body;

  if (getComputedStyle(host).position === 'static') {
    host.style.position = 'relative';
  }

  // Silueta exacta de ui/a.png (29 vertices, trazado pixel a pixel, en %)
  var poly = 'polygon(' +
    '98.68% 2.27%, 98.2% 7.6%, 97.8% 8.71%, 90.93% 9.82%, ' +
    '97.88% 13.51%, 98.13% 14.4%, 98.65% 27.56%, 98.68% 69.11%, ' +
    '98.45% 80.93%, 98% 86.67%, 90.88% 90.58%, 97.78% 91.69%, ' +
    '98.18% 92.8%, 98.65% 98.13%, ' +
    '11.9% 98%, ' +
    '12.38% 92.67%, 12.8% 91.51%, 19.68% 90.44%, 12.6% 86.58%, ' +
    '12.18% 82%, 11.93% 71.33%, 11.93% 29.6%, 12.1% 20.4%, ' +
    '12.48% 14.31%, 12.73% 13.51%, 19.68% 9.82%, 12.8% 8.71%, ' +
    '12.4% 7.56%, 11.93% 2.27%)';

  var glass = document.createElement('div');
  glass.id = ID;
  glass.style.cssText = [
    'position:absolute',
    'left:0', 'top:0', 'width:100%', 'height:100%',
    'background:rgba(30,30,35,0.4)',
    '-webkit-backdrop-filter:blur(20px)',
    'backdrop-filter:blur(20px)',
    'clip-path:' + poly,
    '-webkit-clip-path:' + poly,
    'pointer-events:none',
    'z-index:9999'
  ].join(';');

  host.appendChild(glass);
})();
