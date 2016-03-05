MovementSystem = (function(){

    var update = function(entities, playerEntity, delta){
        var filtered = entities.filter( function(e) {return e.c.movement && e.c.position; });
        for (e of filtered){
            Vec2.addScaled(e.c.movement.velocity, e.c.movement.acc, delta);
            Vec2.addScaled(e.c.position, e.c.movement.velocity, delta);
            e.c.position.rotation += delta * e.c.velocity.angularVelocity;
        };
    };
    
    return {
        update : update
    };
})();
