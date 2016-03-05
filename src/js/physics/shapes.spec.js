describe("transformPolygon", function(){
    beforeEach(function(){
        var verteces = [
        {x:-1, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 0},
        {x: 1, y:-1},
        {x:-1, y:-1}
        ];
        this.testPolygon = new PolygonComponent(verteces);
    });

    it("should translate polygon",function(){
        var translation = Vec2.create(5,6);

        Vector.transformPolygon(
                this.testPolygon.transformed,
                this.testPolygon.verteces,
                translation,
                0);

        var expected = [
        {x: 4, y: 7},
        {x: 6, y: 7},
        {x: 7, y: 6},
        {x: 6, y: 5},
        {x: 4, y: 5}
        ];
        expectPolygonEquals(this.testPolygon.transformed, expected);
    });

    it("should rotate polygon",function(){
        var rotation = Math.PI/2;

        Vector.transformPolygon(
                this.testPolygon.transformed,
                this.testPolygon.verteces,
                Vec2.create(0,0),
                rotation);

        var expected = [
        {x:-1, y:-1},
        {x:-1, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 1},
        {x: 1, y:-1},
        ];
        expectPolygonEquals(this.testPolygon.transformed, expected);
    });

    it("should translate and rotate polygon",function(){
        var translation = Vec2.create(5,6);
        var rotation = Math.PI/2;

        Vector.transformPolygon(
                this.testPolygon.transformed,
                this.testPolygon.verteces,
                translation,
                rotation);

        var expected = [
        {x: 4, y: 5},
        {x: 4, y: 7},
        {x: 5, y: 8},
        {x: 6, y: 7},
        {x: 6, y: 5},
        ];
        expectPolygonEquals(this.testPolygon.transformed, expected);
    });

    it("rotate PI should flip upside down",function(){
        var translation = Vec2.create(0,2);
        var rotation = Math.PI;

        Vector.transformPolygon(
                this.testPolygon.transformed,
                this.testPolygon.verteces,
                translation,
                rotation);

        var expected = [
        {x: 1, y: 1},
        {x:-1, y: 1},
        {x:-2, y: 2},
        {x:-1, y: 3},
        {x: 1, y: 3}
        ];
        expectPolygonEquals(this.testPolygon.transformed, expected);
    });
});

describe("updatePolygonNorms", function(){
    it("should set polygon norms", function() {
        var verteces = [
        {x:-1, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 0},
        {x: 1, y:-1},
        {x:-1, y:-1}
        ];
        var testPolygon = new PolygonComponent(verteces);

        updatePolygonNorms(testPolygon.norms, testPolygon.verteces);
        
        var expected = [
        {x:-1, y: 0},
        {x: 0, y: 1},
        {x: 0.707, y: 0.707},
        {x: 0.707, y:-0.707},
        {x: 0, y:-1},
        ];
        expectPolygonEquals(testPolygon.norms, expected);
    });

    it("should set polygon norms", function() {
        var verteces = [
        {x: 4, y: 5},
        {x: 4, y: 7},
        {x: 5, y: 8},
        {x: 6, y: 7},
        {x: 6, y: 5},
        ];
        var testPolygon = new PolygonComponent(verteces);

        updatePolygonNorms(testPolygon.norms, testPolygon.verteces);
        
        var expected = [
        {x: 0, y:-1},
        {x:-1, y: 0},
        {x:-0.707, y: 0.707},
        {x: 0.707, y: 0.707},
        {x: 1, y: 0},
        ];
        expectPolygonEquals(testPolygon.norms, expected);
    });
});


expectPolygonEquals = function(verteces, expected){
        for(i = expected.length -1; i >=0; i--){
            expect(Math.round(verteces[i][0]*1000)/1000 === expected[i][0] &&
                   Math.round(verteces[i][1]*1000)/1000 === expected[i][1]).toBeTruthy();
        }
};
