const gridSize = 60;
const gridGap = 15;
const gridAmount = 40;
const noiseScale = 0.09;
let noiseZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background((noiseZ * 30) % 360, 30, 95);

  let total = gridSize * gridAmount + gridGap * (gridAmount - 1);
  let startX = (width - total) / 2 + gridSize / 2;
  let startY = (height - total) / 2 + gridSize / 2;

  for (let i = 0; i < gridAmount; i++) {
    for (let k = 0; k < gridAmount; k++) {
      let x = startX + k * (gridSize + gridGap);
      let y = startY + i * (gridSize + gridGap);

      let n = noise(k * noiseScale, i * noiseScale, noiseZ);

      let offsetX = map(n, 0, 1, -25, 25);
      let offsetY = map(
        noise(k * noiseScale + 50, i * noiseScale + 50, noiseZ),
        0,
        1,
        -25,
        25
      );

      // Rotation angle
      let angle = map(n, 0, 1, 0, TWO_PI * 2);

      let weight = map(n, 0, 1, 2, 15);
      strokeWeight(weight);

      stroke(
        map(n, 0, 1, 180, 320),
        map(noise(k * noiseScale, i * noiseScale, noiseZ + 50), 0, 1, 50, 90),
        map(n, 0, 1, 60, 100)
      );

      push();
      translate(x + offsetX, y + offsetY);
      rotate(angle);
      square(0, 0, gridSize);
      pop();
    }
  }

  noiseZ += 0.01;
}
