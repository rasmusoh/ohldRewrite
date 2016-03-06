Vec2 = {};

Vec2.create = function(x,y) {
    return new Float32Array([x, y]);
}

Vec2.xAxis = Vec2.create(1,0);
Vec2.yAxis = Vec2.create(0,1);

Vec2.set = function(vector, out){
    out[0] = vector[0];
    out[1] = vector[1];
}

Vec2.add = function(a, b, out){
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
}

Vec2.subtract = function(a, b, out){
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
}

Vec2.scale = function(a, k, out){
    out[0] = a[0] * k;
    out[1] = a[1] * k;
}

Vec2.dot = function(a, b){
    return a[0] * b[0] + a[1] * b[1];
}

Vec2.length = function(a){
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

Vec2.angle = function(a){
    return Math.atan2(a[1], a[0]);
};

Vec2.normalize = function(a, out){
    var iLen  = 1 / Vec2.length(a);
    out[0] = a[0] * iLen;
    out[1] = a[1] * iLen;
}

Vec2.rotate = function(a, angle, out){
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);

    var aX = a[0]; //this step is needed in case a = out
    var aY = a[1]; //this step is needed in case a = out
    out[0] = aX * cosAngle - aY * sinAngle;
    out[1] = aY * cosAngle + aX * sinAngle;
}

//scales and rotates the second vector, then adds it to the first
Vec2.addTransformed = function(a, b, angle, scale){
    cosAngle = Math.cos(angle);
    sinAngle = Math.sin(angle);

    a[0] += (b[0] * cosAngle - b[1] * sinAngle) * scale;
    a[1] += (b[1] * cosAngle + b[0] * sinAngle) * scale;
}

Vec2.capAtMax = function(vector, max){
    var len = Vec2.length(vector);
    if(len > max){
        Vec2.scale(vector, max / len, vector);
    }
};
