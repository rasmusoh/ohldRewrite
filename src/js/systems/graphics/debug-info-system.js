DebugInfoSystem = (function(){
    var canvas,
    ctx,
    lineCounter,
    lineHeigth=20,
    cam,
    text;

    var update = function(entities, playerEntity, delta){
        canvas = document.getElementById("gameCanvas");
        for (i = entities.length-1; i>=0; i--){
            if (entities[i].c.camera){
                cam = entities[i].c.camera;
            };
        };
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.font = "12px Courier New";

        lineCounter = 0;

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
