describe("Line", function(){ 
    it("create should return new float32Array", function(){
        var result = Line.create(1.5, 2.7);

        expect(result[0] === 1.5 
              && result[1] === 2.7
              && result.length === 1).toBeTruthy();
    });

    it("isOverlap should return true if overlap", function(){
        var line1 = Line.create(1.5, 2.7);
        var line2 = Line.create(2.5, 3.5);

        expect(Line.isOverlap(line1, line2)).toBeTruthy();
    });

    it("isOverlap should return false if no overlap", function(){
        var line1 = Line.create(-3.5, -2.7);
        var line2 = Line.create(-2.5, 3.5);

        expect(Line.isOverlap(line1, line2)).toBeFalse();
    });

    it("overlap should return size of overlap", function(){
        var line1 = Line.create(1.5, 2.7);
        var line2 = Line.create(2.5, 3.5);

        expect(Line.overlap(line1, line2)).toEqual(0.2);
    });

    it("overlap should return a negative value if no overlap", function(){
        var line1 = Line.create(-3.5, -2.7);
        var line2 = Line.create(-2.5, 3.5);

        expect(Line.overlap(line1, line2)).toEqual(-0.2);
    });
});

expectLineEquals = function(line, expectedX, expectedY){
        expect(Math.round(line[0]*1000)/1000).toEqual(expectedX);
        expect(Math.round(line[1]*1000)/1000).toEqual(expectedY);
};
