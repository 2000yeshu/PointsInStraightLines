import "./styles.css";

function drawBigCircle(bigCentre, bigRadius) {
  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(bigCentre.x, bigCentre.y, bigRadius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawLines(centre, radius) {
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
  return coordinatesArray;
}

function drawPointsLogic(ctx, coordinatesArray, r) {
  //let m = 1 / 4;
  //console.log(r)
  let angleArray = [];
  for (var i = 0; i < 8; i++) {
    angleArray.push(((i + 1) * 2 * Math.PI) / 16);
  }

  let x1 = coordinatesArray[0][0].x;
  let y1 = coordinatesArray[0][0].y;
  let x2 = coordinatesArray[0][1].x;
  let y2 = coordinatesArray[0][1].y;
  //console.log(x1, y1, x2, y2)
  let point = null;
  // if(x1 - (r*Math.cos(angleArray[0])) <= x2 ){
  //    point = {
  //     x: x2 + r * Math.cos(angleArray[0]),
  //     y: y2 - r * Math.sin(angleArray[0])
  //   };
  // }
  // else  {
  point = {
    x: x1 - r * Math.cos(angleArray[0]),
    y: y1 + r * Math.sin(angleArray[0])
  };
  // }

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function drawPoints(coordinatesArray, bigCentre, bigRadius) {
  var canvas = document.getElementById("viewer");
  var ctx = canvas.getContext("2d");
  console.log();
  let r = 2;
  let sign = "+";

  setInterval(() => {
    if (r >= 300 && sign === "+") {
      sign = "-";
    } else if (r < 300 && r > 0 && sign === "-") {
      sign = "-";
    } else {
      sign = "+";
    }

    if (sign === "+") {
      r = r + 2;
    } else if (sign === "-") {
      r = r - 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPointsLogic(ctx, coordinatesArray, r);
    drawBigCircle(bigCentre, bigRadius);
    drawLines(bigCentre, bigRadius);
  }, 50);
  //drawPointsLogic(ctx, coordinatesArray, r );
}

function renderSmallCircle(theta, bigCentre, bigRadius) {
  //console.log(theta, bigCentre, bigRadius);

  var canvas = document.getElementById("viewer");
  //canvas.width = canvas.offsetWidth;
  //canvas.height = canvas.offsetHeight;
  var ctx = canvas.getContext("2d");
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  let radius = bigRadius / 2;

  let centre = {
    x: bigCentre.x + (bigRadius - radius) * Math.cos(theta),
    y: bigCentre.y - (bigRadius - radius) * Math.sin(theta)
  };
  //console.log(centre);
  let coordinatesArray = drawLines(bigCentre, bigRadius);
  drawBigCircle(bigCentre, bigRadius);
  drawPoints(coordinatesArray, bigCentre, bigRadius);
  ctx.beginPath();
  ctx.arc(centre.x, centre.y, radius, 0, 2 * Math.PI);
  //ctx.stroke();
}

(function () {
  var canvas = document.getElementById("viewer");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let ctx = canvas.getContext("2d");
  let bigCentre = { x: 300, y: 160 };
  let bigRadius = 150;

  let theta = Math.PI / 6;
  renderSmallCircle(theta, bigCentre, bigRadius);

  setInterval(() => {
    theta = theta - Math.PI / 200;
    //renderSmallCircle(theta, bigCentre, bigRadius);
    //console.log("abcd");
  }, 100);
})();
