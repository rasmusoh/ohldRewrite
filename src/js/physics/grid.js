Grid = function(sizeX, sizeY, cellSize){
    this.cellSize = cellSize;
    this.contents = new Array();
}

Grid.prototype.hash = function(coord){
    return Math.floor(coord/this.cellSize);
}

Grid.prototype.insertPoint = function(item, point){
    this.contents[this.hash(point[0])][this.hash(point[1])].push(item);
}

Grid.prototype.removePoint = function(item, point){
    var list = this.contents[this.hash(point[0])][this.hash(point[1])];
    this.removeItemFromCell(item, list);
}

//removes item from cell, if it exists
//index switching in order to garbage friendly, finns bara en jord
Grid.prototype.removeItemFromCell = function(item, cell){
    removed = false;
    for (i = 0; i < list.length; i++){
        if(removed){
            list[i-1] = list[i];
        }
        if(list[i].id === item.id){
            removed = true;
        }
    }
    if(removed){
        list.length--;
    }
}

Grid.prototype.insertBox = function(item, boundingBox){
    var minX = this.hash(boundingBox.min[0]);
    var minY = this.hash(boundingBox.min[1]);
    var maxX = this.hash(boundingBox.min[0]);
    var maxY = this.hash(boundingBox.min[1]);
    for (i = minX; i <= maxX; i++){
        for(j = minY; j <= maxY; j++){
            this.contents[i][j].push(item);
        }
    }
}

Grid.prototype.removeBox = function(item, boundingBox){
    var minX = this.hash(boundingBox.min[0]);
    var minY = this.hash(boundingBox.min[1]);
    var maxX = this.hash(boundingBox.min[0]);
    var maxY = this.hash(boundingBox.min[1]);
    for (i = minX; i <= maxX; i++){
        for(j = minY; j <= maxY; j++){
            removeItemFromCell(item, this.contents[i][j]);
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
