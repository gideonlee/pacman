$(document).ready(function(){
//GLOBAL VARIABLES
	world = [
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2],
		[2, 5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 5, 2],
		[2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2],
		[0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0],
		[0, 0, 0, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 0, 0, 0],
		[2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 2, 2, 2, 2],
		[2, 1, 1, 1, 1, 2, 1, 2, 1, 4, 1, 1, 1, 2, 1, 1, 1, 1, 2],
		[2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2],
		[2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2],
		[0, 0, 0, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 0, 0, 0],
		[0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
		[2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2],
		[2, 5, 1, 1, 1, 2, 3, 2, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5, 2],
		[2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
	];

	var blinky = {
		x: 8,
		y: 9,
		chase: true,
		desireToChase: 0.65
	};

	var pinky = {
		x: 10,
		y: 9,
		chase: true,
		desireToChase: 0.5
	};

	var inky = {
		x: 10, 
		y: 10,
		chase: true,
		desireToChase: 0.5     //Between 0 and 1, the higher the number the greater the chase
	};

	var clyde = {
		x: 8,
		y: 10,
		chase: true,
		desireToChase: 0.30
	};

	var pacman = {
		x: 1, 
		y: 1,
		pause: true,
		gameover: false
	};

	var ghosts = [blinky, pinky, inky, clyde];

	// var apm = Math.random()*(700-300)+300; //speed of the ghosts

	var audio = new Audio('assets/pacman_beginning.wav');
	audio.play();
	setTimeout(function(){
		$('#instructions').hide();
		pacman.pause = false;
	}, 4200)

//UPDATE/DISPLAY FUNCTIONS
	function displayWorld() {
		var createWorld = '';
		for (var i = 0; i < world.length; i++) {
			createWorld += "<div class='row'>\n";
			for (var j = 0; j < world[i].length; j++) {
				if (world[i][j] === 2) {
					createWorld += "\t<div class='brick'></div>\n";
				}
				else if (world[i][j] === 1) {
					createWorld += "\t<div class='coin'></div>\n";
				}
				else if (world[i][j] === 3) {
					createWorld += "\t<div class='cherry'></div>\n";
				}
				else if (world[i][j] === 4) {
					createWorld += "\t<div class='health'></div>\n";
				}
				else if (world[i][j] === 5) {
					createWorld += "\t<div class='pinkDot'></div>\n";
				}
				if (world[i][j] === 0) {
					createWorld += "\t<div class='empty'></div>\n";
				}
			}
			createWorld += "</div>\n";
		}
		$('#world').html(createWorld);
	}; 	

	function displayPacman() {
		$('#pacman').css('top', pacman.y*20 + 200 + 'px');
		$('#pacman').css('left', pacman.x*20 + 250 + 'px');
	};

	function displayBlinky() {
		$('#blinky').css('top', blinky.y*20 + 200 + 'px');
		$('#blinky').css('left', blinky.x*20 + 250 + 'px');
	};

	function displayPinky() {
		$('#pinky').css('top', pinky.y*20 + 200 + 'px');
		$('#pinky').css('left', pinky.x*20 + 250 + 'px');
	};

	function displayInky() {
		$('#inky').css('top', inky.y*20 + 200 + 'px');
		$('#inky').css('left', inky.x*20 + 250 + 'px');
	};

	function displayClyde() {
		$('#clyde').css('top', clyde.y*20 + 200 + 'px');
		$('#clyde').css('left', clyde.x*20 + 250 + 'px');
	};

//GHOST ACTION FUNCTIONS
	function moveRandomly(num, ghost) {
		if (num < 0.24) {
			direction = 'left';
			ghost.x--;
		}
		else if (num > 0.25 && num < 0.49) {
			direction = 'up'
			ghost.y--;
		}
		else if (num > 0.5 && num < 0.74) {
			direction = 'right';
			ghost.x++; 
		}
		else {
			direction = 'down'; 
			ghost.y++; 
		}
		return direction;
	};

	function pursuePacman(chooseDirection, udlr, ghost) {
		//If upDownLeftRight (udlr) is higher, ghost will tend to pursue pacman vertically. 
		if (chooseDirection < udlr) {
			if (pacman.y > ghost.y) {
				direction = 'down';
				ghost.y++; 
			}
			else {
				direction = 'up';
				ghost.y--;
			}
		}		
		else {
			if (pacman.x > ghost.x) {
				direction = 'right';
				ghost.x++;
			}	
			else {
				direction = 'left';
				ghost.x--; 
			}
		}
		return direction; 
	};

	function runAway(chooseDirection, udlr, ghost) {
		if (chooseDirection < udlr) {
			if (pacman.y > ghost.y) {
				direction = 'up';
				ghost.y--; 
			}
			else {
				direction = 'down';
				ghost.y++;
			}
		}		
		else {
			if (pacman.x > ghost.x) {
				direction = 'left';
				ghost.x--;
			}	
			else {
				direction = 'right';
				ghost.x++; 
			}
		}
		return direction; 
	};

	function collisionDetectionGhost(direction, ghost, chase) {
		//If collided with wall, move ghost back and don't shift eyes 
		if (world[ghost.y][ghost.x] === 2) {
			if (direction === 'left') {
				ghost.x++;
			}
			else if (direction === 'up') {
				ghost.y++;
			}
			else if (direction === 'right') {
				ghost.x--;
			}
			else if (direction === 'down') {
				ghost.y--; 
			}
		}
		//Else shift the ghosts eyes in whichever direction they are headed
		else {
			if (chase === true) {
				if (direction === 'up') {
					if (ghost === blinky) {
						$('#blinky').css('background-image', 'url("assets/blinky-up.png")');
					}
					else if (ghost === pinky) {
						$('#pinky').css('background-image', 'url("assets/pinky-up.png")');
					}	
					else if (ghost === inky) {
						$('#inky').css('background-image', 'url("assets/inky-up.png")');
					}
					else if (ghost === clyde) {
						$('#clyde').css('background-image', 'url("assets/clyde-up.png")');
					}
				}
				else if (direction === 'down') {
					if (ghost === blinky) {
						$('#blinky').css('background-image', 'url("assets/blinky-down.png")');
					}
					else if (ghost === pinky) {
						$('#pinky').css('background-image', 'url("assets/pinky-down.png")');
					}
					else if (ghost === inky) {
						$('#inky').css('background-image', 'url("assets/inky-down.png")');
					}
					else if (ghost === clyde) {
						$('#clyde').css('background-image', 'url("assets/clyde-down.png")');
					}
				}
				else if (direction === 'left') {
					if (ghost === blinky) {
						$('#blinky').css('background-image', 'url("assets/blinky-left.png")');
					}
					else if (ghost === pinky) {
						$('#pinky').css('background-image', 'url("assets/pinky-left.png")');
					}
					else if (ghost === inky) {
						$('#inky').css('background-image', 'url("assets/inky-left.png")');
					}
					else if (ghost === clyde) {
						$('#clyde').css('background-image', 'url("assets/clyde-left.png")');
					}
				}
				else {
					if (ghost === blinky) {
						$('#blinky').css('background-image', 'url("assets/blinky-right.png")');
					}
					else if (ghost === pinky) {
						$('#pinky').css('background-image', 'url("assets/pinky-right.png")');
					}
					else if (ghost === inky) {
						$('#inky').css('background-image', 'url("assets/inky-right.png")');
					}
					else if (ghost === clyde) {
						$('#clyde').css('background-image', 'url("assets/clyde-right.png")');
					}
				}
			}
			else {
				if (ghost === blinky) {
					$('#blinky').css('background-image', 'url("assets/runaway.gif")');
				}
				else if (ghost === pinky) {
					$('#pinky').css('background-image', 'url("assets/runaway.gif")');
				}
				else if (ghost === inky) {
					$('#inky').css('background-image', 'url("assets/runaway.gif")');
				}
				else if (ghost === clyde) {
					$('#clyde').css('background-image', 'url("assets/runaway.gif")');
				}
			}
		}
	};

	function turnBlue(ghost, type) {
		if (type === 0) {
			if (ghost === blinky) {
				$('#blinky').css('background-image', 'url("assets/runaway.gif")');
			}
			else if (ghost === pinky) {
				$('#pinky').css('background-image', 'url("assets/runaway.gif")');
			}
			else if (ghost === inky) {
				$('#inky').css('background-image', 'url("assets/runaway.gif")');
			}
			else if (ghost === clyde) {
				$('#clyde').css('background-image', 'url("assets/runaway.gif")');
			}
		}
		else {
			if (ghost === blinky) {
				$('#blinky').css('background-image', 'url("assets/runfade.gif")');
			}
			else if (ghost === pinky) {
				$('#pinky').css('background-image', 'url("assets/runfade.gif")');
			}
			else if (ghost === inky) {
				$('#inky').css('background-image', 'url("assets/runfade.gif")');
			}
			else if (ghost === clyde) {
				$('#clyde').css('background-image', 'url("assets/runfade.gif")');
			}
		}
	};

//GHOST MOVEMENT AI
	function blinkyMove() {
		if (pacman.pause === false) {
			var chooseDirection = Math.random();
			var chooseStyle = Math.random(); 

			if (blinky.chase === true) {
				if (chooseStyle < blinky.desireToChase) { 
					//blinky tends to chase in either direction
					var direction = pursuePacman(chooseDirection, 0.5, blinky);
				}
				else {
					var direction = moveRandomly(chooseDirection, blinky);
				}
			}
			else {
				var direction = runAway(chooseDirection, 0.5, blinky);
			}

			collisionDetectionGhost(direction, blinky, blinky.chase);
			if (pacman.x === blinky.x && pacman.y === blinky.y && blinky.chase === true) {
				removeHealth();
				pacman.x = 1;
				pacman.y = 1;
				displayPacman(); 
			}
			else {
				displayBlinky();	
			}
		}
	};

	function pinkyMove() {
		if (pacman.pause === false) {
			var chooseDirection = Math.random(); 
			var chooseStyle = Math.random(); 
			var direction; 

			if (pinky.chase === true) {		
				if (chooseStyle < pinky.desireToChase) {
					//pinky tends to pursue Pacman vertically to corner him
					direction = pursuePacman(chooseDirection, 0.65, pinky); 
				}
				else {
					direction = moveRandomly(chooseDirection, pinky);
				}
			}
			else {
				direction = runAway(chooseDirection, 0.65, pinky);
			}

			collisionDetectionGhost(direction, pinky, pinky.chase);
			if (pacman.x === pinky.x && pacman.y === pinky.y && pinky.chase === true) {
				removeHealth();
				pacman.x = 1;
				pacman.y = 1; 
				displayPacman();
			}
			else {
				displayPinky(); 
			}
		}
	};

	function inkyMove() {
		if (pacman.pause === false) {
			var chooseDirection = Math.random();
			var chooseStyle = Math.random();
			var direction;

			if (inky.chase === true) {
				if (chooseStyle < inky.desireToChase) {
					//inky tends to pursue Pacman horizontally to corner him
					direction = pursuePacman(chooseDirection, 0.35, inky); 
				}
				else {
					direction = moveRandomly(chooseDirection, inky);
				}			
			}
			else {
				direction = runAway(chooseDirection, 0.35, inky); 
			}

			collisionDetectionGhost(direction, inky, inky.chase);
			if (pacman.x === inky.x && pacman.y === inky.y && inky.chase === true) {
				removeHealth();
				pacman.x = 1;
				pacman.y = 1; 
				displayPacman();
			}
			else {
				displayInky(); 
			}
		}
	};

	function clydeMove() {
		if (pacman.pause === false) {
			var chooseDirection = Math.random();
			var chooseStyle = Math.random();
			var direction;

			if (clyde.chase === true) {
				if (chooseStyle < clyde.desireToChase) {
					//clyde tends to chase in either direction
					direction = pursuePacman(chooseDirection, 0.5, clyde);
				}
				else {
					direction = moveRandomly(chooseDirection, clyde);			
				}
			}
			else {
				direction = runAway(chooseDirection, 0.5, clyde);
			}

			collisionDetectionGhost(direction, clyde, clyde.chase);		
			if (pacman.x === clyde.x && pacman.y === clyde.y && clyde.chase === true) {
				removeHealth();
				pacman.x = 1;
				pacman.y = 1; 
				displayPacman();
			}
			else {
				displayClyde();	
			}
		}
	};

	function adjustSpeed() {
		//2150 is total score
		//2050 - 10 x 4 + 30 x 4 is winning score on coins 
		//2010 + 120 = 2130 + 100
		if ($('#score').attr('currentScore') < '50') {
			startChase(4);
		}
		if ($('#score').attr('currentScore') > 100 && $('#score').attr('currentScore') < 200) {
			apm = Math.random()*(500-300)+300; 
		}
		if ($('#score').attr('currentScore') > 250) {
			apm = Math.random()*300; 
		}
		if ($('#score').attr('currentScore') > 300)  {
			apm = 0; 
		}
	};

	function startChase(type) {
		if (type === 0) {
			setInterval(function(){ 
				blinkyMove();
				pinkyMove();
				inkyMove();
				clydeMove();
				checkGameOver();
		 	}, Math.random()*(700-300)+300);			
		}
		else if (type === 1) { 
			setInterval(function(){ 
				blinkyMove();
				pinkyMove();
				inkyMove();
				clydeMove();
				checkGameOver();
				console.log("THE NEW SPEED IS: ");
		 	}, Math.random()*(500-300)+300);			
		}
		else if (type === 2) {
			setInterval(function(){ 
				blinkyMove();
				pinkyMove();
				inkyMove();
				clydeMove();
				checkGameOver();
				console.log("THE NEWER SPEED IS: ");
		 	}, Math.random()*300);		
		}
		else if (type === 3) {
			setInterval(function(){ 
				blinkyMove();
				pinkyMove();
				inkyMove();
				clydeMove();
				checkGameOver();
				console.log("THE NEWEST SPEED IS: ");
		 	}, Math.random()*150);		
		}
		else if (type === 4) {
			setInterval(function(){ 
				blinkyMove();
				pinkyMove();
				inkyMove();
				clydeMove();
				checkGameOver();
				console.log("THE NEWEST SPEED IS: ");
		 	}, Math.random()*0);	
		}
	};

//PACMAN'S ACTIONS
	function eatThings() { //This removes coins/cherries/apples 
		if (world[pacman.y][pacman.x] === 1) {
			world[pacman.y][pacman.x] = 0;
			updateScore(1); //For coins

			audio = new Audio('assets/pacman_chomp.wav');
			audio.currentTime = 0.35;
			audio.play();
		}
		else if (world[pacman.y][pacman.x] === 3) {
			world[pacman.y][pacman.x] = 0; 
			updateScore(3); //For cherries
			audio = new Audio('assets/pacman_eatfruit.wav');
			audio.play();
		}	
		else if (world[pacman.y][pacman.x] === 4) { //For health
			world[pacman.y][pacman.x] = 0; 
			addHealth();
		}
		else if (world[pacman.y][pacman.x] === 5) {
			world[pacman.y][pacman.x] = 0;
			for (var i = 0; i < ghosts.length; i++) {
				ghosts[i].chase = false; 
				turnBlue(ghosts[i], 0);
			}
			updateScore(5); //For pink dots
			audio = new Audio('assets/pacman_intermission.wav');
			audio.play();
			
			setTimeout(function(){
				for (var i = 0; i < ghosts.length; i++) {
					ghosts[i].chase = true; 
					turnBlue(ghosts[i], 1);
				}				
			}, 5000);
		}
	};

	function updateScore(type) {
		var newScore = parseInt($('#score').attr('currentScore')); 
		if (type === 0) { //Resets the score back to 0 on gameover
			newScore = 0;
		}
		else if (type === 3) { //For cherries
			newScore += 50; 
		}
		else if (type === 1) { //For coins
			newScore += 10;	
		} 
		else if (type === 5) { //For pink dots
			newScore += 30;  
		}
		$('#score').attr('currentScore', newScore); 
		$('#score').text($('#score').attr('currentScore'));
	};

	function checkCollision(type, ghost) {
		if (type === 1) { //For pacman to check if he runs into walls
			if (world[pacman.y][pacman.x] === 2) {
				return true; 
			}
			return false;
		}
		if (type === 2) { //For pacman to check if he runs into ghosts
			if (pacman.y === ghost.y && pacman.x === ghost.x) {
				return true; 
			}
			return false; 
		}
	};

	function addHealth() {
		$('#healthContainer').append("<div class='health'></div>");
		if (pacman.gameover === false) {
			audio = new Audio('assets/pacman_extrapac.wav');
			audio.play();
		}
	};

	function removeHealth() {
		var totalHealth = $('#health').length-1;
		$('div.health').eq(totalHealth).remove();
		pacman.pause = true; 
		if (pacman.gameover === false) {
			audio = new Audio('assets/pacman_death.wav');
			audio.play();

			blinky.x = 8;
			blinky.y = 9; 
			displayBlinky();

			pinky.x = 10;
			pinky.y = 9;
			displayPinky();

			inky.x = 10;
			inky.y = 10;
			displayInky();

			clyde.x = 8;
			clyde.y = 10;
			displayClyde();
		}
		setTimeout(function(){
			pacman.pause = false; 
		}, 1000);

	};

	function checkGameOver() {
		if ($('#healthContainer div').length === 0) {
			pacman.gameover = true;
			$('#message').text('GAME OVER'); 
			$('#message').show(); 
			$('#btn').show();
		}
		else {
			if ($('#healthContainer div').length >= 1) {
				for (var i = 0; i < world.length; i++) {
					for (var j = 0; j < world[i].length; j++) {
						if (world[i][j] === 1 || world[i][j] === 5) {
							return;
						}
					}
				}
				$('#message').text('WOW YOU WIN');
				$('#message').show();
				$('#btn').show();
				pacman.pause = true;
			}			
		}
	};

	eatThings();
	displayWorld();
	displayPacman();
	displayBlinky();
	displayPinky();
	displayInky();
	displayClyde();
	startChase(0);

	$(document).keydown(function(e){
		if (pacman.pause === false) {			
			// console.log(e.keyCode);
			if (pacman.gameover === false) {
				if (e.keyCode === 37) { //GO LEFT
					pacman.x--;
					$('#pacman').css('background-image', 'url("assets/face-left.gif")');
					if (checkCollision(1) === true) {
						pacman.x++;	
					}
				}
				else if (e.keyCode === 38) { //GO UP
					pacman.y--;
					$('#pacman').css('background-image', 'url("assets/face-up.gif")');
					if (checkCollision(1) === true) {
						pacman.y++;
					}
				}
				else if (e.keyCode === 39) { // GO RIGHT
					pacman.x++;
					$('#pacman').css('background-image', 'url("assets/face-right.gif")');
					if (checkCollision(1) === true) {
						pacman.x--;
					}
				}
				else if (e.keyCode === 40) { //GO DOWN
					pacman.y++; 
					$('#pacman').css('background-image', 'url("assets/face-down.gif")');
					if (checkCollision(1) === true) {
						pacman.y--;
					}
				}	
				for (var i = 0; i < ghosts.length; i++) {
					if (checkCollision(2, ghosts[i]) === true) { //Check ghost collision
						if (ghosts[i].chase === true) {
							removeHealth();
							$('#pacman').css('background-image', 'url("assets/face-right.gif")');
							pacman.x = 1;
							pacman.y = 1; 
						}	
						else {
							if (ghosts[i] === blinky) {
								blinky.x = 8;
								blinky.y = 9;
								blinky.chase = true;
							}
							else if (ghosts[i] === pinky) {
								pinky.x = 10;
								pinky.y = 9;
								pinky.chase = true;
							}
							else if (ghosts[i] === inky) {
								inky.x = 10;
								inky.y = 10;
								inky.chase = true; 
							}
							else if (ghosts[i] === clyde) {
								clyde.x = 8;
								clyde.y = 10;
								clyde.chase = true;
							}
						}
					}					
				}
				// adjustSpeed(); The current code breaks the game. 
	 			eatThings();
				displayPacman();
				displayWorld();
				checkGameOver();
			}
			else {
				$('#message').show(); //Remove this later; unnecessary. It is here just for testing.
				$('#btn').show(); //Remove this later; unnecessary. It is here just for testing.
				for (var i = 0; i < ghosts.length; i++) {
					ghosts[i].desireToChase = 0; 		
				}
			}
		}
	});

	$('#instructions').text('Use the directional buttons to move Pacman');
	$('#message').hide();
	$('#btn').hide();

	$('#btn').click(function(){
		$('#message').hide();
		$('#btn').hide();
		audio = new Audio('assets/coin.wav');
		audio.play();
		updateScore(0);

		addHealth();
		addHealth();

		//Reset behavior and position of ghosts
		blinky.x = 8;
		blinky.y = 9; 
		blinky.chase = true; 
		blinky.desireToChase = 0.65; 

		pinky.x = 10;
		pinky.y = 9;
		pinky.chase = true;
		pinky.desireToChase = 0.5; 

		inky.x = 10;
		inky.y = 10;
		inky.chase = true;
		inky.desireToChase = 0.5; 

		clyde.x = 8;
		clyde.y = 10;
		clyde.chase = true;
		clyde.desireToChase = 0.3;

		pacman.x = 1;
		pacman.y = 1; 
		pacman.gameover = false; 
		pacman.pause = true; 

		audio = new Audio('assets/pacman_beginning.wav');
		audio.play();
		setTimeout(function(){
			pacman.pause = false;
		}, 4200)


		world = [
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2],
			[2, 5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 5, 2],
			[2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2],
			[0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0],
			[0, 0, 0, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 0, 0, 0],
			[2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 2, 2, 2, 2],
			[2, 1, 1, 1, 1, 2, 1, 2, 1, 4, 1, 1, 1, 2, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2],
			[2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2],
			[0, 0, 0, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 0, 0, 0],
			[0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
			[2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2],
			[2, 5, 1, 1, 1, 2, 3, 2, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5, 2],
			[2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
		];

		eatThings();
		displayWorld();
		displayPacman();
		displayBlinky();
		displayPinky();
		displayInky();
		displayClyde();
	});

});

//Fix ghost chase behavior when user has almost won the game. 
//Fix the ghost turning back to normal animation. 

