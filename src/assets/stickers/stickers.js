function generateJaggedEdge(start, end, depth, offset, seed) {
  // Random function from https://stackoverflow.com/a/19303725
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  let edge = [start, end];
  let mid = {x: 0, y: 0}; 
  for (i = 0; i < depth; i++) {
    num_verticies = edge.length
    for (j = num_verticies - 1; j > 0; j--) {
      mid.x = (edge[j - 1].x + edge[j].x) / 2;
      mid.y = (edge[j - 1].y + edge[j].y) / 2;
      let length = Math.sqrt(4 * mid.x * mid.x + 4 * mid.y * mid.y);
      let vec = {x: edge[j].y - edge[j - 1].y, y: edge[j].x - edge[j - 1].x};
      let mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
      vec.x = vec.x / mag;
      vec.y = vec.y / mag;

      let changeMag = random() * offset;
      let changeDir = random() > 0.5 ? 1 : -1

      edge.splice(j, 0, {x: mid.x + changeDir * changeMag * mag * vec.x, y: mid.y + changeDir * changeMag * mag * vec.y})
    }
  }
  return edge;
}

function stickerGenerator() {
  (function () {
    const canvas = document.getElementById("plain-sticky");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 800.0, 800);
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 800.0, 800);
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(100, 100, 800.0, 800);
}
  })();
  (function () {
    const canvas = document.getElementById("plain-sticky-rounded");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.roundRect(100, 100, 800.0, 800, 50);
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky-rounded");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.roundRect(100, 100, 800.0, 800, 50);
ctx.fill();
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;
ctx.roundRect(100, 100, 800.0, 800, 50);
ctx.fill();
}
  })();
  (function () {
    const canvas = document.getElementById("plain-sticky-rounded-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";
ctx.roundRect(100, 100, 800.0, 800, 50);
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky-rounded-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";
ctx.roundRect(100, 100, 800.0, 800, 50);
ctx.fill();
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;
ctx.roundRect(100, 100, 800.0, 800, 50);
ctx.fill();
}
  })();
  (function () {
    const canvas = document.getElementById("plain-label");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 800, 200.0);
  })();
  (function () {
    const canvas = document.getElementById("plain-label-rounded");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.roundRect(100, 100, 800, 200.0, 25);
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("plain-sticky-skinny");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 400.0, 800);
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky-skinny");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 400.0, 800);
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(100, 100, 400.0, 800);
}
  })();
  (function () {
    const canvas = document.getElementById("plain-sticky-skinny-jagged");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 400.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 13);
let leftEdge = [bottomLeft, topLeft];
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky-skinny-jagged");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 400.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 13);
let leftEdge = [bottomLeft, topLeft];
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
}
  })();
  (function () {
    const canvas = document.getElementById("plain-sticky-skinny-jagged-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 400.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 13);
let leftEdge = [bottomLeft, topLeft];
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky-skinny-jagged-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 400.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 13);
let leftEdge = [bottomLeft, topLeft];
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
}
  })();
  (function () {
    const canvas = document.getElementById("plain-sticky-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 800.0, 800);
  })();
  (function () {
    const canvas = document.getElementById("plain-paper-sticky-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";
ctx.fillRect(100, 100, 800.0, 800);
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(100, 100, 800.0, 800);
}
  })();
  (function () {
    const canvas = document.getElementById("jagged-bottom-sticky");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 800.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 3);
let leftEdge = [bottomLeft, topLeft];
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("jagged-bottom-sticky-shadow");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 800.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 3);
let leftEdge = [bottomLeft, topLeft];
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("jagged-bottom-sticky-shadow-paper");
    const ctx = canvas.getContext("2d");
    
ctx.save();
let offset = 0.1;
let width = 800.0;
let height = 800; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = [topRight, bottomRight];
let bottomEdge = generateJaggedEdge(bottomRight, bottomLeft, depth, offset, 3);
let leftEdge = [bottomLeft, topLeft];
ctx.shadowColor = '#b8b9ba';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
ctx.restore();
const patternImg = new Image();
patternImg.crossOrigin="anonymous";
patternImg.src = './patterns/light-paper-fibers.png';
patternImg.onload = function() {
const pattern = ctx.createPattern(patternImg, 'repeat');
ctx.fillStyle = pattern;

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
}
  })();
  (function () {
    const canvas = document.getElementById("tape-translucent");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.globalAlpha = 0.5;
let offset = 0.2;
let width = 800;
let height = 200.0; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = generateJaggedEdge(topRight, bottomRight, depth, offset, 8);
let bottomEdge = [bottomRight, bottomLeft];
let leftEdge = generateJaggedEdge(bottomLeft, topLeft, depth, offset, 10);
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("tape-translucent-2");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.globalAlpha = 0.5;
let offset = 0.2;
let width = 800;
let height = 200.0; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = generateJaggedEdge(topRight, bottomRight, depth, offset, 9);
let bottomEdge = [bottomRight, bottomLeft];
let leftEdge = generateJaggedEdge(bottomLeft, topLeft, depth, offset, 11);
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("tape-translucent-3");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.globalAlpha = 0.5;
let offset = 0.2;
let width = 800;
let height = 200.0; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = generateJaggedEdge(topRight, bottomRight, depth, offset, 17);
let bottomEdge = [bottomRight, bottomLeft];
let leftEdge = generateJaggedEdge(bottomLeft, topLeft, depth, offset, 19);
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("tape-skinny-translucent");
    const ctx = canvas.getContext("2d");
    
ctx.save();
ctx.globalAlpha = 0.5;
let offset = 0.2;
let width = 800;
let height = 133.33333333333331; 
let topLeft = {x: 100, y: 100};
let topRight = {x: topLeft.x + width, y: topLeft.y};
let bottomRight = {x: topRight.x, y: topRight.y + height};
let bottomLeft = {x: bottomRight.x - width, y: bottomRight.y};
let depth = 10;
let topEdge = [topLeft, topRight];
let rightEdge = generateJaggedEdge(topRight, bottomRight, depth, offset, 21);
let bottomEdge = [bottomRight, bottomLeft];
let leftEdge = generateJaggedEdge(bottomLeft, topLeft, depth, offset, 23);
ctx.fillStyle = "#000000";

ctx.beginPath();
ctx.moveTo(topLeft.x, topLeft.y);
for (let i = 1; i < topEdge.length; i++) {
  ctx.lineTo(topEdge[i].x, topEdge[i].y);
}
for (let i = 1; i < rightEdge.length; i++) {
  ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
}
for (let i = 1; i < bottomEdge.length; i++) {
  ctx.lineTo(bottomEdge[i].x, bottomEdge[i].y);
}
for (let i = 1; i < leftEdge.length; i++) {
  ctx.lineTo(leftEdge[i].x, leftEdge[i].y);
}
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("plain-dot");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
  })();
  (function () {
    const canvas = document.getElementById("icon-briefcase");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf0b1").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf0b1", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-calendar");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf133").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf133", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-dog");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf6d3").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf6d3", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-cat");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf6be").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf6be", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-handshake");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf2b5").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf2b5", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-meeting");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf0c0").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf0c0", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-heart");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf004").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf004", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-cloud");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf0c2").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf0c2", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-cloud-sun");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf6c4").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf6c4", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-sun");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf185").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf185", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-snow");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf2dc").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf2dc", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-stethoscope");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf0f1").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf0f1", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-utensils");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf2e7").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf2e7", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-mug-hot");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf7b6").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf7b6", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-wine-glass");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf4e3").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf4e3", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-glass-water");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\ue4f4").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\ue4f4", 500, 500);
  });
}, 1000)
  })();
  (function () {
    const canvas = document.getElementById("icon-birthday");
    const ctx = canvas.getContext("2d");
    ctx.save()
ctx.fillStyle = '#000000'
ctx.arc(500, 500, 400, 0, 2 * Math.PI, false)
ctx.fill();
ctx.restore(); 
setTimeout(() => {
  let font = '900 500px "Font Awesome 6 Free"';
  document.fonts.load(font, "\uf1fd").then(result => {
    console.log(result);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("\uf1fd", 500, 500);
  });
}, 1000)
  })();
}