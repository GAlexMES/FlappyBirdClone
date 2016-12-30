/*
	Represents the bird. saves the coordinates and the size. "Calculates" the velocity.
*/
function Bird(){
	this.x = 75;
	this.y = height/2;
	this.size = 24;

	this.velocity = 1;
	this.gravity = 0.55;

	/*
		Draws the bird as elipse.
	*/
	this.draw = function(){
		fill(0);
		ellipse(this.x,this.y,this.size, this.size);
	}

	/*
		Update the bird, calcualtes its new position and checks, if it hits the ground or the top.
		Returns true, if it hits ground or top. false otherwise.
	*/
	this.update = function(){
		this.velocity += this.gravity;
		this.velocity *= 0.95;
		this.y += this.velocity;

		if(this.y+(this.size/2) > height){
			this.y=height-(this.size/2);
			this.velocity = 1;
			return true;
		}else if(this.y-(this.size/2)<0){
			this.y=this.size/2;
			return true;
		}
		return false;
	}

	this.fly = function(){
		this.velocity = -10;
	}
}
