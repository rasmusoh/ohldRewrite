describe("checkBoundingBox", function(){ 
    it("should return false when not colliding", function(){
    });
    it("should return true  when colliding", function(){
    });
});

describe("checkBodies", function(){ 
    it("should return set collisionvector of rigidbody when colliding", function(){
    });
    it("should return set collisionvector of rigidbody when colliding(flip collision vector)", function(){
    });
});

describe("checkBodyStatic", function(){ 
    it("should return set collisionvector of rigidbody when colliding", function(){
    });

    it("should return set collisionvector of rigidbody when colliding(flip collision vector)", function(){
    });
});

describe("checkPolygonPolygon", function(){ 

    it("should return set collisionvector and return true when colliding 1", function(){
        var a = CreateTestPolygonPentagon(0, -10);
        var b = CreateTestPolygonTriangle(130, 40);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonPolygon(a,b,out);

        expect(result).toEqual(true);
        expectVec2Equals(out, 5, 5);
    });
    it("should return set collisionvector and return true when colliding 2", function(){
        var a = CreateTestPolygonPentagon(0, 0);
        var b = CreateTestPolygonTriangle(0,60);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonPolygon(a,b,out);

        expect(result).toEqual(true);
        expectVec2Equals(out, 0, 10);
    });

    it("should return false when not colliding 1", function(){
        var a = CreateTestPolygonPentagon(0, -10);
        var b = CreateTestPolygonTriangle(130, 60);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonPolygon(a,b,out);

        expect(result).toEqual(false);
    });
    it("should return false when not colliding 2", function(){
        var a = CreateTestPolygonPentagon(0, 0);
        var b = CreateTestPolygonTriangle(0, 80);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonPolygon(a,b,out);

        expect(result).toEqual(false);
    });
});

describe("checkPolygonCircle", function(){ 

    it("should return set collisionvector and return true when colliding 1", function(){
        var pol = CreateTestPolygonTriangle(20, 30);
        var circle = CreateTestCircleBig(0, 200);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonCircle(pol, circle, out);

        expect(result).toEqual(true);
        expectVec2Equals(out,0,10);
    });

    it("should return set collisionvector and return true when colliding 2", function(){
        var pol = CreateTestPolygonPentagon(-10, 0);
        var circle = CreateTestCircle(-180, 0);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonCircle(pol, circle, out);

        expect(result).toEqual(true);
        expectVec2Equals(out,-5,0);
    });

    it("should return false when not colliding 1", function(){
        var pol = CreateTestPolygonTriangle(20, 18);
        var circle = CreateTestCircleBig(0, 200);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonCircle(pol, circle, out);

        expect(result).toEqual(false);
    });
    it("should return false when not colliding 2", function(){
        var pol = CreateTestPolygonPentagon(0,0);
        var circle = CreateTestCircle(-180, 0);
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonCircle(pol, circle, out);

        expect(result).toEqual(false);
    });
});

describe("checkCircleCircle", function(){ 

    it("should return set collisionvector and return true when colliding ", function(){
        var a = CreateTestCircle(-140,0);
        var b = CreateTestCircleBig(0,0);
        var out = Vec2.create(0,0);

        var result = Collision.checkCircleCircle(a,b,out);

        expect(result).toEqual(true);
        expectVec2Equals(out,10,0);
    });
    it("should return false when not colliding ", function(){
        var a = CreateTestCircle(-160,0);
        var b = CreateTestCircleBig(0,0);
        var out = Vec2.create(0,0);

        var result = Collision.checkCircleCircle(a,b,out);

        expect(result).toEqual(false);
    });
});

describe("checkPolygonEdge", function(){ 
    it("should return set collisionvector and return true when colliding 1", function(){
        var pol = CreateTestPolygonPentagon(-110,230);
        var edge = CreateTestEdgeUpsideDown();
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonEdge(pol,edge,out);

        expect(result).toEqual(true);
        expectVec2Equals(out,5,-5);
    });
    it("should return set collisionvector and return true when colliding 2", function(){
        var pol = CreateTestPolygonTriangle(-50,40);
        var edge = CreateTestEdge();
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonEdge(pol,edge,out);

        expect(result).toEqual(true);
        expectVec2Equals(out,5,-5);
    });
    it("should return false when not colliding 1", function(){
        var pol = CreateTestPolygonPentagon(-110,250);
        var edge = CreateTestEdgeUpsideDown();
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonEdge(pol,edge,out);

        expect(result).toEqual(false);
    });
    it("should return false when not colliding 2", function(){
        var pol = CreateTestPolygonTriangle(-50,55);
        var edge = CreateTestEdge();
        var out = Vec2.create(0,0);

        var result = Collision.checkPolygonEdge(pol,edge,out);

        expect(result).toEqual(false);
    });
});

describe("checkCircleEdge", function(){ 
    it("should return set collisionvector and return true when colliding 1", function(){
        var circle = CreateTestCircle(-40,-20);
        var edge = CreateTestEdge();
        var out = Vec2.create();

        var result = Collision.checkCircleEdge(circle,edge,out);

        expect( out[0] > 0 && out[1] > 0).toBeTruthy();
        expect(result).toEqual(true);
    });
    it("should return set collisionvector and return true when colliding 2", function(){
        var circle = CreateTestCircleBig(30, 30);
        var edge = CreateTestEdgeUpsideDown();
        var out = Vec2.create();

        var result = Collision.checkCircleEdge(circle,edge,out);

        expect( out[0] > 0 && out[1] > 0).toBeTruthy();
        expect(result).toEqual(true);
    });
    it("should return false when not colliding 1", function(){
        var circle = CreateTestCircle(-60,-20);
        var edge = CreateTestEdge();
        var out = Vec2.create();

        var result = Collision.checkCircleEdge(circle,edge,out);

        expect(result).toEqual(false);
    });
    it("should return false when not colliding 2", function(){
        var circle = CreateTestCircleBig(25, 25);
        var edge = CreateTestEdgeUpsideDown();
        var out = Vec2.create();

        var result = Collision.checkCircleEdge(circle,edge,out);

        expect(result).toEqual(true);
    });
});
