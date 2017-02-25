describe("CollisionSystem", function(){ 
    it("update should find all collisions", function(){
        var edge = new Entity();
        edge.addComponent(new RigidBody(SHAPE.EDGE, CreateTestEdgeUpsideDown()));

        var pol1 = new Entity();
        pol1.addComponent(new RigidBody(SHAPE.POLYGON, CreateTestPolygonPentagon(200, 150)));
        pol1.addComponent(new MovingBody());

        var pol2 = new Entity();
        pol2.addComponent(new RigidBody(SHAPE.POLYGON, CreateTestPolygonTriangle(1050, 400)));
        pol2.addComponent(new MovingBody());

        var circle1 = new Entity();
        circle1.addComponent(new RigidBody(SHAPE.CIRCLE, CreateTestCircle(350, 320)));
        circle1.addComponent(new MovingBody());

        var circle2 = new Entity();
        circle2.addComponent(new RigidBody(SHAPE.CIRCLE, CreateTestCircleBig(430, 230)));
        circle2.addComponent(new MovingBody());

        world = new World(2000, 2000, 100);
        world.addEntities([pol1, pol2, circle1, circle2, edge]);

        CollisionSystem.update(world, 0.016);

        expect(pol1.c.rigidBody.haveCollided).toBeTruthy();
        expect(pol2.c.rigidBody.haveCollided).toBeTruthy();
        expect(circle1.c.rigidBody.haveCollided).toBeFalsy();
        expect(circle2.c.rigidBody.haveCollided).toBeTruthy();
        expect(edge.c.rigidBody.haveCollided).toBeTruthy();
    });
});
