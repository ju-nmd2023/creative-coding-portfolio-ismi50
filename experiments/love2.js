let particles = [];
let numParticles = 5000;
let z_offset = 0;
let noiseScale = 0.002;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  noiseDetail(9);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new FlowAgent(createVector(random(width), random(height))));
  }
}

function draw() {
  for (let p of particles) {
    p.update();
    p.checkEdges();
  }

  z_offset += 0.003;
}
