describe("Vec2", function(){

    it("create should create an Float32Array with x and y at first and second position", function(){
        var result = Vec2.create(1.5, 2.7);

        expectVec2Equals(result, 1.5, 2.7);
        expect(result.length).toEqual(2);
    });
    
    it(" add should add the second vector to the first", function() {
        var vector1 = Vec2.create(1,2);
        var vector2 = Vec2.create(3,4);
        var out = Vec2.create(0,0);

        Vec2.add(vector1, vector2, out);

        expectVec2Equals(out, 4, 6);
    });

    it("subtract should subtract the second vector from the first", function() {
        var vector1 = Vec2.create(1,2);
        var vector2 = Vec2.create(3,4);
        var out = Vec2.create(0,0);

        Vec2.subtract(vector1, vector2, out);

        expectVec2Equals(out,-2,-2);
    });

    it("scale should scale the vector with factor", function() {
        var vector1 = Vec2.create(1,2);
        var out = Vec2.create(0,0);

        Vec2.scale(vector1, 10, out);

        expectVec2Equals(out,10,20);
    });

    it("length should return the length of the vector", function() {
        var vector1 = Vec2.create(3,4);

        var result = Vec2.length(vector1);

        expect(result).toEqual(5);
    });

    it("distance should return the distance  between the two vectors", function() {
        var vector1 = Vec2.create(1,2);
        var vector2 = Vec2.create(-2,-2);

        var result = Vec2.distance(vector1, vector2);

        expect(result).toEqual(5);
    });

    it("normalize should rescale vector so that length equals 1", function(){
        var vector = Vec2.create(4,-4);
        var expectedSideLength = 1/Math.sqrt(2);
        var out = Vec2.create(0,0);

        Vec2.normalize(vector, out);

        expectVec2Equals(out, expectedSideLength, -expectedSideLength);
       
    });

    it("dot should return dot product of vectors", function(){
        var vector1 = Vec2.create(2,-3);
        var vector2 = Vec2.create(5, 7);

        var result = Vec2.dot(vector1, vector2);

        expect(result).toEqual(-11);     
    });

    it("rotate should rotate vector with angle", function() {
        var vector1 = Vec2.create(1,2);
        var out = Vec2.create(0,0);

        Vec2.rotate(vector1, Math.PI/2, out);

        expectVec2Equals(out,-2,1);
    });

    it("addTransformed should add the second vector, scaled and rotated, to the first", function(){
        var vector1 = Vec2.create(2,1);
        var vector2 = Vec2.create(1,4);

        Vec2.addTransformed(vector1, vector2, Math.PI/2, 2);

        expectVec2Equals(vector1, -6, 3);
    });

    it("capAtMax should rescale vector to max length if longer", function(){
        var vector = Vec2.create(6,8);
        var out = Vec2.create(0,0);

        Vec2.capAtMax(vector,5);

        expectVec2Equals(vector, 3, 4);
    });

    it("capAtMax should not rescale vector if below max", function(){
        var vector = Vec2.create(3,3);
        var out = Vec2.create(0,0);

        Vec2.capAtMax(vector, 5);

        expectVec2Equals(vector, 3, 3);
    });
    
    it("angle should return angle for vector(1,0)", function (){
        var direction = Vec2.create(1,0);

        var result = Vec2.angle(direction);

        expect(round(result,3)).toEqual(0);
    });

    it("angle should return angle for vector(0,-1)", function (){
        var direction = Vec2.create(0,-1);

        var result = Vec2.angle(direction);

        expect(round(result,3)).toEqual(round(-Math.PI/2, 3));
    });

    it("angle should return angle for vector(2,2)", function (){
        var direction  = Vec2.create(2,2);

        var result = Vec2.angle(direction);

        expect(round(result,3)).toEqual(round(Math.PI/4, 3));
    });
}); 
