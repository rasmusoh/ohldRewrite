Line = {};

Line.create = function(a, b){
    return new Float32Array([a, b]);
}
//checks overlap between segments a and b
Line.isOverlap = function(a, b){
    return (a[0] > b[1]) && (b[0] < a[1]);
}

//returns overlap between segments a and b
Line.overlap = function(a, b){
    return Math.max(a[0], b[0]) - Math.min(a[1], b[1]);
}
