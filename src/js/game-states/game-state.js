INPUT = Object.freeze({
    "NONE":1,
    "UP":2,
    "DOWN":3,
    "MOUSEMOVE":4});

var GameState = (function(){
    var world,
    queuedPause,
    systems,
    renderSystem;

    var init = function(){
        world = Levels.CollisionTest1();

        systems = [
            MouseDragSystem,
            MovementSystem,
            CollisionSystem,
            CollisionHandlingDebugSystem
        ];

        renderSystems = [
            DebugGridSystem,
            DebugPhysicsRenderSystem,
        ];
    };

    var gotoThis = function() {
        queuedPause = false;
        return this;
    };
    var handleKeyPress = function(e) {
        if(e.keyCode == KEYCODES.SPACE)
        {
            queuedPause = true;
        }
    };

    //don't change state immediately, might lead to state changes mid update which may introduce bugs
    //instead queue input and handle att beginning of each frame
    var handleMouseDown = function(e){
        world.inputQueue.push({ type: INPUT.DOWN, position: Vec2.create(e.clientX,  e.clientY) });
    };

    var handleMouseUp = function(e){
        world.inputQueue.push({ type: INPUT.UP, position: Vec2.create(e.clientX,  e.clientY) });
    };

    var handleMouseMove = function(e){
        world.inputQueue.push({ type: INPUT.MOUSEMOVE, position: Vec2.create(e.movementX,  e.movementY) });
    };

    var update = function(delta) {
        if(queuedPause === true) {
            return PauseState.gotoThis.state();
        }

        for(system of systems){
            system.update(world, delta); 
        }

        return this;
    };

    var render = function(delta){
        for (system of renderSystems){
            system.update(world, delta);
        }
    };

    return {
        gotoThis: gotoThis,

        init : init,

        handleMouseDown: handleMouseDown,

        handleKeyPress: handleKeyPress,

        handleMouseMove: handleMouseMove,

        handleMouseUp: handleMouseUp,

        update: update,

        render : render
    };
})();

