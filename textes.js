/*
	Not realy textes but anyway. Just saves the lives and points and draws them to the screen.
*/
function Textes(){
	this.lives = 3;
	this.points = 0;

	// reduce the lives by one.
	this.reduce = function(){
		this.lives --;
	}

	//add the given amount of points.
	this.add = function(p){
		this.points += p;
	}

	//draws the lives and the points.
	this.draw = function(){
		for(i = 0; i<this.lives; i++){
			text("#", 10,10*(i+1));	
		}

		text(this.points, 30,10);
	}
}