Circle = function(r, x, y){
    var x = x || 0;
    var y = y || 0;
    this.center = Vec2.create(x,y);
    this.r = r;
    this.norm = Line.create(0,0);
}

Circle.prototype.project = function(unitVector){
    var pointoutection = Vector.dot(circle.center, unitVector);

    this.proj[0] = pointoutection - circle.r;
    this.proj[1] = pointoutection + circle.r;
}
