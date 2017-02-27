MouseDragSystem = (function(){
    var mouseDown = true;

    var update = function(world, delta) {
        var input = world.inputQueue.pop();
        if (!input ) return;
        if (input.type == INPUT.DOWN) {
            mouseDown = true;
            for (var i = 0; i < world.entities.length; i++) {
                if (world.entities[i].c.draggable && world.entities[i].c.rigidBody){
                    var box = world.entities[i].c.rigidBody.box;
                    if(Collision.boundingBoxPoint(box, input.position)) {
                        world.entities[i].c.draggable.isDragged = true; 
                    } 
                    else {
                        world.entities[i].c.draggable.isDragged = false; 
                    }
                }
            }
        } else if (input.type == INPUT.UP) {
            mouseDown = false;
            for (var i; i < world.entities.length; i ++) {
                if (world.entities[i].c.draggable){
                    world.entities[i].c.draggable.isDragged = false; 
                }
            }
        } else if (input.type == INPUT.MOUSEMOVE && mouseDown) {
            for (var i = 0; i < world.entities.length; i ++) {
                if (world.entities[i].c.draggable && world.entities[i].c.draggable.isDragged){
                        world.entities[i].c.position.translation[0] += input.position[0]; 
                        world.entities[i].c.position.translation[1] += input.position[1]; 
                }
            }
        }
    }

    return {
        update : update
    }
})();
