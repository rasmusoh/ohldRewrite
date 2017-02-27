DebugPhysicsRenderSystem = (function(){

    var update = function(world, delta){

        var canvas = document.getElementById('gameCanvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < world.entities.length; i++) {
            var entity = world.entities[i];
            if (entity.c.rigidBody) {
                switch(entity.c.rigidBody.type) {
                    case SHAPE.CIRCLE:
                        renderCicle(entity, ctx);
                        break;
                    case SHAPE.POLYGON:
                        renderPolygon(entity, ctx);
                        break;
                    case SHAPE.EDGE:
                        renderEdge(entity, ctx);
                        break;
                    default:
                        renderAabb(entity, ctx);
                        break;
                }
            }
        }

        for (var i = 0; i < world.collisions.length; i++) {
            renderVector(world.collisions[i], ctx);
        }
    };


    var renderVector = function(manifold, ctx) {
        ctx.fillStyle = "#000000";

        ctx.save();

        ctx.beginPath();
        var pos = manifold.entity.c.position.translation;
        ctx.moveTo(pos[0], pos[1]);
        ctx.lineTo(pos[0] + manifold.collisionVector[0], pos[1] + manifold.collisionVector[1]);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
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
        ctx.fillStyle = e.c.appearance? e.c.appearance.color : "#FF0000";

        ctx.save();
        var polygon = e.c.rigidBody.body;

        ctx.beginPath();
        ctx.moveTo(polygon.verteces[0][0], polygon.verteces[0][1]);
        for(i=polygon.verteces.length-1; i>0; i--){
            ctx.lineTo(
                    polygon.verteces[i][0],
                    polygon.verteces[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    var renderEdge = function(e, ctx){
        ctx.fillStyle = e.c.appearance? e.c.appearance.color : "#000000";

        ctx.save();
        var edge = e.c.rigidBody.body;
        ctx.beginPath();
        ctx.moveTo(edge.verteces[0][0], edge.verteces[0][1]);

        ctx.lineTo( edge.verteces[1][0],
                    edge.verteces[1][1]);
        var x = edge.verteces[1][0] + 1000 * edge.norm[0];
        var y =    edge.verteces[1][1] + 1000 * edge.norm[1];
        ctx.lineTo(x, y);
        x = edge.verteces[0][0] + 1000 * edge.norm[0];
        y =    edge.verteces[0][1] + 1000 * edge.norm[1];
        ctx.lineTo(x, y);
                 
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };


    var renderCicle = function(e, ctx){
        ctx.fillStyle = e.c.appearance? e.c.appearance.color : "#00FF00";
        var circle = e.c.rigidBody.body;

        ctx.beginPath();
        ctx.arc(circle.center[0],
                circle.center[1],
                circle.r,
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
