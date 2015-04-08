  var runScene4 = false;
  var velX;
  var velY;
  var a = document.getElementById('container');
  var progBars = [];
  var r = 255,
    g = 255,
    b = 255;
  var totalScore = 0;
  var totalTime;
  var seconds;
  var interval1;
  var interval2;
  var interval3;
  var interval4;
  var interval1Set = false;
  var interval2Set = false;
  var interval3Set = false;
  var interval4Set = false;
  var secondCounter = 0;
  var clickable = true;
  var tutorialDone = false;
  var blueLAR;
  var orangeLAR;
  var grayLAR;
  var purpleLAR;
  var ID = 0;
  var blueIMG;
  var orangeIMG;
  var grayIMG;
  var purpleIMG;


  $(document).ready(function() {
    $(document).on("touchmove", function(e) {
      e.preventDefault();
    })

    Hammer(a).on("pan", function(event) {
      //console.log(event);
      velX = event.velocityX;
      velY = event.velocityY;
    });
  })

  var preload = function() {
    blueIMG = createImg("../assets/head_pink/lar_head_pink.gif", "SWIPE TO SORT");
  }
  var setup = function() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('scene-4');
    progBars.push(new ProgressBar());
    progBars[0].myColor = "red";
    progBars[0].x = width / 2;
    progBars[0].y = height / 2;
    // progBars[0].r = 242;
    // progBars[0].g = 125;
    // progBars[0].b = 114;
    textAlign(CENTER);
  }

  // var preload = function(){
  //   blueIMG = createImg("./assets/head_pink/lar_head_pink.gif", "SWIPE TO SORT");

  // }


  var draw = function() {

    if (runScene4) {
      background(r, g, b);

      for (var i = 0; i < progBars.length; i++) {
        if (!progBars[i].completed) {
          progBars[i]._checkTouch();
          progBars[i]._display();
          progBars[i]._counter();
          progBars[i]._checkBoarder();
        }
      }

      pinkBorder();
      purpleBorder();
      greenBorder();
      redBorder();
      checkTime();
      if (g < 255) {
        g += 10;
        b += 10;
      }

      if (!tutorialDone) {
        textSize(width * .065);
        fill(0);
        text("SWIPE", width / 2, height * .15);
        textSize(width * .070);
        text("> > >", width / 2, height * .19);
      } else {
        fill(0);
        textSize(width * .065);
        text("Score: " + totalScore, width / 2, height * .15);
      }
    }
  }

  var checkTime = function() {
    totalTime = new Date();
    //seconds = totalTime.getSeconds();
    if (seconds !== totalTime.getSeconds()) {
      secondCounter++;
      seconds = totalTime.getSeconds();
    }
    if (secondCounter < 10) {
      //console.log("round 1", secondCounter);
      if (!interval1Set) {
        interval1 = setInterval(function() {
          progBars.push(new ProgressBar())
        }, 2000);
        interval1Set = true;
      }
    } else if (secondCounter >= 10 && secondCounter < 20) {
      //console.log("round 2", secondCounter);
      if (!interval2Set) {
        clearInterval(interval1);
        interval2 = setInterval(function() {
          progBars.push(new ProgressBar())
        }, 1500);
        interval2Set = true;
      }
    } else if (secondCounter >= 20 && secondCounter < 30) {
      //console.log("round 3", secondCounter);
      if (!interval3Set) {
        clearInterval(interval2);
        interval3 = setInterval(function() {
          progBars.push(new ProgressBar())
        }, 1000);
        interval3Set = true;
      }
    } else {
      //console.log("round 4", secondCounter);
      if (!interval4Set) {
        clearInterval(interval3);
        interval4 = setInterval(function() {
          progBars.push(new ProgressBar())
        }, 750);
        interval4Set = true;
      }

    }
  }

  var ProgressBar = function() {
    this.diameter = width * .25;
    this.speed = random(1, 6);
    this.ranColor = random(1);
    this.len = width * .35;
    this.moving = false;
    this.slide = false;
    this.degree = -90;
    this.d = new Date();
    this.seconds = this.d.getSeconds();
    this.timeLeft = Math.floor(random(2, 7));
    this.interval = (this.timeLeft * 1000) / 360;
    this.completed = false;
    this.img;


    if (this.ranColor < .25) {
      this.img = blueIMG;
      this.myColor = "purple";

    } else if (this.ranColor >= .25 && this.ranColor < .50) {
      this.img = blueIMG;
      this.myColor = "red";

    } else if (this.ranColor >= .50 && this.ranColor < .75) {
      this.img = blueIMG;
      this.myColor = "green";

    } else {
      this.img = blueIMG;
      this.myColor = "pink";
    }

    this.img.touchStarted(this._moveTrue.bind(this));
    this.img.touchEnded(this._moveFalse.bind(this));
    this.img.style("width", width * .35);
    this.img.style("height", width * .35);
    this.offsetSize = this.img.elt.offsetWidth / 2;
    console.log(this.offsetSize);
    this.x = random(this.diameter, width - this.diameter) - this.offsetSize;
    this.y = random(this.diameter, height - this.diameter) - this.offsetSize;
    this.img.parent('scene-4');


    // if (this.ranColor < .25) {
    //   this.r = 239;
    //   this.g = 75;
    //   this.b = 252;
    //   this.myColor = "pink";
    // } else if (this.ranColor >= .25 && this.ranColor < .50) {
    //   this.r = 98;
    //   this.g = 79;
    //   this.b = 242;
    //   this.myColor = "purple";
    // } else if (this.ranColor >= .50 && this.ranColor < .75) {
    //   this.r = 48;
    //   this.g = 242;
    //   this.b = 116;
    //   this.myColor = "green";
    // } else {
    //   this.r = 242;
    //   this.g = 125;
    //   this.b = 114;
    //   this.myColor = "red";
    // }

  }

  ProgressBar.prototype._counter = function() {
    if (this.degree <= 270) {
      this.degree += this.speed;
    } else {
      this.completed = true;
      penalty();
    }
  }

  ProgressBar.prototype._moveTrue = function() {
    this.moving = true;
  }

  ProgressBar.prototype._moveFalse = function() {
    this.moving = false;
  }

  ProgressBar.prototype._display = function() {
    fill(this.r, this.g, this.b);
    stroke(210);
    this.img.position(this.x, this.y);
    // arc(this.x, this.y, this.diameter, this.diameter, radians(this.degree), PI + HALF_PI, PIE);
    // ellipseMode(CENTER);
    // noFill();
    // ellipse(this.x, this.y, width * .25, width * .25);
  }

  // ProgressBar.prototype._countdown = function() {
  //   noStroke();
  //   fill(0);
  //   textAlign(CENTER);
  //   this.d = new Date();
  //   text((this.seconds + this.timeLeft) - this.d.getSeconds(), this.x, this.y);
  // }

  ProgressBar.prototype._checkTouch = function() {
    if (this.moving) {
      this.x = touchX - this.offsetSize;
      this.y = touchY - this.offsetSize;
      console.log(this.x, this.y);
      this.slide = true;
    }
    if (this.slide) {
      if (velX > 0) {
        this.x -= velX * 15;
        velX *= .80;
      }
      if (velX < 0) {
        this.x -= velX * 15;
        velX *= .80;
      }
      if (velY > 0) {
        this.y -= velY * 15;
        velY *= .80;
      }
      if (velY < 0) {
        this.y -= velY * 15;
        velY *= .80;
      }
    }
  }

  ProgressBar.prototype._checkBoarder = function() {
    if (this.myColor === "red") {
      if (this.x + this.diameter / 2 > width * .90) {
        this.img.remove();
        totalScore++;
        this.completed = true;
        tutorialDone = true;
      }
      if (this.y - this.diameter / 2 < height * .06 || this.y + this.diameter / 2 > height * .94 || this.x - this.diameter / 2 < width * .10) {
        this.img.remove();
        penalty();
        this.completed = true;
      }
    } else if (this.myColor === "green") {
      if (this.x - this.diameter / 2 < width * .10) {
        this.img.remove();
        totalScore++;
        this.completed = true;
      }
      if (this.y - this.diameter / 2 < height * .06 || this.y + this.diameter / 2 > height * .94 || this.x + this.diameter / 2 > width * .90) {
        this.img.remove();
        penalty();
        this.completed = true;
      }
    } else if (this.myColor === "pink") {
      if (this.y - this.diameter / 2 < height * .06) {
        this.img.remove();
        totalScore++;
        this.completed = true;
      }
      if (this.y + this.diameter / 2 > height * .94 || this.x + this.diameter / 2 > width * .90 || this.x - this.diameter / 2 < width * .10) {
        this.img.remove();
        penalty();
        this.completed = true;
      }
    } else if (this.myColor === "purple") {
      if (this.y + this.diameter / 2 > height * .94) {
        this.img.remove();
        totalScore++;
        this.completed = true;
      }
      if (this.y - this.diameter / 2 < height * .06 || this.x + this.diameter / 2 > width * .90 || this.x - this.diameter / 2 < width * .10) {
        this.img.remove();
        penalty();
        this.completed = true;
      }
    }
  }

  var penalty = function() {
    g = 0;
    b = 0;
  }

  var touchStarted = function() {
    for (var i = 0; i < progBars.length; i++) {
      if (dist(touchX, touchY, progBars[i].x, progBars[i].y) < progBars[i].img.width / 2 && clickable) {
        progBars[i].moving = true;
        clickable = false;
      }
    }
  }


  var touchEnded = function() {
    for (var i = 0; i < progBars.length; i++) {
      progBars[i].moving = false;
      clickable = true;
    }
  }

  var pinkBorder = function() {
    noStroke();
    fill(239, 75, 242);
    quad(0, 0, width, 0, width * .90, height * .06, width * .10, height * .06, 0, 0);

  }

  var purpleBorder = function() {
    noStroke();
    fill(98, 79, 242);
    quad(0, height, width, height, width * .90, height * .94, width * .10, height * .94, 0, 0);

  }

  var greenBorder = function() {
    noStroke();
    fill(48, 242, 116);
    quad(0, 0, width * .10, height * .06, width * .10, height * .94, 0, height, 0, 0);
  }

  var redBorder = function() {
    noStroke();
    fill(242, 125, 114);
    quad(width, 0, width, height, width * .90, height * .94, width * .90, height * .06, width, 0);
  }