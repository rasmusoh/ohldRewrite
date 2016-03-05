describe("RigidBody", function(){ 
    it("update should update circles position", function(){
        var rigidBody = new RigidBody(ShapeEnum.CIRCLE, CreateTestCircle());
        var position = Vec2.create(100,100);

        rigidBody.update(position, 0);

        expectVec2Equals(rigidBody.body.center, 100, 100);
    });

    it("update should should update the bounding box (circle)", function(){
        var rigidBody = new RigidBody(ShapeEnum.CIRCLE, CreateTestCircle());
        var position = Vec2.create(100,100);

        rigidBody.update(position, 0);

        expectLineEquals(rigidBody.box.min, 50, 50);
        expectLineEquals(rigidBody.box.max, 150, 150);
    });

    it("update should transform polygon", function(){
        var verteces = [
        {x:-1, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 0},
        {x: 1, y:-1},
        {x:-1, y:-1}
        ];
        var polygon = new Polygon(verteces);
        var rigidBody = new RigidBody(ShapeEnum.POLYGON, polygon);
        var translation = Vec2.create(5,6);

        rigidBody.update(translation, 0);

        var expected = [
        {x: 4, y: 7},
        {x: 6, y: 7},
        {x: 7, y: 6},
        {x: 6, y: 5},
        {x: 4, y: 5}
        ];
        expectPolygonEquals(this.testPolygon.verteces, expected);
    });

    it("update should should update the bounding box (polygon)", function(){
        var verteces = [
        {x:-1, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 0},
        {x: 1, y:-1},
        {x:-1, y:-1}
        ];
        var polygon = new Polygon(verteces);
        var rigidBody = new RigidBody(ShapeEnum.POLYGON, polygon);
        var translation = Vec2.create(5,6);

        rigidBody.update(translation, 0);

        expectLineEquals(rigidBody.box.min, 4, 5);
        expectLineEquals(rigidBody.box.max, 7, 7);
    });

    it("constructor should create and set bounding box", function(){
        var rigidBody = new RigidBody(ShapeEnum.EDGE, CreateTestEdge());

        expectVec2Equals(rigidBody.min, 0, 0);
        expectVec2Equals(rigidBody.max, 200, 200);
    });

});
