RenderSystem = (function(){

    var update = function(entities, playerEntity, delta){

        var canvas = document.getElementById('gameCanvas');
        var ctx = canvas.getContext('2d');

        for( var i = entities.length-1; i>=0; i--){
            if (e.c.polygon && e.c.appearance && e.c.position){
            renderPolygon(e, ctx);
            }
            if (e.c.circle && e.c.appearance && e.c.position){
                renderCicle(e, ctx);
            }
            if (e.c.aabb && e.c.appearance && e.c.position){
                renderAabb(e, ctx);
            }
        }
        renderRocketLine(playerEntity, ctx);
    };

    var renderRocketLine = function(playerEntity, ctx){
        ctx.beginPath();
        ctx.moveTo(playerEntity.c.position.x, playerEntity.c.position.y);

        vec = Vec2.create(ROCKET_THRUST.x, ROCKET_THRUST.y);
        Vector.rotate(vec, playerEntity.c.position.rotation);
        Vector.scale(vec, 100);
        Vector.add(vec, playerEntity.c.position);

        ctx.lineTo(vec.x, vec.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.moveTo(playerEntity.c.position.x, playerEntity.c.position.y);

        vec = { x: ROCKET_THRUST.x, y: ROCKET_THRUST.y };
        Vector.add(vec, playerEntity.c.position);
        ctx.lineTo(vec.x, vec.y);
        ctx.closePath();
        ctx.stroke();
    };

    var renderPolygon = function(e, ctx){
        ctx.fillStyle = (e.c.appearance.color);

        ctx.save();
        ctx.translate(e.c.position.x, e.c.position.y);
        ctx.rotate(e.c.position.rotation);

        
        ctx.moveTo(e.c.polygon.verteces[0].x, e.c.polygon.verteces[0].y);
        ctx.beginPath();
        for(i=e.c.polygon.verteces.length-1; i>=0; i--){
            ctx.lineTo(
                    e.c.polygon.verteces[i].x,
                    e.c.polygon.verteces[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    var renderCicle = function(e, ctx){
        ctx.fillStyle = (e.c.appearance.color);

        ctx.beginPath();
        ctx.arc(e.c.position.x,
                e.c.position.y,
                e.c.circle.r,
                0,
                2 * Math.PI,
                false);
        ctx.fill();
    };

    var renderAabb = function(e, ctx){
        ctx.fillStyle = (e.c.appearance.color);

        ctx.fillRect(
                e.c.position.x, 
                e.c.position.y,
                e.c.aabb.w,
                e.c.aabb.h);
    };

    return {
        update : update
    };
})();
