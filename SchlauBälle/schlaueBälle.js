let balls = [];

let mu = 0.1;
function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  for (let i = 0; i < 5; i++) {
    balls.push(new Ball(random(width), 200, random(1, 10)));
  }
}

function draw() {
  background(0, 100);
  let t = millis();

  for (let ball of balls) {
    let gravity = createVector(0, 0.5);
    let wind = p5.Vector.random2D();
    let jump = createVector(-0.5, -1.5);
    if (mouseIsPressed) {
      ball.applyForce(jump);
    }

    let weight = p5.Vector.mult(gravity, ball.mass);
    ball.applyForce(wind);
    ball.applyForce(weight);
    ball.friction();
    ball.update();
    ball.edges();
    ball.show();

    CreateNewBalls();
  }
}

function CreateNewBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].finished()) {
      balls.splice(i, 1);
      balls.push(new Ball(random(width), 200, random(1, 10)));
    }
  }
}
