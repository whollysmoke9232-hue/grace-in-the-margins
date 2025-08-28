window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("border-canvas");
  const ctx = canvas.getContext("2d");
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function drawGlow(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Animate the glow's alpha for subtle motion
    const alpha = 0.1 + 0.05 * Math.sin(time / 1000);
    ctx.strokeStyle = `rgba(153,204,255,${alpha})`;
    ctx.lineWidth = 16;
    ctx.shadowBlur = 32;
    ctx.shadowColor = "#99ccff";
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);
  }

  function animate(time) {
    drawGlow(time);
    requestAnimationFrame(animate);
  }
  animate(0);
});
