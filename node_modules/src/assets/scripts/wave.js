window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("wave-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = 180; // Height of the wave area
  }
  resize();
  window.addEventListener("resize", resize);

  function drawWave(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 2) {
      const y =
        40 * Math.sin(x / 120 + time / 900) +
        20 * Math.sin(x / 40 + time / 400) +
        90;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "rgba(153, 204, 255, 0.5)";
    ctx.fill();
  }

  function animate(time) {
    drawWave(time);
    requestAnimationFrame(animate);
  }
  animate(0);
});
