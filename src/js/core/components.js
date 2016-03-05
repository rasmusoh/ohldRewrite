velocityComponent = function(velocityX, velocityY, angularVelocity){
    this.x = velocityX || 0;
    this.y = velocityY || 0;
    this.angularVelocity = angularVelocity || 0;
};
velocityComponent.prototype.name = "velocity";

positionComponent = function(x,y,rotation) {
    this.x = x || 0;
    this.y = y || 0;
    this.rotation = rotation || 0;
};
positionComponent.prototype.name = "position";

//takes an array of points {x:x, y:y}, representing vertices ('corners')
//where x=y=0 is the entitys position
//transformed property is the current position of the verteces
PolygonComponent = function(verteces)
{
    this.verteces = new Array(verteces.count);
    this.transformed = new Polygon(verteces);
    for(i = verteces.length -1; i>= 0; i--){
        this.verteces[i] = new Vector2D(verteces[i].x, verteces[i].y);
    }
};
PolygonComponent.prototype.name = "polygon";

circleComponent = function(r){
    this.r = r;
};
circleComponent.prototype.name = "circle";

aabbComponent = function(w,h){
    this.w = w;
    this.h = h;
}
aabbComponent.prototype.name = "aabb";

aiStateComponent = function(acceleration, topspeed){
    //this.acceleration = acceleration;
    //this.topspeed = topspeed;
    //let these be global for now
};
aiStateComponent.prototype.name = "ai";

rocketComponent = function(beginningState){
    this.state = beginningState || ROCKET_STATE.FREEFALL;
};
rocketComponent.prototype.name = "rocket";

cameraComponent = function(x, y, scale, rotation){
    this.x = x || 0;
    this.y = y || 0;
    this.scale = scale || 1;
    this.rotation = rotation || 0;
};
cameraComponent.prototype.name = "camera";

appearanceComponent = function(color){
    this.color = color;
};
appearanceComponent.prototype.name = "appearance";
