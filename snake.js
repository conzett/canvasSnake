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
		if(this.direction === 1 || this.direction === 3){
			this.direction = 4;
		}
	}
	
	this.up = function(){
		if(this.direction === 2 || this.direction === 4){
			this.direction = 1;
		}
	}
	
	this.down = function(){
		if(this.direction === 2 || this.direction === 4){
			this.direction = 3;
		}
	}
	
	this.right = function(){
		if(this.direction === 1 || this.direction === 3){
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

var levelObject = function(snake, width, height, increment){
	
	this.snake = snake || new snakeObject();
	this.width = width || 300;
	this.height = height || 300;
	this.increment = increment || 10;
	this.food = new Array();
	
	this.createFood = function(x, y){
		this.food.push({x: x, y: y});
	}
	
	this.outOfBounds = function(){
		if(
		   ((this.snake.body[0].x * this.increment >= this.width) ||
		   (this.snake.body[0].x * this.increment < 0)) ||
		   ((this.snake.body[0].y * this.increment >= this.height) ||
		   (this.snake.body[0].y * this.increment < 0))
		  ){
			return true;
		}
		return false;
	}	
}

var game = function(canvas, level, score, time){
	
	this.canvas = canvas || document.getElementById('level');
	this.level = level || new levelObject();
	this.canvas.width = this.level.width;
	this.canvas.height = this.level.height;
	this.score = score || 0;
	this.time = time || 100;
	this.status = "play";
	var that = this;
	
	this.level.createFood(5, 8);
	
	window.addEventListener('keydown', function(event) {
		
		switch (event.keyCode) {
			case 37:
				that.level.snake.left();
				break;
			case 38:
				that.level.snake.up();
				break;
			case 39:
				that.level.snake.right();
				break;
			case 40:
				that.level.snake.down();
				break;
		}
		
	}, false );
	
	this.loop = function(){
	
		context.clearRect(0, 0, that.level.width, that.level.height);
		that.level.snake.move();
	
		var j;
		
		for(j=0; j< that.level.snake.body.length; j++)
		{
			context.fillStyle = "rgb(0, 31, 0)";
			context.fillRect(
				that.level.snake.body[j].x * that.level.increment,
				that.level.snake.body[j].y * that.level.increment,
				that.level.increment, that.level.increment
			);
		}
		
		if(that.level.food.length > 0){
			context.fillStyle = "rgb(139, 139, 109)";
			context.fillRect(
				that.level.food[0].x * that.level.increment,
				that.level.food[0].y * that.level.increment,
				that.level.increment, that.level.increment
			);
		}
		
		if(that.level.outOfBounds() || that.level.snake.checkIntersection()){
			that.status = "stop";
			document.getElementById('status').innerHTML = "You Lost";
		}
		
		if( (that.level.food[0].x === that.level.snake.body[0].x) &&
		    (that.level.food[0].y === that.level.snake.body[0].y)){
			that.level.food.shift();
			that.level.snake.grow();
			that.level.createFood(
				Math.floor(Math.random() * (that.level.width / that.level.increment)),
				Math.floor(Math.random() * (that.level.height / that.level.increment))
			)
			that.score += 10;
		}
		
		document.getElementById('score').innerHTML = that.score;
		
		if( that.status !== "stop" ){			
			setTimeout ( that.loop, that.time );
		}
	}
	
	if (this.canvas.getContext) {
		var context = this.canvas.getContext('2d');
		this.loop();
	} else {
		alert("Canvas Not Supported");
	}
}

var game = new game();