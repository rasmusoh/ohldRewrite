describe("World", function(){ 
    beforeEach(function(){
        this.testWorld = new World(2000, 2000, 100);
        this.playerEntity = {id: 1, c: { player: { id: 1}, movingBody: {id: 1}, rigidBody:
            new RigidBody(SHAPE.POLYGON, CreateTestPolygonPentagon(500, 510))
        }};
        this.playerEntity.c.rigidBody.id = 1; 
        this.rigidBodyEntity = {id: 2, c: { rigidBody:  
            new RigidBody(SHAPE.POLYGON, CreateTestPolygonPentagon(500, 510))
        }};
        this.rigidBodyEntity.c.rigidBody.id = 2; 
        this.cameraEntity = {id: 3, c: { camera: {} }};
        this.testEntities = [this.playerEntity, 
                             this.rigidBodyEntity, 
                             this.cameraEntity];

        this.mockGrid = {
            removedBody : null,
            addedBody : null,
            insertBox : function(body){
                this.addedBody = body;
            },
            removeBox : function(body){
                this.removedBody = body;
            }
        };

        this.testWorld.grid = this.mockGrid; 
    });

    it("setEntities should add all entities to world", function(){
        this.testWorld.setEntities(this.testEntities);

        expect(this.testWorld.entities.length).toEqual(3);
        expect(this.testWorld.playerEntity.id).toEqual(1);
    });

    it("addEntity should add entity from", function(){
        this.testWorld.addEntity(this.playerEntity);

        expect(this.testWorld.entities[0].id).toEqual(1);
    });

    it("addentity should add entity as playerentity is has playercharacter component", function(){
        this.testWorld.addEntity(this.playerEntity);

        expect(this.testWorld.playerEntity.id).toEqual(1);
    });

    it("addentity should add entity as camera if it has camera component", function(){
        this.testWorld.addEntity(this.cameraEntity);

        expect(this.testWorld.camera.id).toEqual(3);
    });

    it("addEntity should add entity to movingBodies if it has movingBody component", function(){
        this.testWorld.addEntity(this.playerEntity);

        expect(this.testWorld.movingBodies[0].id).toEqual(1);
    });
    
    it("addEntity should add entity to movingBodies if it has movingBody and a rigidBody component", function(){
        this.testWorld.addEntity(this.playerEntity);

        expect(this.testWorld.movingRigidBodies[0].id).toEqual(1);
    });

    it("addEntity should add entity to grid if not moving", function(){
        this.testWorld.addEntity(this.rigidBodyEntity);

        expect(this.mockGrid.addedBody).toEqual(jasmine.any(RigidBody));
        expect(this.mockGrid.addedBody.id).toEqual(2);
    });

    it("removeEntity should remove entity from world", function(){
        this.testWorld.addEntity(this.playerEntity);
        this.testWorld.removeEntity(this.playerEntity);

        expect(this.testWorld.entities.length).toEqual(0);
    });

    it("removeEntity should remove entity from grid", function(){

        this.testWorld.removeEntity(this.rigidBodyEntity);

        expect(this.mockGrid.removedBody).toEqual(jasmine.any(RigidBody));
        expect(this.mockGrid.removedBody.id).toEqual(2);
    });

    it("removeEntity should remove entity from movingBodies", function(){
        this.testWorld.addEntity(this.playerEntity);
        this.testWorld.removeEntity(this.playerEntity);

        expect(this.testWorld.movingBodies.length).toEqual(0);
    });

    it("removeEntity should remove entity from movingRigidBodies", function(){
        this.testWorld.addEntity(this.playerEntity);
        this.testWorld.removeEntity(this.playerEntity);

        expect(this.testWorld.movingRigidBodies.length).toEqual(0);
    });

    it("removeEntity should remove entity from playerEntity", function(){
        this.testWorld.addEntity(this.playerEntity);
        this.testWorld.removeEntity(this.playerEntity);

        expect(this.testWorld.playerEntity).toBeNull();
    });

    it("removeEntity should remove entity from camera", function(){
        this.testWorld.addEntity(this.cameraEntity);
        this.testWorld.removeEntity(this.cameraEntity);

        expect(this.testWorld.camera).toBeNull();
    });
});
