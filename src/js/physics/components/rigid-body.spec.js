describe("RigidBody", function(){ 
    it("update should update circles position", function(){
        var rigidBody = new RigidBody(SHAPE.CIRCLE, CreateTestCircle());
        var position = Vec2.create(100,100);

        rigidBody.update(position, 0);

        expectVec2Equals(rigidBody.body.center, 100, 100);
    });

    it("update should should update the bounding box (circle)", function(){
        var rigidBody = new RigidBody(SHAPE.CIRCLE, CreateTestCircle());
        var position = Vec2.create(100,100);

        rigidBody.update(position, 0);

        expectLineEquals(rigidBody.box.min, 50, 50);
        expectLineEquals(rigidBody.box.max, 150, 150);
    });

    it("update should transform polygon", function(){
        var verteces = [
            [-1, 1],
            [ 1, 1],
            [ 2, 0],
            [ 1,-1],
            [-1,-1]];
        var polygon = new Polygon(verteces);
        var rigidBody = new RigidBody(SHAPE.POLYGON, polygon);
        var translation = Vec2.create(5,6);

        rigidBody.update(translation, 0);

        var expected = [
            [ 4, 7],
            [ 6, 7],
            [ 7, 6],
            [ 6, 5],
            [ 4, 5]];
        expectPolygonEquals(rigidBody.body.verteces, expected);
    });

    it("update should should update the bounding box (polygon)", function(){
        var verteces = [
            [-1, 1],
            [ 1, 1],
            [ 2, 0],
            [ 1,-1],
            [-1,-1]];
        var polygon = new Polygon(verteces);
        var rigidBody = new RigidBody(SHAPE.POLYGON, polygon);
        var translation = Vec2.create(5,6);

        rigidBody.update(translation, 0);

        expectLineEquals(rigidBody.box.min, 4, 5);
        expectLineEquals(rigidBody.box.max, 7, 7);
    });

    it("constructor should create and set bounding box", function(){
        var rigidBody = new RigidBody(SHAPE.EDGE, CreateTestEdge());

        expectVec2Equals(rigidBody.box.min, 0, 0);
        expectVec2Equals(rigidBody.box.max, 200, 200);
    });

});
