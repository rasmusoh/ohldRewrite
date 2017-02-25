CollisionSystem = (function(){
    var cellsBox = new CellsBox(),
    collisionVector = Vec2.create();

    update = function(world, delta){
        var moving = world.movingRigidBodies;

        for(var i = 0; i < moving.length; i++){
            var iBody = moving[i];

            //check against moving bodies (sort and sweep)
            for(var j = i + 1; j < moving.length; j++){
                var jBody = moving[j];

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

            for(var k = cellsBox.min[0]; i <= cellsBox.max[0]; i++){

                for(var l = cellsBox.min[1]; j <= cellsBox.max[1]; j++){

                    for(item of world.grid.getContents(k, l)){

                        if(Collision.checkBoundingBox(iBody.box, item.box)){

                            iBody.haveCollided = Collision.checkBodies(iBody, item);
                            if(iBody.haveCollided) {
                                iBody.collisionEntity = item.id;
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
