AiSystem = (function(){

    var update = function(entities, playerEntity, delta){
        var filtered = entities.filter( function(e) {return e.c.aiStateMachine && e.c.velocity && e.c.position; });
        for (e of filtered){
            Vector.accelerateTowardPoint(e.c.velocity, e.c.position, playerEntity.c.position, ENEMY_ACC, ENEMY_TOPSPEED2);
        }
    };

    return {
        update : update
    };
})();
