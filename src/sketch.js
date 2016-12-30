/*
	Defines the canvas view and a few variables, that are needed.
*/
function setup() {
	createCanvas(300,500);
	this.bird = new Bird();
	this.textes = new Textes();

	this.stillTouch = false;
	this.boxSpeed = 2;
	this.boxBuffer = 100;

	this.hitBorderFrame = -1;

	this.boxes = [];
	this.boxes.push(new Box(this));
}

/*
	Loop function. Will be called once per frame.
*/
function draw() {
	//lives exist
	if(this.textes.lives > 0){
		//clear background
		background(255);
		//bird hits ground or top
		birdHitsGround();
		//maybe update the box speed
		updateSpeed();
		//draw the bird
		bird.draw();

		//iterate over the boxes
		for(i = this.boxes.length-1; i>=0; i--){
			//handle each box
			currentBox = this.boxes[i];
			handleBox(currentBox);
		}
		//update the live and point text
		this.textes.draw();
	}
	else{
		//o lives -> game over screen
		showGameOver();
	}
}

/*
	Checks if the bird hits the box and if the box is still needed or out of the view.
	Reduces the lives and removes the box from boxes if needed.
*/
function handleBox(box){
	box.draw();
		
	if(box.hit(this.bird)){
		this.textes.reduce();
	}

	if(box.x<0){
		if(!box.wasHidden){
			this.textes.add(box.speed*100);
		}
		this.boxes.splice(i,1);
	}
}

/*
	Checks if the bird is hitting the ground or the top. Updates the bird position.
	Can reduce the lives.
*/
function birdHitsGround(){
	if(bird.update()){
		//only all 10 frames to give the user a chance, 
		if(frameCount>this.hitBorderFrame+10){
			this.textes.reduce();
			this.hitBorderFrame = frameCount;
		}
	}
}

/*
	Makes the boxes a bit faster. Happens only after 1000 frames.
*/
function updateSpeed(){
	if(frameCount % 1000 == 0){
		this.boxSpeed +=0.5;
		for(i = this.boxes.length-1; i>=0; i--){
			this.boxes[i].speed = boxSpeed;
		}
	}
}

/*
Displays a game over screen. Which shows the current points.
*/
function showGameOver(){
	textAlign(CENTER);
	fill(0,255,0);
	text("GAME OVER", width/2, height/2);
	text(this.textes.points, width/2, (height/2)+10);
}

/*
 "listener" for space pressed.
*/
function keyPressed(){
	if(keyCode == 32){
		touchStarted();
	}
}

/*
 "listener" for space release.
*/
function keyReleased(){
	if(keyCode == 32){
		touchEnded();
	}
}

/*
 "listener" for touch start.
*/
function touchStarted(){
	if(!this.stillTouch){
		this.stillTouch = true;
		this.bird.fly();
	}
}

/*
 "listener" for touch end.
*/
function touchEnded(){
	this.stillTouch = false;
}