    var handleInput = function(){
        if(queuedInput === INPUT.DOWN && playerEntity.c.rocket.state === ROCKET_STATE.FREEFALL){
            playerEntity.c.rocket.state = ROCKET_STATE.ROCKETUP;
        }else if(queuedInput === INPUT.UP && playerEntity.c.rocket.state === ROCKET_STATE.ROCKETUP){
            playerEntity.c.rocket.state = ROCKET_STATE.FREEFALL;
        };
    };
