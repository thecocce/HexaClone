/**
* Background.js
* Handle multiple graphic elements:
* - Core hexagon
* - Background strips
* - Walls (?)
**/

function Background(gameRef){

	this.game = gameRef;
	this.scene = gameRef.scene;

	this.hexagon = new Hexagon();
	this.strips = new Strips();

	// Wall tests
	this.walls = [
		new Wall(20,0),
	//	new Wall(20,2),  Problem with face4 vertex ordering
	//	new Wall(20,4),  Same...
	];

	// Add meshes
	this.scene.add(this.hexagon.mesh);
	for(w in this.walls)
		this.scene.add(this.walls[w].mesh);
	this.scene.add(this.strips.mesh);
	

}

Background.prototype = {

	update:function(){

		for(w in this.walls)
			this.walls[w].update();
		this.strips.update();
		this.hexagon.update();

	},

}