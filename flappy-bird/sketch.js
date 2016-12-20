var bird;
var pipes = [];
var mic;
var sliderTop, sliderBottom;
var clapping = false;

function setup() {
  createCanvas(400, 600);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  sliderTop = createSlider(0, 1, 0.1, 0.01);
  sliderBottom = createSlider(0, 1, 0.05, 0.01);
}

function draw() {
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if (pipes[i].hits(bird)){
      console.log("HIT");
    }
  }

  bird.show();
  bird.update();

  if (frameCount % 100 == 0){
    pipes.push(new Pipe());
  }

  var thresholdTop = sliderTop.value();
  var thresholdBottom = sliderBottom.value();

  var vol = mic.getLevel();
  if (vol > thresholdTop && !clapping){
    bird.flap();
    clapping = true;
  }
  if (vol < thresholdTop){
    clapping = false;
  }

  fill(0, 255, 0);
  var y = map(vol, 0, 1, height, 0);
  rect(width - 50, y, 50, height - y);

  var  ty = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width - 50, ty, width, ty);

  var  by = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(width - 50, by, width, by);

  noStroke();


}

/*function keyPressed() {
  if (key == ' '){
    bird.flap();
  }
}*/
