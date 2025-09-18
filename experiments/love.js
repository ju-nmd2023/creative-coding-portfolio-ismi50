let particles = [];
let numParticles = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  //positions
  for (let i = 0; i < numParticles; i++) {
    particles.push(new LoveParticle(random(width), random(height)));
  }
}

function draw() {
  background(0, 0, 0, 15);

  let mousePos = createVector(mouseX, mouseY);

  for (let p of particles) {
    p.update();
    p.draw();
  }
}

class LoveParticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(1, 3));
    this.acceleration = createVector(0, 0);
    this.lastPosition = this.position.copy();
    this.colorHue = random(0, 360);
  }

  //attraction toward a point
  attract(target) {}

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(25);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    noStroke();
    fill(this.colorHue, 80, 100, 60);
    ellipse(this.position.x, this.position.y, 4, 4);
  }
}
