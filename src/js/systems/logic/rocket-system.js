ROCKET_STATE = Object.freeze({
        "FREEFALL":1,
        "ROCKETUP":2,
        "NOROCKET":2});

RocketSystem = (function(){

    update = function(entities, playerEntity, delta){
        Vector.updateWithGravity(playerEntity.c.velocity, delta);

        if(playerEntity.c.rocket.state === ROCKET_STATE.ROCKETUP){
            updateRocketUp(playerEntity, delta);
        }

        Vector.capAtMax(playerEntity.c.velocity, ROCKET_TOPSPEED);
        Vector.rotateInDirection(playerEntity.c.position, playerEntity.c.velocity);
    };

    updateRocketUp = function(e, delta){
        Vector.addTransformed(e.c.velocity, ROCKET_THRUST, e.c.position.rotation, delta);
    };
    
    return {
        update : update
    };
})();
