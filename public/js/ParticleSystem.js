var ParticleSystem = function(){
    
    this.mParticlesMesh = [];
    this.mParticles = [];
    
    this.maxParticles = 400;
    
    var numParticles = 10; 
    for(var i = 0; i < numParticles; i ++){
        this.mParticles[i] = new Particle();
        this.mParticlesMesh[i] = this.mParticles[i].getMesh();
    }
};


ParticleSystem.prototype.addParticles = function(){   
    var num = this.mParticles.length;
    if (this.maxParticles > num) {
        this.mParticles.push(new Particle());

        var thisIndex = this.mParticles.length -1;
        var thisMesh = this.mParticles[thisIndex].getMesh();
        this.mParticlesMesh.push( thisMesh );
    }
}

ParticleSystem.prototype.update = function(){
    var num = this.mParticles.length;
    //attract each others
    for( var i = 0; i < num; i++){
        for( var j = 0; j < num; j++){
            if( i != j){
//                var force = new THREE.Vector3();
//                var objPos = this.mParticles[i].getMesh().position;
//                console.log(objPos);
//                force = this.mParticles[j].attractEach(objPos);
//                this.mParticles[i].addForce(force);
                
                var distVecI = new THREE.Vector3();
                var distVecJ = new THREE.Vector3();
                distVecI.subVectors( this.mParticles[i].mesh.position, this.mParticles[j].mesh.position); 
                distVecJ.subVectors( this.mParticles[j].mesh.position, this.mParticles[i].mesh.position); 
                var dist = distVecI.length();
                var col  = (this.mParticles[i].mass/2 + this.mParticles[j].mass/2) /2 ;
                
                if( dist < col ){
                    var spdI = distVecI.normalize();
                    var spdJ = distVecJ.normalize();
                    
                    this.mParticles[i].eventSpd = spdJ.multiplyScalar(0.2);
                    this.mParticles[j].eventSpd = spdI.multiplyScalar(0.2);
                }
            }
        }
    }
    
    for(var i = 0; i < num; i ++){
        this.mParticles[i].update();
    }
};

ParticleSystem.prototype.addForce = function(_f){
    var f = _f;
    var num = this.mParticles.length;
    for(var i = 0; i < num; i++){
        this.mParticles[i].addForce(f);
    }
}

ParticleSystem.prototype.getMeshs = function(){
    return this.mParticlesMesh;
};

