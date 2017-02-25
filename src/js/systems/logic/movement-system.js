MovementSystem = (function(){

    var update = function(world, delta){
        var moving = world.movingBodies;

        for(i = 0; i < moving.length; i++){
            iMoving = moving[i];
            
            Vec2.addScaled(iMoving.velocity, iMoving.acceleration, delta);
            Vec2.addScaled(iMoving.position, iMoving.velocity, delta);

            iMoving.angularVelocity += delta * iMoving.tourque;
            iMoving.rotation += delta * iMoving.angularVelocity;

            //update collisionbody with latest position/rotation
            moving[i].c.rigidBody.update(iMoving.position, iMoving.rotation);
        }

        //sort moving objects according to collision body position
        moving.sort( function(a, b){
            return a.c.rigidBody.box.min[0] - b.c.rigidBody.box.min[0];
        });
    };
    
    return {
        update : update
    };
})();
