describe("World", function(){ 
    beforeEach(function(){
        this.testWorld = new World(2000, 2000, 100);
        this.testEntity1 = {id: 1, c: { player: {}, movement: {} };
        this.testEntity2 = {id: 2, c: { rigidBody: { box : {}} };
        this.testEntity3 = {id: 3, c: { camera: {} };
        this.testEntities = [testEntity1, testEntity2, testEntity3];

        this.mockGrid = {
            insertBox = function(e, box){
                value = e;
                box = box;
            }
        };

        spyOn(mockGrid, 'insertBox');
    });

    it("setEntities should add all entities to world", function(){
        this.testWorld.setEntities(this.testEntities);

        expect(this.testWorld.entities.length).shouldEqual(3);
        expect(this.testWorld.playerEntity.id).shouldEqual(1);
    });

    it("addEntity should add entity from", function(){
        this.testWorld.addEntity(this.testEntity1);

        expect(this.testWorld.entities[0].id).shouldEqual(1);
    });

    it("addentity should add entity as playerentity is has playercharacter component", function(){
        this.testWorld.addEntity(this.testEntity1);

        expect(this.testWorld.playerEntity.id).shouldEqual(1);
    });

    it("addentity should add entity as camera if it has camera component", function(){
        this.testWorld.addEntity(this.testEntity3);

        expect(this.testWorld.camera.id).shouldEqual(2);
    });

    it("addEntity should add entity to movingObjects if it has movement component", function(){
        this.testWorld.addEntity(this.testEntity1);

        expect(this.testWorld.movingObjects[0].id).shouldEqual(1);
    });

    it("addEntity should add entity to grid if not moving", function(){
        this.testWorld.addEntity(this.testEntity2);

        expect(this.testWorld.grid[0].id).shouldEqual(1);
    });

    it("removeEntity should remove entity from", function(){
        this.testWorld.addEntity(this.testEntity1);
        this.testWorld.removeEntity(this.testEntity1);

        expect(this.testWorld.entities.length).shouldEqual(0);
    });

    it("removeEntity should remove entity from grid", function(){
        this.testWorld.addEntity(this.testEntity2);
        this.testWorld.removeEntity(this.testEntity2);

        expect(this.mockGrid.insertBox).toHaveBeenCalledWith(this.testEntity2, this.testEntity2.rigidBody.box);
    });

    it("removeEntity should remove entity from movingObjects", function(){
        this.testWorld.addEntity(this.testEntity1);
        this.testWorld.removeEntity(this.testEntity1);

        expect(this.testWorld.movingObjects.length).shouldEqual(0);
    });

    it("removeEntity should remove entity from playerEntity", function(){
        this.testWorld.addEntity(this.testEntity1);
        this.testWorld.removeEntity(this.testEntity1);

        expect(this.testWorld.playerEntity).toBeNull();
    });

    it("removeEntity should remove entity from camera", function(){
        this.testWorld.addEntity(this.testEntity3);
        this.testWorld.removeEntity(this.testEntity3);

        expect(this.testWorld.camera).toBeNull();
    });

});
