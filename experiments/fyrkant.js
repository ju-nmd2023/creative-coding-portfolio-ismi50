const size = 20; //ändra
const gap = 19;
const amount = 15;

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(255, 200, 200);
  fill(0, 0, 0);
  stroke(0, 0, 0);
  strokeWeight(3);

  let y = (height - size * amount - gap * (amount - 1)) / 2;
  let counter = 0;
  for (let i = 0; i < amount; i++) {
    let x = (width - size * amount - gap * (amount - 1)) / 2;
    for (let k = 0; k < amount; k++) {
      push();
      translate(x, y);
      if (counter % 3 === 0) {
        rotate(Math.PI / 1);
        fill(0, 0, 0);
      }
      square(0, 0, size);
      pop();

      push();
      translate(x, y);
      if (counter % 4 === 0) {
        rotate(Math.random() * TWO_PI);
        fill(0, 0, 0);
      }
      square(0, 0, size);
      pop();

      counter++;
      x += size + gap;
    }
    y += size + gap;
  }

  noLoop();
}
