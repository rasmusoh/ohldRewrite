
describe("CollisionSystem", function(){ 
    it("update should find all collisions", function(){
        var edge = new RigidBody(SHAPE.EDGE, CreateTestEdgeUpsideDown());

        var pol1 = new RigidBody(SHAPE.POLYGON, CreateTestPolygonPentagon(-800, -50));
        var pol2 = new RigidBody(SHAPE.POLYGON, CreateTestPolygonTriangle(-50, 200));
        var circle1 = new RigidBody(SHAPE.CIRCLE, CreateTestCircle(-650, 120));
        var circle2 = new RigidBody(SHAPE.CIRCLE, CreateTestCircleBig(-570, -30));

        world = new World(2000, 2000, 100);
        world.movingObjects = [pol1, pol2, circle1, circle2];
        world.grid.insertBox(edge);

        CollisionSystem.update(world, 0.016);

        expect(pol1.hasCollided &&
                pol2.hasCollided &&
                !circle1.hasCollided &&
                circle2.hasCollided &&
                edge.hasCollided).toBeTruthy();
    });
});
