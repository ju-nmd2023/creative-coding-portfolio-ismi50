let position;
let velocity;
let acceleration;

//for tone.js
let oscillator;
let analyser;
let monoSynth;

let player1;

window.addEventListener("load", () => {
  player1 = new Tone.Player("experiments/firstSound.mp3").toDestination();
  oscillator = new Tone.Oscillator(432, "sine").toDestination();
  analyser = new Tone.Analyser("fft", 4096);
  player1.connect(analyser);

  monoSynth = new Tone.MonoSynth({
    oscillator: {
      type: "sawtooth",
    },
  }).toDestination();
});

window.addEventListener("click", async () => {
  await Tone.start();
  player1.start();
  monoSynth.triggerAttackRelease("C7", "2n");
  oscillator.start();
});
// end for tone.js

function setup() {
  createCanvas(innerWidth, innerHeight);
  position = createVector(100, 100);
  velocity = createVector(5, 50);

  colorMode(HSB);
  background(0, 0, 0);
}

function draw() {
  noStroke();

  const mouse = createVector(mouseX, mouseY);
  let d = dist(mouseX, mouseY, position.x, position.y);

  let speed = map(d, 9, width, 0.2, 0.05, true);
  let pulse = abs(sin(frameCount * speed)) * 4;

  let hue1 = frameCount % 360;
  let hue2 = (frameCount + 180) % 360;

  // First ellipse
  push();
  fill(hue1, 80, 100);
  ellipse(position.x, position.y, random(5) + pulse);
  ellipse(width - position.x, height - position.y, random(5) + pulse);
  pop();

  // Second ellipse
  push();
  fill(hue2, 80, 100);
  ellipse(position.x, height - position.y, random(5) + pulse / 2);
  ellipse(width - position.x, position.y, random(5) + pulse / 2);
  pop();

  //https://chatgpt.com/share/68c15f0d-01f0-800e-aa99-b6fef7111c03
  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }

  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  acceleration = p5.Vector.sub(mouse, position);
  acceleration.normalize();
  acceleration.mult(0.5);

  velocity.add(acceleration);
  velocity.x += random(-0.1, 0.1);
  velocity.y += random(-0.1, 0.1);
  velocity.limit(10);

  position.add(velocity);
}
