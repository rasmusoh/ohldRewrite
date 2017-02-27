DebugGridSystem = (function(){

    var update = function(world, delta){
        var cam = world.camera.c.camera;
        var lineSpacing = world.grid.cellSize;

        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#888888";
        var xOffset = cam.x - cam.x % lineSpacing;
        var yOffset = cam.y - cam.y % lineSpacing;
        var noLinesX = Math.round(canvas.width / lineSpacing) + 2 ;
        var noLinesY = Math.round(canvas.height / lineSpacing) + 2;
  
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
