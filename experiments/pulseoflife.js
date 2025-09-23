const size = 50;
const gap = 13;
const amount = 26;
let offsets = [];
let HueShift = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < amount * amount; i++) {
    offsets.push({ x: random(-2, 2), y: random(-2, 2) });
  }
}

function draw() {
  background(HueShift % 360, 100, 100);
  HueShift += 0.9;

  fill(255, 204, 204);

  let y = (height - size * amount - gap * (amount - 1)) / 2;
  let counter = 0;
  for (let i = 0; i < amount; i++) {
    let x = (width - size * amount - gap * (amount - 1)) / 2;
    for (let k = 0; k < amount; k++) {
      let offset = offsets[counter];

      offset.x += random(-0.1, 0.1);
      offset.y += random(-0.8, 0.8);

      push();
      translate(x + offset.x, y + offset.y);
      if (counter % 2.5 === 0) {
        rotate(PI);
      }

      stroke(0);
      strokeWeight(2 + Math.random() * 2);
      square(0, 0, size);
      pop();

      counter++;
      x += size + gap;
    }
    y += size + gap;
  }
}
