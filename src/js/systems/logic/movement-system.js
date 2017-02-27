MovementSystem = (function(){

    var update = function(world, delta){

        for(var i = 0; i < world.moving.length; i++){
            iMoving = world.moving[i];
            
            Vec2.addTransformed(iMoving.c.movingBody.velocity, iMoving.c.movingBody.acceleration, 0, delta);
            Vec2.addTransformed(iMoving.c.position.translation, iMoving.c.movingBody.velocity, 0, delta);

            iMoving.c.movingBody.angularVelocity += delta * iMoving.c.movingBody.tourque;
            iMoving.c.position.rotation += delta * iMoving.c.movingBody.angularVelocity;

            if (iMoving.c.rigidBody) {
                iMoving.c.rigidBody.update(iMoving.c.position.translation, iMoving.c.position.rotation);
            }
        }

        //sort moving objects according to collision body position
        world.moving.sort( function(a, b){
            return a.c.rigidBody.box.min[0] - b.c.rigidBody.box.min[0];
        });
    };
    
    return {
        update : update
    };
})();
