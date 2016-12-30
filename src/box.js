/*
	Represents a Box.
*/
function Box(sketch){
	this.sketch = sketch;
	this.wasHidden = false;
	this.createdNewBox = false;

	this.x = width;
	this.width = 35;

	//random size of the hole.
	this.holeSize = max(random(sketch.boxBuffer) + sketch.bird.size*2,90);
	//random position.
	this.position = random(height-this.holeSize-30);

	this.speed= sketch.boxSpeed;

	//draws two rectangels. One comming from the top, one from the bottom.
	this.draw = function(){
		fill(0);
		rect(this.x, 0, this.width, this.position);
		rect(this.x, this.position+this.holeSize, this.width, height-this.position-this.holeSize);
		
		this.x -=this.speed;

		//creates a new box, when it is close to the end of the canvas screen.
		if(!this.createdNewBox && this.x<width/4){
			this.sketch.boxes.push(new Box(sketch));
			this.createdNewBox = true;
		}
	}

	/*
		Checks, if the bird hits the box for the first time.
		Returns true, if they hit for the first time. false otherwise.
	*/
	this.hit = function(bird){
		inBox = isInBox(bird,this);
		if(!this.wasHidden && isInBox(bird,this)){
			this.wasHidden = true;
			return true;
		}
		return false;
	}

	function isInBox(bird, box){
		return hitsX(bird,box) && hitsY(bird,box);
	}

	//checks, if the bird is in the box according to thew x position of both.
	function hitsX(bird, box){
		return !(bird.x+(bird.size/2)<box.x||bird.x-(bird.size/2)> box.x+box.width);
	}

	//checks, if the bird is in the box according to thew y position of both.
	function hitsY(bird, box){
		return !(bird.y-(bird.size/2)>box.position && bird.y+(bird.size/2)<box.position+box.holeSize);
	}
}
