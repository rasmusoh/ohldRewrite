CameraSystem = (function(){
    var cam;

    update = function(world, delta){
        var cam = world.camera;
        cam.x = playerEntity.c.position.x + CAMERA_OFFSET_X;
        cam.y = playerEntity.c.position.y + CAMERA_OFFSET_Y;
        cam.scale = 1;

        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.translate(-cam.x, -cam.y);
        ctx.scale(cam.scale, cam.scale);
        ctx.rotate(cam.rotation);
    };

    return {
        update : update
    };
})();
