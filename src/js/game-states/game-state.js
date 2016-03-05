INPUT = Object.freeze({
    "NONE":1,
    "UP":2,
    "DOWN":3});

var GameState = (function(){
    var entities,
    playerEntity,
    queuedPause,
    queuedInput,
    systems,
    renderSystem;

    var init = function(){
        entities = Levels.loadTestLevel();
        for(e of entities){
            if(e.c.rocket){
                playerEntity = e;
            }
        }

        systems = [
            RocketSystem,
            AiSystem,
            MovementSystem,
            CollisionSystem,
        ];

        renderSystems = [
            CameraSystem,
            DebugGridSystem,
            RenderSystem,
            DebugInfoSystem
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
    var handleMouseDown = function(){
        queuedInput = INPUT.DOWN;
    };

    var handleMouseUp = function(){
        queuedInput = INPUT.UP;
    };

    var handleInput = function(){
        if(queuedInput === INPUT.DOWN && playerEntity.c.rocket.state === ROCKET_STATE.FREEFALL){
            playerEntity.c.rocket.state = ROCKET_STATE.ROCKETUP;
        }else if(queuedInput === INPUT.UP && playerEntity.c.rocket.state === ROCKET_STATE.ROCKETUP){
            playerEntity.c.rocket.state = ROCKET_STATE.FREEFALL;
        };
    };

    var update = function(delta) {
        if(queuedPause === true) {
            return PauseState.gotoThis.state();
        }

        mainGameLoop(delta);

        return this;
    };

    var mainGameLoop = function(delta) {
        handleInput();
        for(system of systems){
            system.update(entities, playerEntity, delta); 
        }

    };

    var render = function(delta){
        for (system of renderSystems){
            system.update(entities, playerEntity, delta);
        }
    };

    return {
        gotoThis: gotoThis,

        init : init,

        handleMouseDown: handleMouseDown,

        handleKeyPress: handleKeyPress,

        handleMouseUp: handleMouseUp,

        update: update,

        render : render
    };
})();
