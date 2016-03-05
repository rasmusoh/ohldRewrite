describe("Circle", function(){ 
    it("project should project onto unit vector 1", function(){
        var circle = CreateTestCircle(0,0);
        var unitVector = Vec2.create(1,1);
        Vec2.normalize(unitVector, unitVector);

        circle.project(unitVector);
        
        expectLineEquals(circel.proj, -35.355, 35.355);
    });

    it("project should project onto unit vector 2", function(){
        CreateTestCircle(100,200);
        var unitVector = Vec2.create(1,-1);
        Vec2.normalize(unitVector, unitVector);

        circle.project(unitVector);

        expectLineEquals(circel.proj, -35.355 - 70.7107, 35.355 - 70.7107);
    });
});

CreateTestCircle = function(x,y){
   return new Circle(50, x, y);
}

CreateTestCircleBig = function(x, y){
    return new Circle(100, x, y);
}
