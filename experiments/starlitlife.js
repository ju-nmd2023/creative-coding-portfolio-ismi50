let t = 0;
let numFlows = 6;
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  noFill();

  //stars
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      twinkle: random(TWO_PI),
    });
  }
}

function draw() {
  background(0, 30);

  //draw stars
  noStroke();
  for (let s of stars) {
    let brightness = 200 + 55 * sin(frameCount * 0.02 + s.twinkle);
    fill(0, 0, brightness);
    circle(s.x, s.y, s.size);
  }

  blendMode(ADD);

  for (let i = 0; i < numFlows; i++) {
    let baseY = height / 2 + i * 40 - numFlows * 20;
    stroke((frameCount + i * 40) % 255, 200, 255, 200);
    strokeWeight(2);

    beginShape();
    for (let x = 0; x < width; x += 4) {
      let n = noise(x * 0.003, t + i);
      let y = baseY + map(n, 0, 1, -150, 150);
      vertex(x, y);
    }
    endShape();
  }

  blendMode(BLEND);
  t += 0.004;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      twinkle: random(TWO_PI),
    });
  }
}
