import "./styles.css";

function drawLines() {
  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 300);
  ctx.stroke();
}

function renderSmallCircle(theta, bigCentre, bigRadius) {
  //console.log(theta, bigCentre, bigRadius);

  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(bigCentre.x, bigCentre.y, bigRadius, 0, 2 * Math.PI);
  ctx.stroke();

  let radius = bigRadius / 2;

  let centre = {
    x: bigCentre.x + (bigRadius - radius) * Math.cos(theta),
    y: bigCentre.y - (bigRadius - radius) * Math.sin(theta)
  };
  //console.log(centre);
  drawLines();
  ctx.beginPath();
  ctx.arc(centre.x, centre.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

(function () {
  var canvas = document.getElementById("viewer");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let bigCentre = { x: 300, y: 150 };
  let bigRadius = 150;

  let theta = Math.PI / 6;
  //renderSmallCircle(ctx, theta, bigCentre, bigRadius);

  setInterval(() => {
    theta = theta - Math.PI / 200;
    renderSmallCircle(theta, bigCentre, bigRadius);
    //console.log("abcd");
  }, 100);
})();
