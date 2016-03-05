Dyn.direction = Vec2.create(); //scratchpad var

Dyn.updateWithGravity = function(velocity, delta){
    if(velocity[1] < TERMINAL_VELOCITY){
        velocity[1] += GRAVITY*delta;
    }
}


Dyn.accelerateTowardPoint = function(velocity, pos, targetPos, delta, acc, topspeed){
    Vec2.subtract(pos, targetPos, direction);
    Vec2.normalize(direction, direction);
    Vec2.scale(direction, acc*delta);
    Vec2.add(velocity, direction, velocity);
    Vec2.capAtMax(velocity, topspeed);
};
