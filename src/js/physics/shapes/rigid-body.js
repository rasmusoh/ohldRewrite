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
    this.body = body;
    this.haveCollided = false;
    this.collisionVector = Vec2.create();
    this.point = Vec2.create();
    this.updateBox();
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
