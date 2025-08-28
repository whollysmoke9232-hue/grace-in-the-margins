const canvas = document.getElementById("embers-canvas");
const ctx = canvas.getContext("2d");

const embers = [];
const emberCount = 200;
const offset = 5;

// Main content box settings (match your CSS)
const contentWidth = 800;
const contentHeight = 600; // Adjust this to match your main content's height
const contentPadding = 32; // 2rem in px
const contentMarginTop = 32; // 2rem in px

function getContentBox() {
  const boxLeft = (canvas.width - contentWidth) / 2 - contentPadding;
  const boxRight = (canvas.width + contentWidth) / 2 + contentPadding;
  const boxTop = contentMarginTop;
  const boxBottom = contentMarginTop + contentHeight + contentPadding * 2;
  return { boxLeft, boxRight, boxTop, boxBottom };
}

function isInContentBox(x, y) {
  const { boxLeft, boxRight, boxTop, boxBottom } = getContentBox();
  return x > boxLeft && x < boxRight && y > boxTop && y < boxBottom;
}

function randomMarginPosition() {
  const { boxLeft, boxRight, boxTop, boxBottom } = getContentBox();
  // Pick a side: 0=top, 1=right, 2=bottom, 3=left
  const side = Math.floor(Math.random() * 4);
  switch (side) {
    case 0: // Top margin
      return {
        x: Math.random() * canvas.width,
        y: offset,
      };
    case 1: // Right margin
      return {
        x: canvas.width - offset,
        y: Math.random() * canvas.height,
      };
    case 2: // Bottom margin
      return {
        x: Math.random() * canvas.width,
        y: canvas.height - offset,
      };
    case 3: // Left margin
      return {
        x: offset,
        y: Math.random() * canvas.height,
      };
    default:
      return {
        x: Math.random() * canvas.width,
        y: offset,
      };
  }
}

function createRandomEmbers() {
  embers.length = 0;
  while (embers.length < emberCount) {
    const pos = randomMarginPosition();
    // Only keep embers outside the content box
    if (!isInContentBox(pos.x, pos.y)) {
      const angle = Math.random() * Math.PI * 2;
      embers.push({
        x: pos.x,
        y: pos.y,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        dx: Math.cos(angle) * (Math.random() * 0.5 + 0.2),
        dy: Math.sin(angle) * (Math.random() * 0.5 + 0.2),
      });
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createRandomEmbers();
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawEmbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let ember of embers) {
    ctx.beginPath();
    ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 140, 0, ${ember.opacity})`;
    ctx.fill();

    ember.x += ember.dx * ember.speed;
    ember.y += ember.dy * ember.speed;

    // If ember goes outside canvas or enters content box, respawn at margin
    if (
      ember.x < 0 ||
      ember.x > canvas.width ||
      ember.y < 0 ||
      ember.y > canvas.height ||
      isInContentBox(ember.x, ember.y)
    ) {
      let pos;
      do {
        pos = randomMarginPosition();
      } while (isInContentBox(pos.x, pos.y));
      ember.x = pos.x;
      ember.y = pos.y;
      const angle = Math.random() * Math.PI * 2;
      ember.dx = Math.cos(angle) * (Math.random() * 0.5 + 0.2);
      ember.dy = Math.sin(angle) * (Math.random() * 0.5 + 0.2);
    }
  }
  requestAnimationFrame(drawEmbers);
}

drawEmbers();
