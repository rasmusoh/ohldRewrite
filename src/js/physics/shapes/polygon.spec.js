describe("Polygon", function(){ 
    beforeEach(function(){
        var verteces = [
        {x:-1, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 0},
        {x: 1, y:-1},
        {x:-1, y:-1}
        ];
        this.testPolygon = new Polygon(verteces);
    });

    it("transform should translate polygon",function(){
        var translation = Vec2.create(5,6);

        this.testPolygon.transform(translation, 0);

        var expected = [
        {x: 4, y: 7},
        {x: 6, y: 7},
        {x: 7, y: 6},
        {x: 6, y: 5},
        {x: 4, y: 5}
        ];
        expectPolygonEquals(this.testPolygon.verteces, expected);
    });

    it("transform should rotate polygon",function(){
        var rotation = Math.PI/2;

        this.testPolygon.transform(Vec2.create(0,0), rotation);

        var expected = [
        {x:-1, y:-1},
        {x:-1, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 1},
        {x: 1, y:-1},
        ];
        expectPolygonEquals(this.testPolygon.verteces, expected);
    });

    it("transform should translate and rotate polygon",function(){
        var translation = Vec2.create(5,6);
        var rotation = Math.PI/2;

        this.testPolygon.transform(translation, rotation);

        var expected = [
        {x: 4, y: 5},
        {x: 4, y: 7},
        {x: 5, y: 8},
        {x: 6, y: 7},
        {x: 6, y: 5},
        ];
        expectPolygonEquals(this.testPolygon.verteces, expected);
    });

    it("transform rotate PI should flip upside down",function(){
        var translation = Vec2.create(0,2);
        var rotation = Math.PI;

        this.testPolygon.transform(translation, rotation);

        var expected = [
        {x: 1, y: 1},
        {x:-1, y: 1},
        {x:-2, y: 2},
        {x:-1, y: 3},
        {x: 1, y: 3}
        ];
        expectPolygonEquals(this.testPolygon.verteces, expected);
    });

    it("setNorms should set polygon norms 1", function() {
        var verteces = [
        {x:-1, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 0},
        {x: 1, y:-1},
        {x:-1, y:-1}
        ];
        this.testPolygon.verteces = verteces;

        this.testPolygon.setNorms();

        var expected = [
        {x:-1, y: 0},
        {x: 0, y: 1},
        {x: 0.707, y: 0.707},
        {x: 0.707, y:-0.707},
        {x: 0, y:-1},
        ];
        expectPolygonEquals(this.testPolygon.norms, expected);
    });

    it("should set polygon norms 2", function() {
        var verteces = [
        {x: 4, y: 5},
        {x: 4, y: 7},
        {x: 5, y: 8},
        {x: 6, y: 7},
        {x: 6, y: 5},
        ];
        this.testPolygon.verteces = verteces;

        this.testPolygon.setNorms();

        var expected = [
        {x: 0, y:-1},
        {x:-1, y: 0},
        {x:-0.707, y: 0.707},
        {x: 0.707, y: 0.707},
        {x: 1, y: 0},
        ];
        expectPolygonEquals(this.testPolygon.norms, expected);
    });

    it("project should project onto unit vector (x-axis)", function(){
        var pol = CreateTestPolygonPentagon(0,0);

        pol.project(Vec2.xAxis);

        expectLineEquals(pol.proj, -125, 150);
    });

    it("project should project onto unit vector (y-axis)", function(){
        var pol = CreateTestPolygonPentagon(0,260);

        pol.project(Vec2.yAxis);

        expectLineEquals(pol.proj, 210, 310);
    });

    it("project should project onto unit vector (1,1)", function(){
        var unitVector = Vec2.create(1,1);
        Vec2.normalize(unitVector, unitVector);
        var pol = CreateTestPolygonTriangle(0,0);

        pol.project(unitVector);

        expectLineEquals(pol.proj, -28.284, 42.4264);
    });

    it("project should project onto unit vector (1,-1)", function(){
        var unitVector = Vec2.create(1,-1);
        Vec2.normalize(unitVector, unitVector);
        var pol = CreateTestPolygonTriangle(0,0);

        pol.project(unitVector);

        expectLineEquals(pol.proj, -70.7107, 70.7107);
    });
});
