Grid = function(sizeX, sizeY, cellSize){
    this.cellSize = cellSize;
    this.contents = new Array(this.hash(sizeX));
    for( var i = 0; i < this.contents.length; i++){
        this.contents[i] = new Array(this.hash(sizeY));
        for( var j = 0; j < this.contents[i].length; j++){
            this.contents[i][j] = [];
        }
    }
}

Grid.prototype.hash = function(coord){
    return Math.floor(coord/this.cellSize);
}

Grid.prototype.insertPoint = function(item, point){
    this.contents[this.hash(point[0])][this.hash(point[1])].push(item);
}

Grid.prototype.removePoint = function(id, point){
    var list = this.contents[this.hash(point[0])][this.hash(point[1])];
    ArrayHelper.removeById(id, list);
}

Grid.prototype.insertBox = function(item, boundingBox){
    var minX = this.hash(boundingBox.min[0]);
    var minY = this.hash(boundingBox.min[1]);
    var maxX = this.hash(boundingBox.max[0]);
    var maxY = this.hash(boundingBox.max[1]);
    for( var i = minX; i <= maxX; i++){
        for( var j = minY; j <= maxY; j++){
            this.contents[i][j].push(item);
        }
    }
}

Grid.prototype.removeBox = function(id, boundingBox){
    var minX = this.hash(boundingBox.min[0]);
    var minY = this.hash(boundingBox.min[1]);
    var maxX = this.hash(boundingBox.max[0]);
    var maxY = this.hash(boundingBox.max[1]);
    for( var i = minX; i <= maxX; i++){
        for(j = minY; j <= maxY; j++){
            ArrayHelper.removeById(id, this.contents[i][j]);
        }
    }
}

Grid.prototype.getCellsBox = function(boundingBox, out){
    out.min[0] = this.hash(boundingBox.min[0]);
    out.min[1] = this.hash(boundingBox.min[1]);
    out.max[0] = this.hash(boundingBox.max[0]);
    out.max[1] = this.hash(boundingBox.max[1]);
}

CellsBox = function(){
    this.min = new Int32Array(2);
    this.max = new Int32Array(2);
}
