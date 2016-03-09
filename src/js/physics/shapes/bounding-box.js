//bounding box, used for broad/mid-phase collision detection
BoundingBox = function(minX, minY, maxX, maxY){
    this.min = Vec2.create(minX, minY);
    this.max = Vec2.create(maxX, maxY);
}
