//line segment representing the edge of the game world
//norm = line normal, 
Edge = function(x1, y1, x2, y2, downFacing){
    this.verteces = [Vec2.create(x1, y1), Vec2.create(x2, y2)];
    this.norm = Vec2.create(
            this.verteces[0][1] - this.verteces[1][1], 
            this.verteces[1][0] - this.verteces[0][0]);
    Vec2.normalize(this.norm, this.norm);
    if(downFacing){
        Vec2.scale(this.norm, -1, this.norm);
    }
    this.proj = Line.create(0,0);

    this.project(this.norm);
    this.normProj = Line.create(this.proj[0], this.proj[1]);

    this.parallellNorm = Vec2.create(0,0);
    Vec2.subtract(this.verteces[1], this.verteces[0], this.parallellNorm);
    Vec2.normalize(this.parallellNorm, this.parallellNorm);
    this.project(this.parallellNorm);
    this.parallellProj = Line.create(this.proj[0], this.proj[1]);

}

Edge.prototype.project = function(unitVector){
    var normproj = Vec2.dot(this.norm, unitVector)
    var proj1 = Vec2.dot(this.verteces[0], unitVector);
    var proj2 = Vec2.dot(this.verteces[1], unitVector);

    this.proj[0] = normproj > 0 ? -Infinity : Math.min(proj1, proj2);
    this.proj[1] = normproj < 0 ? Infinity : Math.max(proj1, proj2);
}

//an array off of points connected linearly, representing the edge of the game world 
Chain = function(points, downFacing){
    this.edges = new Array(points.length - 1);
    for(i = 0; i < this.edges.length; i++){
        this.edges[i] = new Edge(
                points[i][0],
                points[i][1], 
                points[i+1][0], 
                points[i+1][1], downFacing);
    }
}
