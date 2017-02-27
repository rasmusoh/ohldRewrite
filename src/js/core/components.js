velocityComponent = function(velocityX, velocityY, angularVelocity){
    this.x = velocityX || 0;
    this.y = velocityY || 0;
    this.angularVelocity = angularVelocity || 0;
};
velocityComponent.prototype.name = "velocity";

PositionComponent = function(x,y,rotation) {
    this.translation = Vec2.create(x,y);
    this.rotation = rotation || 0;
};
PositionComponent.prototype.name = "position";


aiStateComponent = function(acceleration, topspeed){
    //this.acceleration = acceleration;

    //let these be global for now
};
aiStateComponent.prototype.name = "ai";

rocketComponent = function(beginningState){
    this.state = beginningState || ROCKET_STATE.FREEFALL;
};
rocketComponent.prototype.name = "rocket";

CameraComponent = function(x, y, scale, rotation){
    this.x = x || 0;
    this.y = y || 0;
    this.scale = scale || 1;
    this.rotation = rotation || 0;
};
CameraComponent.prototype.name = "camera";


AppearanceComponent = function(color){
    this.defaultColor = color;
    this.color = color; //current color
};
AppearanceComponent.prototype.name = "appearance";

DraggableComponent = function() {
    this.isDragged = false;
}
DraggableComponent.prototype.name = "draggable";
