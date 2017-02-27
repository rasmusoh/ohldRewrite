CollisionSystem = (function(){
    var cellsBox = new CellsBox(),
    collisionVector = Vec2.create();

    update = function(world, delta){
        var moving = world.moving;
        world.collisions = [];
        for(var i = 0; i < moving.length; i++){
            var haveCollided = false;
            var iBody = moving[i].c.rigidBody;

            //check against moving bodies (sort and sweep)
            for(var j = i + 1; j < moving.length; j++){
                var jBody = moving[j].c.rigidBody;

                if(iBody.box.max[0] <= jBody.box.min[0]){
                    break;
                }
                else if(Collision.checkBoundingBox(iBody.box, jBody.box)){
                    haveCollided = Collision.checkBodies(iBody, jBody, collisionVector);
                    if(haveCollided) {
                        world.collisions.push(new Manifold(moving[i],moving[j], collisionVector[0], collisionVector[1]));
                        break;
                    }
                }
            }
            if(haveCollided) 
                continue;

            //check against static bodies (spatial hash)
            world.grid.getCellsBox(iBody.box, cellsBox);
            for(var k = cellsBox.min[0]; k <= cellsBox.max[0]; k++){
                for(var l = cellsBox.min[1]; l <= cellsBox.max[1]; l++){
                    for(staticEntity of world.grid.contents[k][l]){
                        var gridBody = staticEntity.c.rigidBody;
                        if(Collision.checkBoundingBox(iBody.box, gridBody.box)){
                            haveCollided = Collision.checkBodies(iBody, gridBody, collisionVector);
                            if(haveCollided) {
                                world.collisions.push(new Manifold( moving[i], staticEntity, collisionVector[0], collisionVector[1]));
                                break;
                            }
                        }
                    }
                    if (haveCollided) 
                        break;
                }
                if (haveCollided) 
                    break;
            }
        }
    };

    return {
        update : update
    };
})();
