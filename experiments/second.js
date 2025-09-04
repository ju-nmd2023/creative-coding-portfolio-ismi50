let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(0, 5);
  drawFlow(100);
  t += 0.005;
}

function drawFlow(index) {
  let baseY = height / 2;
  stroke(255, 255, 0);
  strokeWeight(2);
  beginShape();
  for (let x = 0; x < width; x += 2) {
    let y = baseY + map(noise(x * 0.005, t), 0, 1, -100, 100);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
