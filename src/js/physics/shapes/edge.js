//line segment representing the edge of the game world
//norm = line normal, 
Edge = function(x1, y1, x2, y2, downFacing){
    this.verteces = [Vec2.create(x1, y1), Vec2.create(x2, y2)];
    this.norm = Vec2.create(
            this.verteces[0][1] - this.verteces[1][1], 
            this.verteces[1][0] - this.vereces[0][0]);
    Vec2.normalize(this.norm, this.norm);
    if(downFacing){
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
    var normproj = Vec2.dot(this.norm, unitVector)
    var proj1 = Vec2.dot(edge.verteces[0], unitVector);
    var proj2 = Vec2.dot(edge.verteces[0], unitVector);

    out[0] = normproj > 0 ? -Infinity : Math.min(proj1, proj2);
    out[1] = normproj < 0 ? Infinity : Math.max(proj1, proj2);
}

//an array off of points connected linearly, representing the edge of the game world 
Chain = function(vectors){
}
