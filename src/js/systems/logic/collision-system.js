CollisionSystem = (function(){
    var cellsBox = new CellsBox(),
    collisionVector = Vec2.create();

    update = function(world, delta){
        var moving = world.movingObjects;

        for(i = 0; i < moving.length; i++){
            var iBody = moving[i].c.rigidBody;

            //check against moving bodies (sort and sweep)
            for(j = i + 1; j < moving.length; j++){
                var jBody = moving[j].c.rigidBody;

                if(iBody.box.max[0] <= jBody.box.min[0]){
                    break;
                }
                else if(Collision.checkBoundingBox(iBody.box, jBody.box)){
                    iBody.haveCollided = Collision.checkBodies(iBody, jBody);
                    if(iBody.haveCollided) {
                        iBody.collisionEntity = moving[j].id;
                    }
                }
            }

            //check against static bodies (spatial hash)
            world.grid.getCellsBox(iBody.box, cellsBox);
            for(i = cellsBox.min[0]; i <= cellsBox.max[0]; i++){
                for(j = cellsBox.min[1]; j <= cellsBox.max[1]; j++){
                    for(item of world.grid.contents[i][j]){
                        if(Collision.checkBoundingBox(iBody.box, item)){
                            result = Collision.checkBodyStatic(iBody, item);
                            if(result) {
                                iBody.collisionEntity = moving[j].id;
                            }
                        }
                    }
                }
            }
        }
    };

    return {
        update : update
    };
})();
