let ship;
let aliens = [];
let lasers = [];
let points = 0;
let lvl = 1;

function preload() {
	alien1a = loadImage('img/saucer1a.ico');
	alien1b = loadImage('img/saucer1b.ico');

	alien2a = loadImage('img/saucer2a.ico');
	alien2b = loadImage('img/saucer2b.ico');

	alien3a = loadImage('img/saucer3a.ico');
	alien3b = loadImage('img/saucer3b.ico');
}

function setup() {
  createCanvas(600, 400);
  frameRate(10);
  imageMode(CENTER);

  ship = new Ship();

  let startX = 80;
  let startY = 120;

  // Aliens de abajo
  for (var x = 0; x < 6; x++) {
  	aliens[x] = new Alien(x * startX + 80, startY, alien1a, alien1b, 5);
  }

  // Aliens de medio
  startY = 80;
  let offset2 = 0;
  for (var i = 6; i < 12; i++) {
  	aliens[i] = new Alien(offset2 * startX + 80, startY, alien2a, alien2b, 10);
  	offset2++;
  }

  // Aliens de arriba
  if (lvl === 2) {
  	startY = 40;
  	let offset = 0;
  	for (var j = 12; j < 18; j++) {
  		aliens[j] = new Alien(offset * startX + 80, startY, alien3a, alien3b, 15);
  		offset++;
  	}
  }
}

function draw() {
  background(50);
  ship.snow();
  ship.move();

  var edge = false;
  for (var i = 0; i < aliens.length; i++) {
  	aliens[i].show();
  	aliens[i].move();

  	if (aliens[i].x > width || aliens[i].x < 0) {
  		edge = true;
  	}
  }

  if (edge) {
  	for (var j = 0; j < aliens.length; j++) {
  		aliens[j].shiftDown();
  	}
  }

  for (var las = 0; las < lasers.length; las++) {
  	lasers[las].show();
  	lasers[las].move();

  	// Colicion de la bala
  	for (var j = 0; j < aliens.length; j++) {
  		if ( lasers[las].hits(aliens[j]) ) {
  			lasers[las].remove();
  			points = points + aliens[j].pts;
  			aliens.splice(j, 1);
  		}
  	}
  }

  for (var z = lasers.length - 1; z >= 0; z--) {
  	if (lasers[z].toDelete) {
  		lasers.splice(z, 1);
  	}
  }

  updateHUD();

  if (aliens.length <= 0) {
  	nextLvl();
  }
}

function keyPressed() {
	//Movimiento de la bala
	if (key === ' ') {
		var laser = new Laser(ship.x + (ship.width / 2), ship.y);
		lasers.push(laser);
	}

	//Movimiento del jugador
	if ( keyCode ===  RIGHT_ARROW ) {
		ship.setDir(1);
	} else if ( keyCode === LEFT_ARROW ) {
		ship.setDir(-1);
	} else if ( keyCode === DOWN_ARROW) {
		ship.setDir(0);
	}
}

function updateHUD() {
	fill(255);
	text("Score: " + points, 10, 20);
	text("Aliens Restantes: " + aliens.length, 80, 20);
	text("Nivel: " + lvl, 550, 20);
}

function nextLvl() {
	setup();
	for (var i = 0; i < aliens.length; i++) {
		aliens[i].xdir += 2;
	}
	lvl += 1;
}