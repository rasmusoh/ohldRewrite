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
