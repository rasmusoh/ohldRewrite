Dyn = {};

Dyn.direction = Vec2.create(); //scratchpad var

Dyn.updateWithGravity = function(velocity, delta){
    if(velocity[1] < TERMINAL_VELOCITY){
        velocity[1] += GRAVITY*delta;
    }
}

Dyn.accelerateTowardPoint = function(velocity, pos, targetPos, delta, acc, topspeed){
    Vec2.subtract(targetPos, pos, Dyn.direction);
    Vec2.normalize(Dyn.direction, Dyn.direction);
    Vec2.scale(Dyn.direction, acc*delta, Dyn.direction);
    Vec2.add(velocity, Dyn.direction, velocity);
    Vec2.capAtMax(velocity, topspeed);
};

//moving body - moving body
//relativa hastigheter
//reflektera addera
