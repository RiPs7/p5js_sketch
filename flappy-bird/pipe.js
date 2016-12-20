function Pipe() {
  this.spacingHeight = 200;
  this.spacingTop = random(10, height - this.spacingHeight);
  this.x = width;
  this.w = 50;
  this.speed = 2;

  this.show = function() {
    fill(255);
    rect(this.x, 0, this.w, this.spacingTop);
    rect(this.x, this.spacingTop + this.spacingHeight, this.w, height - (this.spacingTop + this.spacingHeight));
  }

  this.update = function(){
    this.x -= this.speed;
  }

  this.offscreen = function(){
    return this.x < -this.w;
  }

  this.hits = function(bird){
    if (bird.x > this.x && bird.x < this.x + this.w){
      if (bird.y < this.spacingTop || bird.y > this.spacingTop + this.spacingHeight){
        return true;
      }
    }
    return false;
  }

}
