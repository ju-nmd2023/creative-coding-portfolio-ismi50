let particles = [];
let numParticles = 5000;
let z_offset = 0;
let noiseScale = 0.0006;

// Tone.js player
let secondSound;
let audioInitialized = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  noiseDetail(9);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new FlowAgent(createVector(random(width), random(height))));
  }
}

//when mouse is pressed
function mousePressed() {
  if (!audioInitialized) {
    secondSound = new Tone.Player(
      "experiments/secondSound.mp3"
    ).toDestination();

    Tone.start();
    audioInitialized = true;
    secondSound.start();

    console.log("Audio initialized");
  } else {
    if (secondSound) {
      secondSound.start();
    }
  }
}

class FlowAgent {
  constructor(pos) {
    this.position = pos.copy();
    this.velocity = createVector();
    this.acceleration = createVector();
    this.maxSpeed = 3;
    this.lastPosition = pos.copy();
    this.colorHue = random(180, 540);
  }

  //flow field + particle system inspired by: https://dev.to/nyxtom/flow-fields-and-noise-algorithms-with-p5-js-5g67, https://www.tylerxhobbs.com/words/flow-fields
  flowForce() {
    let angle = map(
      noise(
        this.position.x * noiseScale,
        this.position.y * noiseScale,
        z_offset
      ),
      0,
      1,
      0,
      TWO_PI * 4
    );
    let force = p5.Vector.fromAngle(angle).setMag(0.9);
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration).limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(this.colorHue, 70, 200, 9);
    strokeWeight(1);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
  }

  checkEdges() {
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }
}

function draw() {
  for (let p of particles) {
    p.flowForce();
    p.update();
    p.display();
    p.checkEdges();
  }

  z_offset += 0.003;
}

// Also looked at this site for help, but didn't use anything from it: https://ragingnexus.com/creative-code-lab/experiments/perlin-noise-flow-field/
