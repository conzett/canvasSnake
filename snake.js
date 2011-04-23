var snakeObject = function(direction, body){
	
	this.body = body || [
		{ x: 10, y: 5},
		{ x: 10, y: 6},
		{ x: 10, y: 7},
		{ x: 10, y: 8},
	];
	
	this.direction = direction || 1;
	
	this.move = function() {
		
		var newSegment = {x: this.body[0].x, y: this.body[0].y};
		
		switch (this.direction)
		{
		case 1:
			newSegment.y--;
			break;
		case 2:
			newSegment.x++;
			break;
		case 3:
			newSegment.y++;
			break;
		case 4:
			newSegment.x--;
			break;
		}
		
		this.body.unshift(newSegment);
		this.body.pop();
	}
	
	this.left = function(){
		if(this.direction === 1 || 3){
			this.direction = 4;
		}
	}
	
	this.up = function(){
		if(this.direction === 2 || 4){
			this.direction = 1;
		}
	}
	
	this.down = function(){
		if(this.direction === 2 || 4){
			this.direction = 3;
		}
	}
	
	this.right = function(){
		if(this.direction === 1 || 3){
			this.direction = 2;
		}
	}
	
	this.length = function(){
		return this.body.length;
	}
	
	this.grow = function(){
		if(this.body[this.body.length-1].x === this.body[this.body.length-2].x){
			this.body.push(
				       {x: this.body[this.body.length-1].x,
				       y: this.body[this.body.length-1].y + 1}
			);
		}else{
			this.body.push(
				       {x: this.body[this.body.length-1].x + 1,
				       y: this.body[this.body.length-1].y}
			);
		}
		return this.body.length;
	}
	
	this.checkIntersection = function() {
		var i;
		for(i=this.body.length-1;i>0;i--){
			if(
			   (this.body[0].x === this.body[i].x) &&
			   (this.body[0].y === this.body[i].y))
			{				
				return true;
			}
		}
		return false;
	}
}

var levelObject = function(snake, dimensions, increment){
	
	this.snake = snake || new snakeObject();
	this.dimensions = dimensions || { width: 100, height: 100};
	this.increment = increment || 10;
	this.food = new Array();
	
	this.createFood = function(x, y){
		this.food.push({x: x, y: y});
	}
	
	this.outOfBounds = function(){
		if(
		   ((this.snake.body[0].x * this.increment >= this.dimensions.width) ||
		   (this.snake.body[0].x * this.increment < 0)) ||
		   ((this.snake.body[0].y * this.increment >= this.dimensions.height) ||
		   (this.snake.body[0].y * this.increment < 0))
		  ){
			return true;
		}
		return false;
	}	
}

var level = new levelObject(null, { width: 300, height: 300 });
var canvas = document.getElementById('level');
var time = 100;
var status = "play";
var score = 0;

level.createFood(5, 8);

if (canvas.getContext){
	var context = canvas.getContext('2d');
	loop();
} else {
	alert("Canvas Not Supported");
}

window.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 37:
			level.snake.left();
			break;
		case 38:
			level.snake.up();
			break;
		case 39:
			level.snake.right();
			break;
		case 40:
			level.snake.down();
			break;
	}
}, false);

function loop(){
	
	context.clearRect(0, 0, level.dimensions.width, level.dimensions.height);
	level.snake.move();
	
	var j;
	
	for(j=0; j< level.snake.body.length; j++)
	{
		context.fillRect(
			level.snake.body[j].x * level.increment,
			level.snake.body[j].y * level.increment,
			level.increment, level.increment
		);
	}
	
	if(level.food.length > 0){
		context.fillRect(
			level.food[0].x * level.increment,
			level.food[0].y * level.increment,
			level.increment, level.increment
		);
	}
	
	if(level.outOfBounds() || level.snake.checkIntersection()){
		status = "stop";
		document.getElementById('status').innerHTML = "You Lost";
	}
	
	if((level.food[0].x === level.snake.body[0].x) && (level.food[0].y === level.snake.body[0].y)){
		level.food.shift();
		level.snake.grow();
		level.createFood(
			Math.floor(Math.random() * (level.dimensions.width / level.increment)),
			Math.floor(Math.random() * (level.dimensions.height / level.increment))
		)
		score += 10;
	}
	
	document.getElementById('score').innerHTML = score;
	
	if( status !== "stop"){
		setTimeout ( "loop()", time );
	}
}