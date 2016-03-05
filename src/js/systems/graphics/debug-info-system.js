DebugInfoSystem = (function(){
    var lineHeigth=20;

    var update = function(entities, playerEntity, delta){
        var canvas = document.getElementById("gameCanvas");
        var cam = world.cameraEntity;

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.font = "12px Courier New";

        var lineCounter = 0;

        writeLine("velocity.x:",playerEntity.c.velocity.x);
        writeLine("velocity.y:",playerEntity.c.velocity.y);
        writeLine("rotation",playerEntity.c.position.rotation);
        writeLine("pos.x",playerEntity.c.position.x);
        writeLine("pos.y",playerEntity.c.position.y);
        writeLine("ROCKET_THRUST.x:",ROCKET_THRUST.x);
        writeLine("ROCKET_THRUST.y:",ROCKET_THRUST.y);
        writeLine("state",playerEntity.c.rocket.state);
    };


    var writeLine = function(text, value){
        lineCounter++;
        ctx.fillText(text+value, cam.x, cam.y + lineHeigth*lineCounter);
    };

    return {
        update : update
    };
})();
