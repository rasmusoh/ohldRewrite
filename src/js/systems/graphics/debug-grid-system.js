DebugGridSystem = (function(){
    var canvas,
    ctx,
    lineSpacing = 100,
    xOffset,
    yOffset,
    noLinesX,
    noLinesY,
    cam,
    text;

    var update = function(entities, playerEntity, delta){
        for (var i = entities.length-1; i>=0; i--){
            if (entities[i].c.camera){
                cam = entities[i].c.camera;
            }
        }

        canvas = document.getElementById("gameCanvas");
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#888888";
        xOffset = cam.x - cam.x % lineSpacing;
        yOffset = cam.y - cam.y % lineSpacing;
        noLinesX = Math.round(canvas.width / lineSpacing) + 2 ;
        noLinesY = Math.round(canvas.height / lineSpacing) + 2;
  
        for (var i = 0; i <= noLinesX; i++ ){
            ctx.beginPath();
            ctx.moveTo(xOffset + i*lineSpacing, yOffset);
            ctx.lineTo(xOffset + i*lineSpacing, canvas.height + yOffset + cam.y % lineSpacing);
            ctx.stroke();
        }

        for (var i = 0; i <= noLinesY; i++ ){
            ctx.beginPath();
            ctx.moveTo(xOffset, yOffset + i*lineSpacing);
            ctx.lineTo(xOffset + canvas.width + cam.x % lineSpacing, yOffset + i*lineSpacing);
            ctx.stroke();
        }
    };

    return {
        update : update
    };
})();
