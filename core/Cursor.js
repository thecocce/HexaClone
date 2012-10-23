/**
* Cursor.js
**/

function Cursor(sceneRef){

	this.scene = sceneRef;
	this.geometry = new THREE.Geometry();
	// Draw a triangle
	this.geometry.vertices.push( new THREE.Vector3( -10, 0, 0 ) );
	this.geometry.vertices.push( new THREE.Vector3( 10, 0, 0 ) );
	this.geometry.vertices.push( new THREE.Vector3( 0, 20, 0 ) );
	this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

	// create the cursor's material
	this.material = new THREE.MeshLambertMaterial(
	    {
	      color: 0xCC0000
	    }
	);

	// create a new mesh with
	this.mesh  = new THREE.Mesh(this.geometry,this.material);

	// add the mesh to the scene
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
	
		this.mesh.position = new THREE.Vector3(0.0,0.0,0.0); 
		this.mesh.translateY(30);
		if(delta != 0.0)
			this.mesh.rotation.z+=delta;

	},

}