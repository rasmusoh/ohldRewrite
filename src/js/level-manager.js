Levels = (function(){

    loadDebugGrid = function() {
    };

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

    collisionTest1 = function() {
        var camera = new Entity();
        camera.addComponent(new CameraComponent());

        var edge = new Entity();
        edge.addComponent(new RigidBody(SHAPE.EDGE, CreateTestEdgeUpsideDown()));
        edge.addComponent(new AppearanceComponent("#000000"));
        edge.addComponent(new PositionComponent(100,100));
        edge.addComponent(new DraggableComponent());

        var edge2 = new Entity();
        edge2.addComponent(new RigidBody(SHAPE.EDGE, new Edge(0,500,1900,500, false)));
        edge2.addComponent(new AppearanceComponent("#000000"));
        edge2.addComponent(new PositionComponent(1300,500));
        edge2.addComponent(new DraggableComponent());

        var pol1 = new Entity();
        pol1.addComponent(new RigidBody(SHAPE.POLYGON, CreateTestPolygonPentagon(200, 150)));
        pol1.addComponent(new MovingBody());
        pol1.addComponent(new AppearanceComponent("#009900"));
        pol1.addComponent(new PositionComponent(200, 150));
        pol1.addComponent(new DraggableComponent());

        var pol2 = new Entity();
        pol2.addComponent(new RigidBody(SHAPE.POLYGON, CreateTestPolygonTriangle(1050, 400)));
        pol2.addComponent(new MovingBody());
        pol2.addComponent(new AppearanceComponent("#009999"));
        pol2.addComponent(new PositionComponent(1050, 400));
        pol2.addComponent(new DraggableComponent());

        var circle1 = new Entity();
        circle1.addComponent(new RigidBody(SHAPE.CIRCLE, CreateTestCircle(350, 320)));
        circle1.addComponent(new MovingBody());
        circle1.addComponent(new AppearanceComponent("#000099"));
        circle1.addComponent(new PositionComponent(350, 320));
        circle1.addComponent(new DraggableComponent());

        var circle2 = new Entity();
        circle2.addComponent(new RigidBody(SHAPE.CIRCLE, CreateTestCircleBig(430, 230)));
        circle2.addComponent(new MovingBody());
        circle2.addComponent(new AppearanceComponent("#50ff50"));
        circle2.addComponent(new PositionComponent(430, 230));
        circle2.addComponent(new DraggableComponent());

        world = new World(2000, 2000, 100);
        world.addEntities([camera, pol1, pol2, circle1, circle2, edge, edge2]);

        return world;
    }

    return{
        loadTestLevel : loadTestLevel,
        CollisionTest1: collisionTest1
    };
})();
