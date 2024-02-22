const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let scaleFactor = 1;
let lastX;
let lastY;

const images = [];

let isDragging = false;


function loadImage(src) {
  const image = new Image();
  image.src = src;
  image.x = 0; // Initialize x position
  image.y = 0; // Initialize y position
  images.push(image);
  image.onload = drawImages;
}

function drawImages() {
  //Canvas image size
  //canvas.width = images[0].width * scaleFactor;
  //canvas.height = images[0].height * scaleFactor;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  images.forEach((image, index) => {
      const offsetX = index * 20; // Adjust the offset for multiple images
      const offsetY = index * 20; // Adjust the offset for multiple images
      ctx.drawImage(image, image.x, image.y, image.width * scaleFactor, image.height * scaleFactor);
  });
}

canvas.addEventListener('wheel', function(event) {
  event.preventDefault();
  const delta = event.deltaY;
  if (delta < 0) {
      scaleFactor *= 1.1; // Zoom in by increasing scale factor
  } else {
      scaleFactor *= 0.9; // Zoom out by decreasing scale factor
  }
  drawImages(); // Redraw images with updated scale
});

// Handle mouse down event for dragging
canvas.addEventListener('mousedown', function(event) {
  lastX = event.clientX;
  lastY = event.clientY;
  isDragging = true;
});

// Handle mouse move event for dragging
canvas.addEventListener('mousemove', function(event) {
  if (isDragging) {
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;

      images.forEach((image, index) => {
          //const offsetX = index * 20; // Adjust the offset for multiple images
          //const offsetY = index * 20; // Adjust the offset for multiple images
          
          image.x += deltaX;
          image.y += deltaY;
      });

      lastX = event.clientX;
      lastY = event.clientY;
      drawImages(); // Redraw images with updated positions
  }
});

// Handle mouse up event for dragging
canvas.addEventListener('mouseup', function(event) {
  isDragging = false;
});

loadImage('/scr/img/01.png');
loadImage('/scr/img/01.png');