Levels = (function(){

    loadTestLevel = function(){
        entity.prototype.count = 0;
        var entities  = [];
        ent = new entity();
        ent.addComponent( new appearanceComponent("#FFFF00"));
        ent.addComponent( new positionComponent());
        ent.addComponent( new velocityComponent(1,1,0));
        var verteces = [ 
        {x:-10,y:-5},
        {x: 10,y:-5},
        {x: 15,y: 0},
        {x: 10,y: 5},
        {x:-10,y: 5},
        ];

        ent.addComponent( new PolygonComponent(verteces));
        ent.addComponent( new rocketComponent());

        entities.push(ent);

        cam = new entity();
        cam.addComponent( new cameraComponent()); 

        entities.push(cam);

        return entities;
    };

    return{
        loadTestLevel : loadTestLevel
    };
})();
