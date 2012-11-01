/**
* Game.js
**/

function Game() {

	var self = this;

	// Resources
	//this.resource_manager = new ResourceManager;

	// Game current state
	this.is_running = false;

	// External events
	// . Keyboard tracking
	this.keyboard = {
		'status':{},
		onKeydown:function(event){
			event.preventDefault();
			this.status[event.keyCode]=true;
		},
		onKeyup:function(event){
			delete this.status[event.keyCode];
		},
	};
	window.addEventListener('keydown', function(event) { self.keyboard.onKeydown(event); }, false);
	window.addEventListener('keyup', function(event) { self.keyboard.onKeyup(event); }, false);

	// . Mouse tracking
	/*
	game.mouse = {'x':0,'y':0};
	game.canvas_tag.onmousemove = function(e){
		game.mouse.x = e.clientX - game.canvas_tag.offsetLeft;
		game.mouse.y = e.clientY - game.canvas_tag.offsetTop;
	};
	*/

	// default control hack (will disable keyboard scrolling)
	window.addEventListener('keydown',function(event) { event.preventDefault(); },false);
	// Auto focus
	window.onload = document.getElementById('game').focus();
	

	// Debug
	//this.frame_count = 0;
	//this.last_computed_FPS_time = E_TimeNow() - 1000;
	//this.realtime_FPS = 0;
}

Game.prototype = {

	load: function(file_list,callback_function){
		// Load once
		if(!this.resource_manager.ready)
			this.resource_manager.loadFiles(file_list,callback_function);
	},

	init: function() {
		this.is_running = true;
		// Initial default Level
		//this.current_level = new Level(this);
		// set the scene size
	
	// set some camera attributes
	var VIEW_ANGLE = 45,
	  ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	// get the DOM element to attach to
	this.container = document.getElementById("game");

	// create a WebGL renderer, camera
	// and a scene
	this.renderer = new THREE.WebGLRenderer();
	this.camera =
	  new THREE.PerspectiveCamera(
	    VIEW_ANGLE,
	    ASPECT,
	    NEAR,
	    FAR);

	this.scene = new THREE.Scene();

	// add the camera to the scene
	this.scene.add(this.camera);

	// the camera starts at 0,0,0
	// so pull it back
	this.camera.position.z = 300;

	// start the renderer
	this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	// attach the render-supplied DOM element
	this.container.appendChild(this.renderer.domElement);


	// create a point light
	var pointLight =
	  new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	this.scene.add(pointLight);

	this.player = new Cursor(this);
	this.animatedBackground = new Background(this);

	},

	update: function(){

		// Restart
		//if(this.keyboard.status[KEY_RESTART])
		//	this.current_level = new Level(this);

		// Gameover?
		//if(this.current_level.is_finished)
		//	return;

		// Do stuff...
		//this.current_level.update(this.keyboard.status);

		// Move camera
		//this.camera.rotation.z+=0.01;
		this.player.update(this.keyboard.status);
		this.animatedBackground.update();

	},


	render: function() {
		// draw!
		this.renderer.render(this.scene, this.camera);
	},

	debugLog: function() {

		// FrameCount
		this.frame_count++;
		var current_time = E_TimeNow();
		if( current_time - this.last_computed_FPS_time >= 1000){
			this.last_computed_FPS_time = current_time;
			this.realtime_FPS = this.frame_count;
			this.frame_count = 0;
		}

	},

}