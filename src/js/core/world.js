World = function (){
    this.entities = new Array();
    this.movingObjects = [];
    this.playerEntity = {};
    this.camera = {};
    this.grid = new Grid(sizeX, sizeY);
};

World.prototype.setEntities = function ( entitiesArray ) {
    this.entities = new Array();
    for(i = 0; i < entitiesArray.length; i++){
        this.addEntity(entitiesArray[i]);
    }
};

World.prototype.addEntity = function ( e ) {
    this.entities.add(e);
    if(e.c.movement){
        this.movingObjects.add(e);
    } else if(e.c.rigidBody){
        this.grid.insertBox(e, e.rigidBody.box);
    }
    if(e.c.playerCharacter){
        this.playerEntity = e;
    }
    if(e.c.camera){
        this.camera = e;
    }
};

World.prototype.removeEntity = function ( e ) {
    this.entities = entitiesArray;
    if(e.c.movement){
        this.movingObjects.add(e);
    } else if(e.c.rigidBody){
        this.grid.removeBox(e, e.rigidBody.box);
    }
    if(e.c.playerCharacter){
        this.playerEntity = null;
    }
    if(e.c.camera){
        this.camera = null;
    }
};
