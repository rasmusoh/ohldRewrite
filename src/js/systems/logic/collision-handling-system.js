CollisionHandlingSystem = (function(){
    var cellsBox = new CellsBox(),
    collisionVector = Vec2.create();

    update = function(world, delta){
        var moving = world.movingBodies;

        for(var i = 0; i < moving.length; i++){
            var body = moving[i].c.rigidBody;
            var moving = moving[i].c.movingBody;
            
            if(body.haveCollided){
                var collidingEntity = world.getEntity(body.collisionEntity);
                if(collidingEntity.rigidBody.isTrigger){
                    collidingEntity.isTriggered = true;
                    collidingEntity.triggeringEntity = moving[i].id;
                    continue; //collisions with trigger bodies are handled in their own systems
                }
                else {
                    if(collidingEntity.c.movingBody){
                        Dynamics.handleCollision(body, moving, collidingEntity.c.rigidBody, collidingEntity.c.movingBody);
                    } else {
                        Dynamics.handleStaticCollision(body, moving, collidingEntity.c.rigidBody);
                    }
                }
            }
        }
    };

    return {
        update : update
    };
})();
