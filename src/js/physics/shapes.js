ShapeEnum = {
    CIRCLE: 1,
    POLYGON: 2,
    EDGE: 3
};

//object that holds a body (circle, polygon or edge), its axis-aligned bounding box
//collision flag and collision vector
RigidBody = function(type, body){
    this.box = new BoundingBox(0, 0, 0, 0);
    this.type = type;
    this.haveCollided = false;
    this.collisionVector = Vec2.create();
    this.point = Vec2.create();
}

RigidBody.prototype.update = function(position, rotation){
    switch(this.type){
        case ShapeEnum.CIRCLE:
            Vec2.set(position, this.body.center);
            break;
        case ShapeEnum.POLYGON:
            this.body.transform(position, rotation);
            break;
    }
    this.updateBox();
}

RigidBody.prototype.updateBox = function(){
    this.body.project(Vec2.xAxis);
    this.box.min[0] = this.body.proj[0];
    this.box.max[0] = this.body.proj[1];

    this.body.project(Vec2.yAxis);
    this.box.min[1] = this.body.proj[0];
    this.box.max[1] = this.body.proj[1];
}

//bounding box, used for broad/mid-phase collision detection
BoundingBox = function(minX, maxX, minY, maxY){
    this.min = Vec2.create(minX, minY);
    this.max = Vec2.create(maxX, maxY);
}

//plain old circle. its got a position. its got a radius.
Circle = function(r){
    this.center = Vec2.create(0,0);
    this.r = r;
    this.norm = Line.create(0,0);
}

Circle.prototype.project = function(unitVector){
    var pointoutection = Vector.dot(circle.center, unitVector);

    this.proj[0] = pointoutection - circle.r;
    this.proj[1] = pointoutection + circle.r;
}

//line segment representing the edge of the game world
//norm = line normal, 
Edge = function(x1, y1, x2, y2, isCeiling){
    this.verteces = [Vec2.create(x1, y1), Vec2.create(x2, y2)];
    this.norm = Vec2.create(
            this.verteces[0][1] - this.verteces[1][1], 
            this.verteces[1][0] - this.vereces[0][0]);
    Vec2.normalize(this.norm, this.norm);
    if(isCeiling){
        Vec2.scale(this.norm, -1, this.norm);
    }

    this.parallellNorm = Vec2.create(); 
    Vec2.subtract(verteces[1],verteces[0], parallellNorm);
    Vec2.normalize(this.parallellNorm, this.parallellNorm);

    this.parallellProj = Line.create();
    Edge.project(this, parallellNorm, parallellProj);

    this.proj = Line.create();
}

Edge.prototype.project = function(unitVector){
    proj1 = Vec2.dot(edge.verteces[0], unitVector);
    proj2 = Vec2.dot(edge.verteces[0], unitVector);
    out[0] = Math.min(proj1, proj2);
    out[1] = Math.max(proj1, proj2);
}

//an array off of points connected linearly, representing the edge of the game world 
Chain = function(vectors){
}

//shape, the array of verteces 
//norms array of surface normals i.e. norms[0] is the vector
//perpendicular to the line segment between verteces[0] and verteces[1]
Polygon = function(verteces) {
    this.shape = new Array(verteces.count);
    this.verteces = new Array(verteces.count);
    this.norms = new Array(verteces.count);
    for(i = verteces.length -1; i>= 0; i--){
        this.shape[i] = Vec2.create(verteces[i][0], verteces[i][1]);
        this.verteces[i] = Vec2.create(verteces[i][0], verteces[i][1]);
        this.norms[i] = Vec2.create(0,0);
    }
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
