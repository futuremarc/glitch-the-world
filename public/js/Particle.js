var Particle = function(){
    var _velX = THREE.Math.randFloat(-1, 1) * 5.0;
    var _velY = THREE.Math.randFloat(-1, 1) * 30.0 + 30.0;
    var _velZ = THREE.Math.randFloat(-1, 1) * 5.0;
    this.vel = new THREE.Vector3(_velX, _velY, _velZ);
    this.refPos = new THREE.Vector3(0, 0, 0);
    this.eventSpd = new THREE.Vector3(0, 0, 0);
    
    this.acc = new THREE.Vector3();
    this.gravity = new THREE.Vector3(0, 0, 0);
    
    this.material = new THREE.MeshBasicMaterial( { color: 0x333333} );
    
    this.mass = Math.random() * 15 + 15;
    this._pSize = new THREE.Vector3(this.mass, this.mass, this.mass);
    
    this.geometry = new THREE.BoxGeometry( this._pSize.x, this._pSize.y, this._pSize.z );
    this.geometry = new THREE.SphereGeometry(this._pSize.x, 18, 18);
    
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    this.mesh.position.x = 0;
    this.mesh.position.y = sphereSize;
    this.mesh.position.z = 0;
};

Particle.prototype.update = function(){
    var color = new THREE.Color("rgb(50,50,50)");
    var alpha = Math.random() * 0.5;
    color.lerp(color, alpha); 
                        
    this.material.color = color;
    
    //update mesh
    this.mesh.geometry = this.geometry;
    this.mesh.material = this.material;
    
    this.gravity.x  = 0;
    this.gravity.y  = -0.5;
    this.gravity.z  = 0;

    this.acc.add(this.gravity);
    this.acc.add(this.eventSpd);
    this.vel.add(this.acc);
    
    if(Math.abs( this.mesh.position.length() ) > sphereSize && Math.abs( this.mesh.position.length() ) < sphereSize + this._pSize.x * 5 ){
//        this.acc.multiplyScalar(0.86);
        this.vel.multiplyScalar(0.86);
    }
    
    this.mesh.position.add(this.vel);
    this.acc.multiplyScalar(0);
    
    if(Math.abs( this.mesh.position.length() ) < sphereSize){
        this.repulsive();
    } else {
        this.attraction();
    }
    
    if (this.vel.length() < 0.1){
        this.isDead();   
    }
};

Particle.prototype.isDead = function(){
    var _velX = THREE.Math.randFloat(-1, 1) * 5.0;
    var _velY = THREE.Math.randFloat(-1, 1) * 30.0 + 30.0;
    var _velZ = THREE.Math.randFloat(-1, 1) * 5.0;
    this.vel = new THREE.Vector3(_velX, _velY, _velZ);
    
    this.mesh.position.x = 0;
    this.mesh.position.y = sphereSize;
    this.mesh.position.z = 0;
};

Particle.prototype.repulsive = function(){
   //attraction force
    var force = new THREE.Vector3();
    force.subVectors ( this.mesh.position, this.refPos );
    
    force.normalize();
    force.multiplyScalar(2);
    this.acc.add(force);
};

Particle.prototype.attraction = function(){
    //attraction force
    var force = new THREE.Vector3();
    force.subVectors ( this.refPos, this.mesh.position );
//    var dist = force.length();
//    if( dist < 5){ dist = 5; } else if ( dist > 25){ dist = 25; }
    force.normalize();
    
//    var strength = this.mass * 10 / (dist * dist);
//    force.multiplyScalar(strength);
    force.multiplyScalar(2);
    
    this.acc.add(force);
}

Particle.prototype.attractEach = function(_obj){
    var obj = _obj;
    
    var force = new THREE.Vector3();
    force.subVectors( obj, this.mesh.position);
    
    var dist = force.length();
    if( dist < 5){ dist = 5; } else if ( dist > 25){ dist = 25; }
    
    force.normalize();
    
    var strength = (this.mass * obj.mass) / (dist * dist);
    force.multiplyScalar(strength);
    
    return force;
}

Particle.prototype.addForce = function(_f){
    var f = _f;
    this.acc.add(f);
}

Particle.prototype.getGeometry = function(){
    return this.geometry; 
};

Particle.prototype.getMaterial = function(){
    return this.material;                        
};

Particle.prototype.getMesh = function(){
    return this.mesh;  
};

