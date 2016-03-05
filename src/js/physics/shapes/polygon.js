//shape, the array of verteces 
//norms array of surface normals i.e. norms[0] is the vector
//perpendicular to the line segment between verteces[0] and verteces[1]
Polygon = function(verteces, x, y, rotation) {
    var x = x || 0;
    var y = y || 0;
    var rotation = rotation || 0;

    this.shape = new Array(verteces.count);
    this.verteces = new Array(verteces.count);
    this.norms = new Array(verteces.count);
    for(i = verteces.length -1; i>= 0; i--){
        this.shape[i] = Vec2.create(verteces[i][0], verteces[i][1]);
        this.verteces[i] = Vec2.create(verteces[i][0], verteces[i][1]);
        this.norms[i] = Vec2.create(0,0);
    }
    this.transform(x, y, rotation);
    this.setNorms();
    this.proj = Line.create(0,0);

};

//set transformed vector polygon to verteces translated + rotated
Polygon.prototype.transform = function(trans, angle){
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);

    for(var i = verteces.length -1; i>=0; i--){
        this.verteces[i][0] = trans[0] + shape[i][0] * cosAngle - shape[i][1] * sinAngle;
        this.verteces[i][1] = trans[1] + shape[i][1] * cosAngle + shape[i][0] * sinAngle;
    }

    this.setNorms();
};


//set the norm vectors for the specified verteces
Polygon.prototype.setNorms = function(){
    var iLast = verteces.length -1;
    norms[iLast][0] = verteces[iLast][1] - verteces[0][1];
    norms[iLast][1] = verteces[0][0] - verteces[iLast][0];
    Vec2.normalize(norms[iLast], norms[iLast]);

    for(var i = 0; i < iLast; i++){
        norms[i][0] = verteces[i][1] - verteces[i + 1][1];
        norms[i][1] = verteces[i + 1][0] - verteces[i][0];
        Vec2.normalize(norms[i], norms[i]);
    }
}

//projects polygon onto unitVector, sets line segment out accordingly
Polygon.prototype.project = function(unitVector){
    var currentProj;

    this.proj[0] = Infinity;
    this.proj[1] = -Infinity;
    for(i = verteces.length -1; i >= 0; i--){
        currentProj = Vector.dot(verteces[i], unitVector);
        if(currentProj > maxProj){
            this.proj[1] = currentProj;
        }
        if(currentProj < minProj){
            this.proj[0] = currentProj;
        }
    }
}
