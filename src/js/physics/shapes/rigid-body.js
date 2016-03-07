ShapeEnum = {
    CIRCLE: 1,
    POLYGON: 2,
    EDGE: 3
};

//object that holds a body (circle, polygon or edge), its axis-aligned bounding box
//collision flag and collision vector
RigidBody = function(type, body){
    this.type = type;
    this.body = body;
    this.haveCollided = false;
    this.collisionVector = Vec2.create();
    this.collisionPoint = Vec2.create();
    this.box = new BoundingBox(0, 0, 0, 0);
    if( this.type === ShapeEnum.EDGE ){
        this.box.min[0] = Math.min(body.verteces[0][0], body.verteces[1][0]);
        this.box.min[1] = Math.min(body.verteces[0][1], body.verteces[1][1]);
        this.box.max[0] = Math.max(body.verteces[0][0], body.verteces[1][0]);
        this.box.max[1] = Math.max(body.verteces[0][1], body.verteces[1][1]);
    } else {
        this.updateBox();
    }
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
