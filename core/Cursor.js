/**
* Cursor.js
* The player is materialized by a small equilateral triangle
**/

function Cursor(gameRef){

	this.game = gameRef;
	this.scene = gameRef.scene;
	this.geometry = new THREE.Geometry();

	// Misc
	var normal = new THREE.Vector3( 0, 0, 1 ); 
	
	// Draw a triangle
	var size = 5;
	this.geometry.vertices.push( new THREE.Vector3( -size, 0, 0 ) );
	this.geometry.vertices.push( new THREE.Vector3( size, 0, 0 ) );
	this.geometry.vertices.push( new THREE.Vector3( 0, 1.7*size, 0 ) ); // sqrt(3)
	this.geometry.faces.push( new THREE.Face3( 0, 1, 2 , normal, null, 0) );
	// create the cursor's material
	this.material = new THREE.MeshLambertMaterial(
	    {
	      color: 0xFFFFFF
	    }
	);

	// create a new mesh with
	this.mesh  = new THREE.Mesh(this.geometry,this.material);

	this.scene.add(this.mesh);
}

Cursor.prototype = {

	update:function(keyboard){

		var delta = 0.0;

		// Move
		if(keyboard[KEY_LEFT] && !keyboard[KEY_RIGHT])
				delta = 0.1;
		else if(!keyboard[KEY_LEFT] && keyboard[KEY_RIGHT])
				delta = -0.1;
	

		// Translate
		var alpha = this.game.animatedBackground.hexagon.mesh.rotation.z;
		var distance = 18;
		var distanceSup = 10;
		var animSpeed = 8;

		this.mesh.position = new THREE.Vector3(0.0,0.0,0.0); 
		this.mesh.translateY(distance+distanceSup*Math.abs(Math.sin(animSpeed*alpha)));

		// Rotate
		if(delta != 0.0)
			this.mesh.rotation.z+=delta;

	},

}