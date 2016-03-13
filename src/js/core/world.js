World = function (sizeX, sizeY, gridSize){
    this.entities = new Array();
    this.movingObjects = [];
    this.playerEntity = {};
    this.camera = {};
    this.grid = new Grid(sizeX, sizeY, gridSize);
};

World.prototype.setEntities = function ( entitiesArray ) {
    this.entities = new Array();
    for(i = 0; i < entitiesArray.length; i++){
        this.addEntity(entitiesArray[i]);
    }
};

World.prototype.getEntity = function(id) {
    for(i = 0; i < entitiesArray.length; i++){
        if(entities[i].id === id){
            return entities[i];
        }
    }
}

World.prototype.addEntity = function ( e ) {
    this.entities.add(e);
    if(e.c.movement){
        this.movingObjects.add(e);
    } else if(e.c.rigidBody){
        this.grid.insertBox(e.rigidBody);
    }
    if(e.c.playerCharacter){
        this.playerEntity = e;
    }
    if(e.c.camera){
        this.camera = e;
    }
};

World.prototype.removeEntity = function ( e ) {
    ArrayHelper.removeById(e.id, this.entities);
    if(e.c.movement){
        ArrayHelper.removeById(e.id, this.movingObjects);
    } else if(e.c.rigidBody){
        this.grid.removeBox(e.rigidBody);
    }
    if(e.c.playerCharacter){
        this.playerEntity = null;
    }
    if(e.c.camera){
        this.camera = null;
    }
};
