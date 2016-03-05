describe("RigidBody", function(){ 
    it("update should update circles position"), function(){
    });

    it("update should transform polygon"), function(){
    });

    it("updatebox should update the bounding box"), function(){
    });
});

describe("Circle", function(){ 
    it("constructor should create a new Circle"), function(){
    });

    it("project should project onto unit vector"), function(){
    });
});

describe("Polygon", function(){ 
    it("transform should update vertices with position and angle"), function(){
    });

    it("project should project onto unit vector"), function(){
    });
});

describe("Edge", function(){ 
    it("constructor should set norms and projections"), function(){
    });

    it("project should project onto unit vector"), function(){
    });
});

CreateTestPolygonTriangle = function(x,y){
    var verteces = new Array(3);
    verteceses[0] = Vec2.create(-20,80);
    verteceses[1] = Vec2.create(-80,-20);
    verteceses[2] = Vec2.create(-20,-20);
    
    var pol = new Polygon(verteces);
    var translate = Vec2.create(x,y);
    pol.transform(translate, 0);
    return pol;
}

CreateTestPolygonPentagon = function(x, y){
    var verteces = new Array(3);
    verteceses[0] = Vec2.create(-125,-50);
    verteceses[1] = vec2.create(-125,50);
    verteceses[2] = vec2.create(100,50);
    verteceses[4] = vec2.create(150,0);
    verteceses[3] = vec2.create(100,-50);
    
    var pol = new Polygon(verteces);
    var translate = Vec2.create(x,y);
    pol.transform(translate, 0);
    return pol;
}

CreateTestCircleSmall = function(x,y){
    var cir = new Circle(50);
    var center = Vec2.create(x,y);
    circle.center = center;
    return circle;
}

CreateTestCircleBig = function(){
    return new Circle(100);
    var center = Vec2.create(x,y);
    circle.center = center;
    return circle;
}

CreateTestEdge = function(){
    return new Edge(0,0,200,200, false);
}

CreateTestEdgeUpsideDown = function(){
    return new Edge(0,200,200,0, true);
}
