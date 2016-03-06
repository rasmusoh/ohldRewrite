Circle = function(r, x, y){
    var x = x || 0;
    var y = y || 0;
    this.center = Vec2.create(x,y);
    this.r = r;
    this.norm = Vec2.create(0,0);
    this.proj = Line.create(0,0);
}

Circle.prototype.project = function(unitVector){
    var pointoutection = Vec2.dot(this.center, unitVector);

    this.proj[0] = pointoutection - this.r;
    this.proj[1] = pointoutection + this.r;
}
