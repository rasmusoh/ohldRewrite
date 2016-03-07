expectVec2Equals = function(vector, expectedX, expectedY){
        expect(round(vector[0],3)).toEqual(round(expectedX, 3));
        expect(round(vector[1],3)).toEqual(round(expectedY, 3));
};

expectPolygonEquals = function(verteces, expected){
    for(i = expected.length -1; i >=0; i--){
        expect(round(verteces[i][0], 3)).toEqual(round(expected[i][0], 3));
        expect(round(verteces[i][1], 3)).toEqual(round(expected[i][1], 3));
    }
};

round = function(number, decimals){
    var factor = Math.pow(10, decimals);
    var rounded = Math.round(number*factor)/factor;
    return rounded === -0 ? 0 : rounded;
}

expectLineEquals = function(line, expectedX, expectedY){
        expect(round(line[0],3)).toEqual(round(expectedX, 3));
        expect(round(line[1],3)).toEqual(round(expectedY, 3));
};

CreateTestPolygonPentagon = function(x, y){
    var verteces = new Array(4);
    verteces[0] = Vec2.create(-125,-50);
    verteces[1] = Vec2.create(-125,50);
    verteces[2] = Vec2.create(100,50);
    verteces[3] = Vec2.create(150,0);
    verteces[4] = Vec2.create(100,-50);

    var pos = Vec2.create(x,y);

    return new Polygon(verteces, pos, 0);
}

CreateTestPolygonTriangle = function(x,y){
    var verteces = new Array(3);
    verteces[0] = Vec2.create(-20,80);
    verteces[1] = Vec2.create( 80,-20);
    verteces[2] = Vec2.create(-20,-20);
    var pos = Vec2.create(x,y);

    return new Polygon(verteces, pos, 0);
}

CreateTestCircle = function(x,y){
   return new Circle(50, x, y);
}

CreateTestCircleBig = function(x, y){
    return new Circle(100, x, y);
}

