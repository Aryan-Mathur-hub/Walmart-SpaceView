document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
  
    images.forEach(image => {
      image.setAttribute('draggable', true);
  
      image.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
        e.dataTransfer.dropEffect = 'copy';
      });
    });
  });
  