$(document).ready(function(){

	module("Snake Module", {
		setup: function() {
			this.testSnake = new snakeObject(1, [{x: 9, y: 9}]);
		}
	});	

	test("Test the snakes moving north", function() {
		this.testSnake.move();
		var x = this.testSnake.body[0].x;
		var y = this.testSnake.body[0].y;		
		equals(x, 9, "We expect the x coordinate to be the same" );
		equals(y, 8, "We expect the y coordinate to be decremented by 1" );		
	});
	
	test("Test the snakes moving east", function() {
		this.testSnake.direction = 2
		this.testSnake.move();
		var x = this.testSnake.body[0].x;
		var y = this.testSnake.body[0].y;		
		equals(x, 10, "We expect the x coordinate to be incremented by 1" );
		equals(y, 9, "We expect the y coordinate to be the same" );		
	});
	
	test("Test the snakes moving south", function() {
		this.testSnake.direction = 3
		this.testSnake.move();
		var x = this.testSnake.body[0].x;
		var y = this.testSnake.body[0].y;		
		equals(x, 9, "We expect the x coordinate to be the same" );
		equals(y, 10, "We expect the y coordinate to be the incremented by 1" );		
	});
	
	test("Test the snakes moving west", function() {
		this.testSnake.direction = 4
		this.testSnake.move();
		var x = this.testSnake.body[0].x;
		var y = this.testSnake.body[0].y;		
		equals(x, 8, "We expect the x coordinate to be decremented by 1" );
		equals(y, 9, "We expect the y coordinate to be the same" );		
	});
	
	test("The snake's length remains the same after moving", function() {
		this.testSnake.move();
		var value = this.testSnake.body.length;
		equals(value, 1, "We expect the snake to be the same size: 4" );
	});
	
	test('Test the "up()" method', function() {
		this.testSnake.direction = 2;
		this.testSnake.up();
		equals(this.testSnake.direction, 1, "We expect the snake to be going north" );
		this.testSnake.direction = 4;
		this.testSnake.up();
		equals(this.testSnake.direction, 1, "We expect the snake to be going north" );
	});
	
	test('Test the "down()" method', function() {
		this.testSnake.direction = 2;
		this.testSnake.down();
		equals(this.testSnake.direction, 3, "We expect the snake to be going south" );
		this.testSnake.direction = 4;
		this.testSnake.down();
		equals(this.testSnake.direction, 3, "We expect the snake to be going south" );
	});
	
	test('Test the "left()" method', function() {
		this.testSnake.direction = 1;
		this.testSnake.left();
		equals(this.testSnake.direction, 4, "We expect the snake to be going west" );
		this.testSnake.direction = 3;
		this.testSnake.left();
		equals(this.testSnake.direction, 4, "We expect the snake to be going west" );
	});
	
	test('Test the "right()" method', function() {
		this.testSnake.direction = 1;
		this.testSnake.right();
		equals(this.testSnake.direction, 2, "We expect the snake to be going east" );
		this.testSnake.direction = 3;
		this.testSnake.right();
		equals(this.testSnake.direction, 2, "We expect the snake to be going east" );
	});
	
	test("Test if the snake correctly reports intersection", function() {
		var intersection = new snakeObject( 1, [ {x:1,y:1}, {x:1,y:1} ] );
		ok(intersection.checkIntersection(), "The snake corectly reports it intersects itself" );
		intersection.body[0].x = 2;
		ok(!intersection.checkIntersection(), "The snake corectly reports it does no intersect itself" );
	});
	
	test('Test the "length() helper method', function() {
		var lengthTest = new snakeObject( 1, [ {x:1,y:1}, {x:1,y:2} ] );
		equals(lengthTest.length(), 2, "We expect the length to be 2" );
		var lengthTest = new snakeObject( 1, [ {x:1,y:1}, {x:1,y:2}, {x:1,y:3}, {x:1,y:4} ] );
		equals(lengthTest.length(), 4, "We expect the length to be 4" );
	});
	
	test('Test the "grow() method', function() {
		var growTest= new snakeObject( 1, [ {x:1,y:1}, {x:1,y:2} ] );
		equals(growTest.grow(), 3, "We expect the snake to return its length incremented by 1" );
		equals(growTest.body[growTest.body.length-1].x, growTest.body[growTest.body.length-2].x, "We expect the new segments x coordinates the same as the tail" );
		equals(growTest.body[growTest.body.length-1].y, growTest.body[growTest.body.length-2].y + 1, "We expect the new segments y coordinates to be one more than the tail" );
	});
	
	module("Game Module", {
		setup: function() {
			this.testLevel = new levelObject(null, { width: 200, height: 200});
		}
	});
	
	test('Test if a new snake is initialized along with the game', function() {
		ok(this.testLevel.snake, "We expect this to be true" );
	});
	
	test('Test the "outOfBounds()" method', function() {
		this.testLevel.snake.body[0].x = 21;
		ok(this.testLevel.outOfBounds(), "The snake corectly reports it is out of bounds horizontally positive" );
		this.testLevel.snake.body[0].x = 10;
		this.testLevel.snake.body[0].y = 21;
		ok(this.testLevel.outOfBounds(), "The snake corectly reports it is out of bounds vertically positive" );
		this.testLevel.snake.body[0].x = -1;
		ok(this.testLevel.outOfBounds(), "The snake corectly reports it is out of bounds horizontally negative" );
		this.testLevel.snake.body[0].x = 10;
		this.testLevel.snake.body[0].y = -1;
		ok(this.testLevel.outOfBounds(), "The snake corectly reports it is out of bounds vertically negative" );
		this.testLevel.snake.body[0].y = 10;
		ok(!this.testLevel.outOfBounds(), "The snake corectly reports it is in bounds" );
	});
	
	test('Test the "createFood()" method', function() {
		this.testLevel.createFood(5, 6);
		equals(this.testLevel.food[0].x, 5, "We expect the x coordinate to be 5" );
		equals(this.testLevel.food[0].y, 6, "We expect the y coordinate to be 6" );
	});

	
});