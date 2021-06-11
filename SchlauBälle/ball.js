class Ball {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 10;
    this.lifetime = 255;
    this.h = 0;
  }

  friction() {
    let diff = height - (this.pos.y + this.r);
    if (diff < 1) {
      //direction of friction
      let friction = this.vel.copy();
      friction.normalize;
      friction.mult(-1);

      //magnitude of friction
      let normal = this.mass;
      friction.setMag(mu * normal);
      this.applyForce(friction);
    }
  }
  finished() {
    return this.lifetime < 0;
  }
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 1;
    this.h += 1;
  }

  show() {
    stroke(255, this.lifetime);
    fill(random(0, 360), this.h, this.h, this.lifetime);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
