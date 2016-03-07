describe("accelerateTowardPoint", function() {
    it("should update velocity with acc", function() {
        var vel = Vec2.create(3.4, 1.2);
        var acc = 12;
        topspeed = 1000;
        var delta = 10;
        var pos = Vec2.create(10,10);
        var targetPos = Vec2.create(-10,10);

        Dyn.accelerateTowardPoint(vel, pos, targetPos, delta, acc, topspeed);

        expectVec2Equals(vel, -116.6, 1.2);
    });

    it("should not go above terminal velocity", function() {
        var vel = Vec2.create(0, 1.2);
        var acc = 12;
        topspeed = 100;
        var delta = 10;
        var pos = Vec2.create(100,10);
        var targetPos = Vec2.create(100,-100);

        Dyn.accelerateTowardPoint(vel, pos, targetPos, delta, acc, topspeed);

        expectVec2Equals(vel, 0,-100);
    });
});

describe("updateWithGravity", function() {
    it("should update velocity with gravity", function() {
        var vel = new Vec2.create(3.4, 1.2, 0);
        GRAVITY = 12;
        TERMINAL_VELOCITY = 200;

        Dyn.updateWithGravity(vel, 10);

        expectVec2Equals(vel, 3.4, 121.2);
    });

    it("should not go above terminal velocity", function() {
        var vel = new Vec2.create(3.4, 200, 0);
        GRAVITY = 12;
        TERMINAL_VELOCITY = 200;

        Dyn.updateWithGravity(vel, 10);

        expectVec2Equals(vel, 3.4, 200);
    });
});
