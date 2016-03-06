describe("velocity", function() {
    it("should instatiate correctly", function() {
        var vel = new velocityComponent(3.4, 1.2, 0.44);
        expect(
                vel.x === 3.4 &&
                vel.y === 1.2 &&
                vel.angularVelocity === 0.44).toBeTruthy(); 
    });
    it("should instatiate with default values if nothing is passed", function() {
        var vel = new velocityComponent();
        expect(
                vel.x === 0 &&
                vel.y === 0 &&
                vel.angularVelocity === 0).toBeTruthy(); 
    });
});

describe("position", function() {
    it("should instatiate correctly", function() {
        var pos = new positionComponent(100, 200, 1.02);
        expect(
                pos.x === 100 &&
                pos.y === 200 &&
                pos.rotation === 1.02).toBeTruthy(); 
    });

    it("should instatiate with default values if nothing is passed", function() {
        var pos = new positionComponent(0);
        expect(
                pos.x === 0 &&
                pos.y === 0 &&
                pos.rotation === 0).toBeTruthy(); 
    });
});

describe("rocket", function() {
    it("should instatiate correctly", function() {
        var c = new rocketComponent(ROCKET_STATE.ROCKETUP);
        expect(
                c.state).toEqual(ROCKET_STATE.ROCKETUP); 
    });

    it("should instatiate with default values if nothing is passed", function() {
        var c = new rocketComponent();
        expect(
                c.state).toEqual(ROCKET_STATE.FREEFALL); 
    });
});

describe("camera", function() {
    it("should instatiate correctly", function() {
        var c = new cameraComponent(100, 2000, 1, 2);

        expect(
                c.x === 100 &&
                c.y === 2000 &&
                c.scale === 1 &&
                c.rotation === 2
              ).toBeTruthy(); 
    });

    it("should instatiate with default values if nothing is passed", function() {
        var c = new cameraComponent();

        expect(
                c.x === 0 &&
                c.y === 0 &&
                c.scale === 1 &&
                c.rotation === 0
              ).toBeTruthy(); 
    });
});
