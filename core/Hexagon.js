/** 
*	Hexagon.js 
* 	Draw a plain spinning hexagon.
**/


function Hexagon(){

	this.geometry = new THREE.Geometry();

	var size = 18;

	var ray = new THREE.Vector3(-size,size,0);
	var rotRay = new THREE.Matrix4();
	rotRay.makeRotationZ(Math.PI/3);

	// Misc
	var normal = new THREE.Vector3( 0, 0, 1 ); 
	
	// Compute six vertices
	this.geometry.vertices.push( new THREE.Vector3(ray.x,ray.y,ray.z ));
	for(var i = 0 ; i < 5 ; ++i){
		var temp = rotRay.multiplyVector3(ray);
		ray = new THREE.Vector3(temp.x,temp.y,temp.z);
		this.geometry.vertices.push( new THREE.Vector3(ray.x,ray.y,ray.z ));
	}
	// Draw a hexagon
	// . Center square (0,2,3,5)
	this.geometry.faces.push( new THREE.Face4( 0, 2, 3, 5 ,normal,null,0));
	// . Left triangle
	this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ,normal,null,0));
	// . Right triangle
	this.geometry.faces.push( new THREE.Face3( 3, 4, 5 ,normal,null,0));

	
	
	// create the cursor's material
	this.material = new THREE.MeshLambertMaterial(
	    {
	      color: 0xAA0000,
	      // wireframe: true,
	    }
	);

	// create a new mesh with
	this.mesh  = new THREE.Mesh(this.geometry,this.material);
}

Hexagon.prototype = {

	update:function(){

		// Rotate
		var delta = 0.01;
		this.mesh.rotation.z+=delta;
		// Shear
		var minSize = 0.6;
		var animSpeed = 8;
		this.mesh.scale.x = minSize + Math.abs((1-minSize)*Math.sin(animSpeed*this.mesh.rotation.z));
		this.mesh.scale.y = minSize + Math.abs((1-minSize)*Math.sin(animSpeed*this.mesh.rotation.z));

	},

}