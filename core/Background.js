/**
* Background.js
* Handle multiple graphic elements:
* - Core hexagon
* - Background strips
* - Walls (?)
**/

function Background(sceneRef){


	// this.graphicElements = [new Hexagon()];


}

Background.prototype = {

	update:function(keyboard){

		var delta = 0.0;

		// Move
		if(keyboard[KEY_LEFT] && !keyboard[KEY_RIGHT])
				delta = 0.1;
		else if(!keyboard[KEY_LEFT] && keyboard[KEY_RIGHT])
				delta = -0.1;
	
		this.mesh.position = new THREE.Vector3(0.0,0.0,0.0); 
		this.mesh.translateY(30);
		if(delta != 0.0)
			this.mesh.rotation.z+=delta;

	},

}