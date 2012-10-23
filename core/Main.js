/**
	Hexaclone
	Main.js
**/

document.addEventListener("DOMContentLoaded", init, false);

// global scope
var game = null;

function init() {
	
	/*
	var resources = {
		'tex':[
			//'eye_1.png','eye_2.png','eye_3.png',
			'block_blue.png','block_green.png','block_red.png',
		],
		'sound':[
			'block','switch','bonus','tetris','level',
		],
		'music':[
			'music1','music2','music3','music4',
		],
	}
	*/

	game = new Game();
	//game.load(resources,onGameLoaded);
	onGameLoaded();
}

/** This function is called back by the loader when terminating */
function onGameLoaded() {
	game.init();
	runGame();
}

/** 
* Request Animation Frame function by Paul Irish (@paul_irish). 
* Synchronise animations at 60 FPS using browser specific API.
* Learn more at: http://paulirish.com/2011/requestanimationframe-for-smart-animating/ 
**/
window.requestAnimFrame = 	
			(function()
				{
					return  window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function(/* function */ callback, /* DOMElement */ element)
					{
						window.setTimeout(callback, 1000 / 60);
					};
				}
			)();

/**
* This function is supposed to be called every 16ms (60 PFS) via requestAnimFrame. 
* (see script/Common.js to learn more)
* The game main loop is classicaly composed of the update() and render() functions call.
*/
function runGame() {

	game.update();
	game.render();

	// Display debug log on top
	//if(DEBUG)
	//	game.debugLog();


	// Assure the 60 FPS rate
	requestAnimFrame(runGame);
}