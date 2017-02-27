CollisionHandlingDebugSystem = (function(){
    var cellsBox = new CellsBox(),
    collisionVector = Vec2.create();

    update = function(world, delta) {
        for (var i = 0; i < world.entities.length; i++) {
            var entity = world.entities[i];
            if (entity.c.appearance) {
                entity.c.appearance.color = entity.c.appearance.defaultColor;
            }
            if (entity.c.collisionVector) {
                world.removeEntity(entity);
            }
        }
        for (var i = 0; i < world.collisions.length; i++) {

            var collision = world.collisions[i];
            if (collision.entity.c.appearance) {
                collision.entity.c.appearance.color = "#ff0000";
            }
            if (collision.withEntity.c.appearance) {
                collision.withEntity.c.appearance.color = "#ff0000";
            }
        }
    }
    return {
        update : update
    };
})();
