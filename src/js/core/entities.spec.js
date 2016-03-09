describe("Entity", function() {
    it("should instatiate correctly", function() {
        var ent = new Entity();

        expect( ent.hasOwnProperty("c")).toBeTruthy(); 
    });

    it("should increment counter on creation", function() {
        Entity.prototype.count = 0;
        var entity1 = new Entity();
        var entity2 = new Entity();

        expect( entity1.count).toEqual(2); 
    });

    it("should get id from counter", function() {
        Entity.prototype.count = 0;
        var entity1 = new Entity();
        var entity2 = new Entity();

        expect( entity2.id).toEqual(1); 
    });
    
    it("addComponent should add component", function() {
        var ent = new Entity();
        var comp = new positionComponent(2,0,0);

        ent.addComponent(comp);

        expect(ent.c.position.x).toEqual(2); 
    });


    it("removeComponent called with name should remove", function() {
        var ent = new Entity();
        var comp = new positionComponent(2,0,0);
        ent.addComponent(comp);

        ent.removeComponent(positionComponent);

        expect(ent.c.hasOwnProperty("position")).toBeFalsy(); 
    });

    it("removeComponent called with name should remove", function() {
        var ent = new Entity();
        var comp = new positionComponent(2,0,0);
        ent.addComponent(comp);

        ent.removeComponent("position");

        expect(ent.c.hasOwnProperty("position")).toBeFalsy(); 
    });
});
