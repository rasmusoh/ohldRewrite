World = function (sizeX, sizeY, gridSize){
    this.entities = [];
    this.movingRigidBodies = [];
    this.movingBodies = [];
    this.playerEntity = {};
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
    if(e.c.movingBody){
        this.movingBodies.push(e.c.movingBody);
        if(e.c.rigidBody){
            this.movingRigidBodies.push(e.c.rigidBody);
        }
    } else if(e.c.rigidBody){
        this.grid.insertBox(e.c.rigidBody);
    }
    if(e.c.player){
        this.playerEntity = e;
    }
    if(e.c.camera){
        this.camera = e;
    }
};

World.prototype.removeEntity = function ( e ) {
    ArrayHelper.removeById(e.id, this.entities);
    if(e.c.movingBody){
        ArrayHelper.removeById(e.id, this.movingBodies);
        if(e.c.rigidBody) {
            ArrayHelper.removeById(e.id, this.movingRigidBodies);
        }
    } else if(e.c.rigidBody){
        this.grid.removeBox(e.c.rigidBody);
    }
    if(e.c.player){
        this.playerEntity = null;
    }
    if(e.c.camera){

        this.camera = null;
    }
};
