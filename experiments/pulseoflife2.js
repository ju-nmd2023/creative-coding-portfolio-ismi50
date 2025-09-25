const baseSize = 10;
const gap = 3;
const amount = 60;

let squares = [];

function setup() {
  createCanvas(innerWidth, innerHeight);

  let gridWidth = amount * (baseSize + gap);
  let offsetX = (width - gridWidth) / 2;

  for (let i = 0; i < amount * amount; i++) {
    squares.push({
      x: offsetX + (i % amount) * (baseSize + gap) + random(-50, 50),
      y: floor(i / amount) * (baseSize + gap) + random(-100, 0),
      size: baseSize + random(-5, 5),
      color: i % 3 === 0 ? [255, random(255), random(255)] : null,
      rotation: random(-PI / 4, PI / 4),
      speed: random(1, 5),
      drift: (-1, 1),
    });
  }
}

function draw() {
  background(0);

  for (let s of squares) {
    push();
    translate(s.x, s.y);
    rotate(s.rotation);

    if (s.color) {
      fill(s.color);
    } else {
      noFill();
      stroke(255, 255, 255);
    }

    square(0, 0, s.size);
    pop();

    s.y += s.speed;

    // Help: https://chatgpt.com/share/68d50159-e3ec-800e-ac9f-9f3d6117a849
    if (s.y - s.size > height) {
      s.y = -s.size;
    }
  }
}
