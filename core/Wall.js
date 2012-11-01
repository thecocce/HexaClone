/**
* Wall.js
* Walls automatically moving from outside the screen to the center
* The background is composed of 6 triangles.
* A given wall MUST not fill all those triangles
* (There's at least one "hole" so that the player could survive).
**/

// @thickness is the width of the wall
// @area is the location of the wall: 0 to 5 (is then multiplied by PI/3)
function Wall(thickness,area){ 

	this.distance = 50;
	this.thickness = thickness;
	this.area = area;

	this.geometry = new THREE.Geometry();
	// Dynamic vertex manipulation
	this.geometry.dynamic = true; 
		

	var p1 = new THREE.Vector3(-this.distance,this.distance,0);
	var p2 = new THREE.Vector3(-this.distance-this.thickness,this.distance+this.thickness,0);
	var px = null;
	var rotRay = new THREE.Matrix4();
	
	// Misc
	var normal = new THREE.Vector3( 0, 0, 1 ); 
	var color = [new THREE.Color( 0xBB0000 ),new THREE.Color( 0xDD0000 )];

	// Trapezes
	rotRay.makeRotationZ(Math.PI/3*(this.area%6));
	px = rotRay.multiplyVector3(p1);
	this.geometry.vertices.push( new THREE.Vector3(px.x,px.y,px.z ));
	px = rotRay.multiplyVector3(p2);
	this.geometry.vertices.push( new THREE.Vector3(px.x,px.y,px.z ));
	
	rotRay.makeRotationZ(Math.PI/3*((this.area+1)%6));
	px = rotRay.multiplyVector3(p1);
	this.geometry.vertices.push( new THREE.Vector3(px.x,px.y,px.z));
	px = rotRay.multiplyVector3(p2);
	this.geometry.vertices.push( new THREE.Vector3(px.x,px.y,px.z));
	
	// Draw quad
	this.geometry.faces.push( new THREE.Face4(0,1,3,2));
	//this.geometry.faces.push( new THREE.Face4(0,1,2,3));
	
	
	// create the cursor's material
	this.material = new THREE.MeshBasicMaterial(
	    {
	      color: 0xFFFF00,
	      // wireframe: true,
	    }
	);

	// create a new mesh with
	this.mesh  = new THREE.Mesh(this.geometry,this.material);
	console.log(this.mesh);
}

Wall.prototype = {

	update:function(){

		if(Math.abs(this.mesh.geometry.vertices[3].x) < this.thickness){
			var resetVec = new THREE.Vector3(-this.distance,this.distance);
			this.mesh.geometry.vertices[0].addSelf(resetVec);
			this.mesh.geometry.vertices[1].addSelf(resetVec);
		}

		/** Move forward **/
		var speed = 0.5;
		var speedVec = new THREE.Vector3(speed,-speed,0);
		var prevRotZ = this.mesh.rotation.z;

		// Restore initial state
		this.mesh.rotation.z = 0;
		var p1,p2,px;
		var rotRay = new THREE.Matrix4();

		// Move first two vertices
		p1 = this.mesh.geometry.vertices[0].addSelf(speedVec);
		p2 = this.mesh.geometry.vertices[1].addSelf(speedVec);

		rotRay.makeRotationZ(Math.PI/3*(this.area%6));
		px = rotRay.multiplyVector3(new THREE.Vector3(p1.x,p1.y,p1.z));
		this.mesh.geometry.vertices[0].set(px.x,px.y,px.z);
		px = rotRay.multiplyVector3(new THREE.Vector3(p2.x,p2.y,p2.z));
		this.mesh.geometry.vertices[1].set(px.x,px.y,px.z);
	

		// Rotate correctly other vertices
		rotRay.makeRotationZ(Math.PI/3*((this.area+1)%6));
		px = rotRay.multiplyVector3(new THREE.Vector3(p1.x,p1.y,p1.z));
		this.mesh.geometry.vertices[2].set(px.x,px.y,px.z);
		px = rotRay.multiplyVector3(new THREE.Vector3(p2.x,p2.y,p2.z));
		this.mesh.geometry.vertices[3].set(px.x,px.y,px.z);

		// Dynamic vertex manipulation
		this.geometry.verticesNeedUpdate = true;

		// Rotate back
		var delta = 0.01;
		this.mesh.rotation.z = prevRotZ + delta;
		/* Shear
		var minSize = 0.6;
		var animSpeed = 8;
		this.mesh.scale.x = minSize + Math.abs((1-minSize)*Math.sin(animSpeed*this.mesh.rotation.z));
		this.mesh.scale.y = minSize + Math.abs((1-minSize)*Math.sin(animSpeed*this.mesh.rotation.z));
		*/
	},

}
