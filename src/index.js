import "./styles.css";

function drawPoints(bigCentre, bigRadius) {
  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(bigCentre.x, bigCentre.y, bigRadius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawLines(centre, radius) {
  console.log(centre, radius);
  let angleArray = [];
  for (var i = 0; i < 8; i++) {
    angleArray.push(((i + 1) * 2 * Math.PI) / 16);
  }
  let coordinatesArray = [];
  for (var j = 0; j < 8; j++) {
    coordinatesArray.push([
      //start
      {
        x: centre.x + radius * Math.cos(angleArray[j]),
        y: centre.y - radius * Math.sin(angleArray[j])
      },
      //end
      {
        x: centre.x + radius * Math.cos(Math.PI + angleArray[j]),
        y: centre.y - radius * Math.sin(Math.PI + angleArray[j])
      }
    ]);
  }
  //console.log(coordinatesArray)

  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  for (var k = 0; k < 8; k++) {
    ctx.beginPath();
    ctx.moveTo(coordinatesArray[k][0].x, coordinatesArray[k][0].y);
    ctx.lineTo(coordinatesArray[k][1].x, coordinatesArray[k][1].y);
    ctx.stroke();
  }
}

function renderSmallCircle(theta, bigCentre, bigRadius) {
  //console.log(theta, bigCentre, bigRadius);

  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let radius = bigRadius / 2;

  let centre = {
    x: bigCentre.x + (bigRadius - radius) * Math.cos(theta),
    y: bigCentre.y - (bigRadius - radius) * Math.sin(theta)
  };
  //console.log(centre);
  drawLines(bigCentre, bigRadius);
  drawPoints(bigCentre, bigRadius);
  ctx.beginPath();
  ctx.arc(centre.x, centre.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

(function () {
  var canvas = document.getElementById("viewer");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let ctx = canvas.getContext("2d");
  let bigCentre = { x: 300, y: 160 };
  let bigRadius = 150;

  ctx.beginPath();
  ctx.arc(300, 0, 10, 0, 2 * Math.PI);
  ctx.stroke();

  let theta = Math.PI / 6;
  renderSmallCircle(theta, bigCentre, bigRadius);

  setInterval(() => {
    theta = theta - Math.PI / 200;
    //renderSmallCircle(theta, bigCentre, bigRadius);
    //console.log("abcd");
  }, 100);
})();
