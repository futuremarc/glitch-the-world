  var movers;
  var runScene1 = false;

  var setup = function() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('scene-1');
    particleSystem = new ParticleSystem();
    movers = [];
    for (var i = 0; i < 10; i++) {
      movers.push(new Mover(2, random(0, width), random(0, height)));
    }
    background(255);
  }

  var draw = function() {
    if (runScene1) {
      background(255);
      fill(255, 50);
      rect(0, 0, windowWidth, windowHeight)
      particleSystem.run();
    }
  }


  var Mover = function(m, x, y) {
    this.loc = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.accel = createVector(0, 0);
    this.mass = m;
  }


  Mover.prototype.update = function() {
    this.loc.add(this.accel);
    this.accel.mult(0);
  }

  Mover.prototype.display = function() {
    fill(0, 10);
    ellipse(this.loc.x, this.loc.y, this.mass * 2, this.mass * 2);
  }

  Mover.prototype.attract = function(mover) {

    var force = p5.Vector.sub(this.loc, mover.loc);
    var distance = force.mag();
    var strength = this.mass * 50 / (distance * distance + 10);
    force.normalize();
    force.mult(strength);
    var newForce = createVector(-force.y, force.x);
    return newForce;
  }

  Mover.prototype.applyForce = function(f) {
    this.accel.add(f);
  }

  var ParticleSystem = function() {
    this.movers = [];
    this.loc = createVector(width / 2, height / 2);
    this.moverAmount = 50;
    this.force = createVector();
    this.addParticle();
  }

  ParticleSystem.prototype.run = function() {
    for (var i = 0; i < this.moverAmount; i++) {
      for (var j = 0; j < this.moverAmount; j++) {
        var blah = p5.Vector.sub(this.movers[j].loc, this.movers[i].loc);
        var dist = blah.mag();
        var force = this.movers[j].attract(this.movers[i]);
        force.mult(100);
        this.movers[j].applyForce(force);
      }

      this.movers[i].update();
      this.movers[i].display();

    }
  }

  ParticleSystem.prototype.addParticle = function() {
    for (var i = 0; i < this.moverAmount; i++) {
      this.movers.push(new Mover(random(-2, 4), random(0, width), random(0, height)));
    }
  }