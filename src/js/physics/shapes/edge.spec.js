describe("Edge", function(){ 
    it("constructor should set norms and projections", function(){
        var edge = new Edge(200,100,400,300, false);

        expectVec2Equals(edge.norm, -Math.sqrt(1/2), Math.sqrt(1/2));
        expectLineEquals(edge.normProj, -Infinity, -100*Math.sqrt(1/2));
        expectVec2Equals(edge.parallellNorm, Math.sqrt(1/2), Math.sqrt(1/2));
        expectLineEquals(edge.parallellProj, 212.132, 494.9747);
    });

    it("should create down-facing edge if downFacing is set to true", function(){
        var edge = new Edge(600,800,800,600, true);

        expectVec2Equals(edge.norm, -Math.sqrt(1/2), -Math.sqrt(1/2));
        expectVec2Equals(edge.parallellNorm, Math.sqrt(1/2), -Math.sqrt(1/2));
        expectLineEquals(edge.parallellProj, -141.421, 141.421);
    });

    it("project should project onto unit vector (x axis)", function(){
        var edge = CreateTestEdge();

        edge.project(Vec2.xAxis);

        expectLineEquals(edge.proj, 0, Infinity);
    });

    it("project should project onto unit vector (y axis)", function(){
        var edge = CreateTestEdge();

        edge.project(Vec2.yAxis);

        expectLineEquals(edge.proj, -Infinity, 200);
    });

    it("project should project onto unit vector (y axis downFacing)", function(){
        var edge = new Edge(600,800,800,600, true);

        edge.project(Vec2.yAxis);

        expectLineEquals(edge.proj, 600, Infinity);
    });
});
