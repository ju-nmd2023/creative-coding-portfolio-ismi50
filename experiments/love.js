let particles = [];
let numParticles = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  //particles at random positions
  for (let i = 0; i < numParticles; i++) {
    particles.push(new LoveParticle(random(width), random(height)));
  }
}

function draw() {
  background(0, 0, 0, 15);

  let mousePos = createVector(mouseX, mouseY);

  for (let p of particles) {
    p.attract(mousePos);
    p.update();
    p.draw();
  }
}

class LoveParticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(1, 9));
    this.acceleration = createVector(0, 0);
    this.lastPosition = this.position.copy();
    this.colorHue = random(0, 360);
  }

  // attraction toward a point
  attract(target) {
    let force = p5.Vector.sub(target, this.position);
    let distance = this.position.dist(target);
    distance = constrain(distance, 5, 40);
    force.setMag(3);
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(40);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    strokeWeight(2.8);
    stroke(this.colorHue, 80, 200, 70);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );

    noStroke();
    fill(this.colorHue, 80, 100, 60);
    ellipse(this.position.x, this.position.y, 4, 4);
  }
}
