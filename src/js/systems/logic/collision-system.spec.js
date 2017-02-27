describe("CollisionSystem", function(){ 
    it("update should find all collisions", function(){
        var world = Levels.CollisionTest1();

        CollisionSystem.update(world, 0.016);

        expect(pol1.c.rigidBody.haveCollided).toBeTruthy();
        expect(pol2.c.rigidBody.haveCollided).toBeTruthy();
        expect(circle1.c.rigidBody.haveCollided).toBeFalsy();
        expect(circle2.c.rigidBody.haveCollided).toBeTruthy();
        expect(edge.c.rigidBody.haveCollided).toBeTruthy();
    });
});
