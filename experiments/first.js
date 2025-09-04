let t = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0);

  const originalY = height / 2;
  stroke(255, 255, 0);
  noFill();

  // Got the base and help from Garrits video (https://play.ju.se/media/Noise+example+Part+1/0_eq1tt0x8)
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = originalY + map(noise(x * 0.005, t), 0, 1, -100, 100);
    vertex(x, y);
  }
  endShape();

  t += 0.003;
}

// help from: (https://p5js.org/reference/p5/windowResized/)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
