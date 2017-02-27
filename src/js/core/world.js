World = function (sizeX, sizeY, gridSize){
    this.entities = [];
    this.moving = [];
    this.collisions = [];
    this.inputQueue = [];
    this.player = {};
    this.camera = {};
    this.grid = new Grid(sizeX, sizeY, gridSize);
};

World.prototype.setEntities = function ( entitiesArray ) {
    this.entities = [];
    for (var i = 0; i < entitiesArray.length; i++){
        this.addEntity(entitiesArray[i]);
    }
};

World.prototype.getEntity = function(id) {
    for (var i = 0; i < entitiesArray.length; i++){
        if(entities[i].id === id){
            return entities[i];
        }
    }
}

World.prototype.addEntities = function ( eArray ) {
    for( var i = 0; i < eArray.length; i++){
        this.addEntity(eArray[i]);
    }
}

World.prototype.addEntity = function ( e ) {
    this.entities.push(e);

    if(e.c.movingBody) {
        this.moving.push(e);
    } else if (e.c.rigidBody) {
        this.grid.insertBody(e);
    }
    
    if(e.c.player){
        this.player = e;
    }
    if(e.c.camera){
        this.camera = e;
    }

};

World.prototype.removeEntity = function ( e ) {
    ArrayHelper.removeById(e.id, this.entities);
    if(e.c.movingBody){
        ArrayHelper.removeById(e.id, this.moving);
    } else if(e.c.rigidBody){
        this.grid.removeBody(e);
    }
    if(e.c.player){
        this.player = null;
    }
    if(e.c.camera){

        this.camera = null;
    }
};
