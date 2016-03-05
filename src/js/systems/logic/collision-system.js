CollisionSystem = (function(){
    var cellsBox = new CellsBox();
    var collisionVector = Vec2.create();

    update = function(world, delta){
        var moving = world.movingEntities;
        moving.sort();

        for(i = 0; i < moving.length; i++){
            moving.update();
            //check against moving bodies (sort and sweep)
            for(j = i + 1; j < moving.length; j++){
                if(moving[i].box.max[0] <= moving[j].box.min[0]){
                    break;
                }
                else if(Collision.checkBoundingBox(moving[i].box, moving[j].box)){
                    moving[i].haveCollided = Collision.checkBodies(moving[i], moving[j]);
                }
            }

            //check against static bodies (spatial hash)
            world.grid.getCellsBox(moving.box, cellsBox);
            for(i = cellsBox.min[0]; i <= cellsBox.max[0]; i++){
                for(j = cellsBox.min[1]; j <= cellsBox.max[1]; j++){
                    for(item of world.grid.contents[i][j]){
                        if(Collision.checkBoundingBox(moving[i].box, item)){
                            moving[i].haveCollided = Collision.checkBodyStatic(moving[i], item);
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

cell
