/** 
* Strips.js
* Bi-colored background strips
*/

function Strips(){

	this.geometry = new THREE.Geometry();

	var ray = new THREE.Vector3(-FAR,FAR,0);
	var rotRay = new THREE.Matrix4();
	rotRay.makeRotationZ(Math.PI/3);

	// Misc
	var normal = new THREE.Vector3( 0, 0, 1 ); 
	var color = [new THREE.Color( 0xBB0000 ),new THREE.Color( 0xDD0000 )];

	// Center
	this.geometry.vertices.push( new THREE.Vector3(0,0,0));
	// Compute six vertices
	this.geometry.vertices.push( new THREE.Vector3(ray.x,ray.y,ray.z ));
	for(var i = 0 ; i < 5 ; ++i){
		var temp = rotRay.multiplyVector3(ray);
		ray = new THREE.Vector3(temp.x,temp.y,temp.z);
		this.geometry.vertices.push( new THREE.Vector3(ray.x,ray.y,ray.z));
	}
	// Draw triangles
	for(var i = 0 ; i < 6 ; ++i)
		this.geometry.faces.push( new THREE.Face3( 0, i, i+1));
	this.geometry.faces.push( new THREE.Face3(0,6,1));


	// Colors
	for(var i = 0 ; i < this.geometry.faces.length ; ++i){
		console.log(this.geometry.faces[i]);
		this.geometry.faces[i].color = color[i%2];
	}

	
	// create the cursor's material
	this.material = new THREE.MeshBasicMaterial(
	    {
	      vertexColors: true,
	      // wireframe: true,
	    }
	);

	// create a new mesh with
	this.mesh  = new THREE.Mesh(this.geometry,this.material);
}

Strips.prototype = {

	update:function(){

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