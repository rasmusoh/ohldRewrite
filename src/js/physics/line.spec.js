describe("Line", function(){ 
    it("create should return new float32Array", function(){
        var result = Line.create(1.5, 2.7);

        expectLineEquals(result, 1.5, 2.7);
        expect(result.length === 2).toBeTruthy();
    });

    it("isOverlap should return true if overlap", function(){
        var line1 = Line.create(1.5, 2.7);
        var line2 = Line.create(2.5, 3.5);

        expect(Line.isOverlap(line1, line2)).toBeTruthy();
    });

    it("isOverlap should return false if no overlap", function(){
        var line1 = Line.create(-3.5, -2.7);
        var line2 = Line.create(-2.5, 3.5);

        expect(Line.isOverlap(line1, line2)).toBeFalsy();
    });

    it("overlap should return size of overlap", function(){
        var line1 = Line.create(1.5, 2.7);
        var line2 = Line.create(2.5, 3.5);

        expect(round(Line.overlap(line1, line2),3)).toEqual(0.2);
    });

    it("overlap should return a negative value if no overlap", function(){
        var line1 = Line.create(-3.5, -2.7);
        var line2 = Line.create(-2.5, 3.5);

        expect(round(Line.overlap(line1, line2),3)).toEqual(-0.2);
    });
});
