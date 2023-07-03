var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var startStatus = false;
var playerHit = 0;
var bombFall = false;
var timer;
var start = document.getElementsByClassName('start');

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+2;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-2;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-2;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+2;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}


function randomNumber(min, max) {
	var randomNumber = Math.ceil(Math.random() * (max - min) + min);
	return randomNumber;
}


function playerCollision() {
	if(leftPressed == true){
		var player = document.getElementById('player');
		var positionLeft = player.offsetLeft;
		var newLeft = positionLeft - 1;
		
		var element = document.elementFromPoint(newLeft, player.offsetTop);

		if(element.classList.contains('explosion') == true){
			player.style.left = newLeft - 1 + 'px';
			player.className = 'character hit left';
			playerHit++;
			removeExplosion();
		}
	}

	if(rightPressed == true){
		var player = document.getElementById('player');
		var positionLeft = player.offsetLeft;
		var newLeft = positionLeft + 1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);

		if(element.classList.contains('explosion') == true){
			player.style.left = newLeft + 1 + 'px';
			player.className = 'character hit right';
			playerHit++;
			removeExplosion();
		}
	}

	if(upPressed == true){
		var player = document.getElementById('player');
		var positionTop = player.offsetTop;
		var newTop = positionTop + 1;

		var element = document.elementFromPoint(newTop, player.offsetTop);

		if(element.classList.contains('explosion') == true){
			player.style.top = newTop + 1 + 'px';
			player.className = 'character hit up';
			playerHit++;
			removeExplosion();
		}
	}

	if(downPressed == true){
		var player = document.getElementById('player');
		var positionTop = player.offsetTop;
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(newTop+32, player.offsetTop);

		if(element.classList.contains('explosion') == true){
			player.style.top = newTop - 1 + 'px';
			player.className = 'character hit down';
			playerHit++;
			removeExplosion();
		}
	}
}


function alienSpawn() {
	var sky = document.getElementsByClassName('sky')[0];
	var randomAliens = randomNumber(10,30);
	var newAlien = [];
	var randomTop = [];
	var randomRight = [];
	for(var i=0; i < randomAliens; i++)
	{
		randomTop[i] = randomNumber(1,350);
		randomRight[i] = randomNumber(1,1250);
		newAlien[i] = document.createElement('div');
		newAlien[i].classList.add('alien');
		//newAlien[i].style.bottom = randomTop[i] + 'px';
		newAlien[i].style.right = randomRight[i] + 'px';
		//newAlien[i].style.left = randomRight[i] + 'px';
		newAlien[i].style.top = randomTop[i] + 'px';
		sky.appendChild(newAlien[i]);
		console.log('alien'+' '+randomTop[i]+' '+randomRight[i]);
	}
}


function bomb(){
	bombFall = true;
	var alien = [];
	var bomb = [];
	alien = document.getElementsByClassName('alien');
	if(startStatus === true){
		var randomBomb = randomNumber(0, alien.length-1);
		for(var i=0; i < alien.length-1; i++){
			if(i === randomBomb){
				console.log('bomb spawns ' + randomBomb);
				bomb[i] = document.createElement('div');
				bomb[i].classList.add('bomb');
				bomb[i].style.top = '0px';
				alien[i].appendChild(bomb[i]);
			}
		}
	}
	clearInterval(timer);
	timer = setInterval(bombMove, 10);
}


function bombMove(){
	var bomb = [];
	bomb = document.getElementsByClassName('bomb');
	if(bombFall === true){
		for(var i=0; i < bomb.length; i++){
			bomb[i].style.top = (parseInt(bomb[i].style.top) - 1 + 'px');
			if(parseInt(bomb[i].style.top) < -300 ){
				bomb[i].classList.add('explosion');
				bomb[i].style.left = '0px';
				bomb[i].classList.remove('bomb');
				setTimeout(removeExplosion,4000);
			}
		}
	}
}


function removeExplosion(){
	var exploded = [];
	exploded = document.getElementsByClassName('explosion');
	for(var i=0; i < exploded.length; i++){
		exploded[i].remove('explosion');
	}
}


function healthBar() {
	var player = document.getElementById('player');
	var hp = document.getElementsByClassName('hp');
	if(startStatus === true)
	{
		if(playerHit == 0){
			barReset();
		}
		if(playerHit == 1)
			hp[2].style.visibility = 'hidden';
		if(playerHit == 2)
			hp[1].style.visibility = 'hidden';
		if(playerHit == 3){
			hp[0].style.visibility = 'hidden';
			player.className = 'character dead';
			gameOver();
		}
	}
}


function barReset() {
	var bar = document.getElementsByClassName('hp');
	bar[2].style.visibility = 'visible';
	bar[1].style.visibility = 'visible';
	bar[0].style.visibility = 'visible';
}


function gameOver() {
	startStatus = false;
	bombFall = false;

	var body = document.getElementsByTagName('body')[0];
	var gameOverText = document.createElement('div');
	gameOverText.classList.add('over');
	var textNode = document.createTextNode('Game Over');
	gameOverText.appendChild(textNode);
	body.appendChild(gameOverText);

	var playAgain = document.createElement('div');
	playAgain.classList.add('again');
	var textNodePlay = document.createTextNode('Play again?');
	playAgain.appendChild(textNodePlay);
	body.appendChild(playAgain);
	playAgain.addEventListener('click', replay);
	playAgain.addEventListener('click', alienSpawn);
	
	if(startStatus === false){
		clearInterval(gameStart);
		clearInterval(bomb);
		clearInterval(timer);
		clearInterval(bombMove);

		var bombs = [];
		bombs = document.getElementsByClassName('bomb');
		for(var i=0; i < bomb.length; i++){
			bombs[i].remove('bomb');
		}

		var explosion = [];
		explosion = document.getElementsByClassName('explosion');
		for(var j=0; j < explosion.length; j++){
			explosion[j].remove('explosion');
		}
	}
}


function replay(){
	playerHit=0;
	startStatus = true;
	bombFall = false;
	var replaying = document.getElementsByClassName('again')[0];
	var over = document.getElementsByClassName('over')[0];
	over.remove('over');
	replaying.remove('again');

	var aliens = document.getElementsByClassName('alien');
	for(var i=0; i < aliens.length-1; i++){
			aliens[i].parentNode.removeChild(aliens[i]);
			i--;
	}console.log('replaying');
	var player = document.getElementById('player');
	player.className = 'character stand' + lastPressed;
	startHide();
}


function startHide() {
	playerHit=0;
	start[0].style.visibility = 'hidden';
	startStatus = true;
	setInterval(bomb, 3000);
	healthBar();
	gameStart = setInterval(move,10);
}


function myLoadFunction() {
	//timeout = setInterval(move, 10);
	collision = setInterval(playerCollision, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start[0].addEventListener('click',startHide);
	start[0].addEventListener('click', alienSpawn);
	health = setInterval(healthBar, 10);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);