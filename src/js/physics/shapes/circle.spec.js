describe("Circle", function(){ 
    it("project should project onto unit vector 1", function(){
        var circle = CreateTestCircle(0,0);
        var unitVector = Vec2.create(1,1);
        Vec2.normalize(unitVector, unitVector);

        circle.project(unitVector);
        
        expectLineEquals(circle.proj, -50, 50);
    });

    it("project should project onto unit vector 2", function(){
        var circle = CreateTestCircle(100,200);
        var unitVector = Vec2.create(1,-1);
        Vec2.normalize(unitVector, unitVector);

        circle.project(unitVector);

        expectLineEquals(circle.proj, -50 - 70.7107, 50 - 70.7107);
    });
});
