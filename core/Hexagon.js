/** 
*	Hexagon.js 
* 	Draw a plain spinning hexagon.
**/


function Hexagon(){

	this.geometry = new THREE.Geometry();

	var ray = new THREE.Vector3(-20,20,0);
	var rotRay = new THREE.Matrix4();
	rotRay.makeRotationZ(Math.PI/3);

	// Compute six vertices
	this.geometry.vertices.push( new THREE.Vector3(ray.x,ray.y,ray.z ));
	for(var i = 0 ; i < 5 ; ++i){
		var temp = rotRay.multiplyVector3(ray);
		ray = new THREE.Vector3(temp.x,temp.y,temp.z);
		this.geometry.vertices.push( new THREE.Vector3(ray.x,ray.y,ray.z ));
	}
	// Draw a hexagon
	// . Center square (0,2,3,5)
	this.geometry.faces.push( new THREE.Face4( 0, 2, 3, 5));
	// . Left triangle
	this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	// . Right triangle
	this.geometry.faces.push( new THREE.Face3( 3, 4, 5 ) );

	
	
	// create the cursor's material
	this.material = new THREE.MeshLambertMaterial(
	    {
	      color: 0xCC0000
	    }
	);

	// create a new mesh with
	this.mesh  = new THREE.Mesh(this.geometry,this.material);
}

Hexagon.prototype = {

	update:function(keyboard){

		var delta = 0.0;

		// Move
		//if(keyboard[KEY_LEFT] && !keyboard[KEY_RIGHT])
				delta = 0.01;
		//else if(!keyboard[KEY_LEFT] && keyboard[KEY_RIGHT])
		//		delta = -0.1;
	
		//this.mesh.position = new THREE.Vector3(0.0,0.0,0.0); 
		//this.mesh.translateY(30);
		//if(delta != 0.0)
				this.mesh.rotation.z+=delta;

	},

}