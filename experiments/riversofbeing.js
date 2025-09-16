let t = 0;
let numFlows = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(0, 4);
  for (let i = 0; i < numFlows; i++) {
    drawFlow(i);
  }
  t += 0.005;
}

function drawFlow(index) {
  let baseY = height / 2 + index * 30 - 50;
  stroke(0, 255, 0, 150);
  strokeWeight(2 + index * 0.5);
  beginShape();
  for (let x = 0; x < width; x += 2) {
    let y =
      baseY +
      map(
        noise(x * 0.009, t + index * 10, sin(t * 0.5 + x * 0.01)),
        0,
        1,
        -200,
        150
      );
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
