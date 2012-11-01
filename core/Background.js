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
	
	this.scene.add(this.hexagon.mesh);
	this.scene.add(this.strips.mesh);
	

}

Background.prototype = {

	update:function(){

		this.strips.update();
		this.hexagon.update();

	},

}