describe("Grid", function(){ 

    beforeEach(function() {
        this.testGrid = new Grid(2000, 2000, 100);
        this.testbody = { id: 1, name: "testbody"};
        this.testbody2 = { id: 2, name: "testbody2"};
    });

    it("hash should return cell offset in direction", function(){
        var result = this.testGrid.hash(2175.2);

        expect(result).toEqual(21);
    });

    it("insertPoint should insert point in corresponding cell", function(){
        var point = Vec2.create(812, 165.2);
        this.testGrid.insertPoint(this.testbody, point);

        expect(this.testGrid.contents[8][1].length).toEqual(1);
        expect(this.testGrid.contents[8][1][0].name).toEqual("testbody");
    });

    it("removePoint should remove point", function(){
        var point = Vec2.create(812, 165.2);
        this.testGrid.contents[8][1].push(this.testbody);
        this.testGrid.contents[8][1].push(this.testbody2);

        this.testGrid.removePoint(1, point);
        
        expect(this.testGrid.contents[8][1].length).toEqual(1);
        expect(this.testGrid.contents[8][1][0].name).toEqual("testbody2");
    });

    it("removePoint should not remove if point ist found", function(){
        var point = Vec2.create(812, 165.2);
        this.testGrid.contents[8][1].push(this.testbody);
        this.testGrid.contents[8][1].push(this.testbody2);

        this.testGrid.removePoint(3, point);
        
        expect(this.testGrid.contents[8][1].length).toEqual(2);
    });

    it("insertBox should insert bounding box in all overlapping cells", function(){
        this.testbody.box = new BoundingBox(811, 1101, 1095, 1205);

        this.testGrid.insertBox(this.testbody)

        expect(this.testGrid.contents[8][10].length).toEqual(0);
        expect(this.testGrid.contents[8][11].length).toEqual(1);
        expect(this.testGrid.contents[8][12].length).toEqual(1);
        expect(this.testGrid.contents[9][11].length).toEqual(1);
        expect(this.testGrid.contents[9][12].length).toEqual(1);
        expect(this.testGrid.contents[10][11].length).toEqual(1);
        expect(this.testGrid.contents[10][12].length).toEqual(1);
        expect(this.testGrid.contents[10][12][0].name).toEqual("testbody");
    });

    it("removeBox should remove bounding box in all containing cells", function(){
        this.testbody.box = new BoundingBox(811, 1101, 1095, 1205);
        this.testbody2.box = new BoundingBox(811, 1101, 1095, 1205);

        this.testGrid.insertBox(this.testbody);
        this.testGrid.insertBox(this.testbody2);

        this.testGrid.removeBox(this.testbody);

        expect(this.testGrid.contents[8][11].length).toEqual(1);
        expect(this.testGrid.contents[8][12].length).toEqual(1);
        expect(this.testGrid.contents[9][11].length).toEqual(1);
        expect(this.testGrid.contents[9][12].length).toEqual(1);
        expect(this.testGrid.contents[10][11].length).toEqual(1);
        expect(this.testGrid.contents[10][12].length).toEqual(1);
        expect(this.testGrid.contents[10][12][0].name).toEqual("testbody2");
    });

    it("removeBox should only remove if id match", function(){
        this.testbody.box = new BoundingBox(811, 1101, 1095, 1205);
        this.testbody2.box = new BoundingBox(811, 1101, 1095, 1205);

        this.testGrid.insertBox(this.testbody);

        this.testGrid.removeBox(this.testbody2);

        expect(this.testGrid.contents[8][10].length).toEqual(0);
        expect(this.testGrid.contents[9][11].length).toEqual(1);
        expect(this.testGrid.contents[10][12].length).toEqual(1);
        expect(this.testGrid.contents[9][11].length).toEqual(1);
        expect(this.testGrid.contents[10][12].length).toEqual(1);
        expect(this.testGrid.contents[10][12][0].name).toEqual("testbody");
    });

    it("getCellsBox should get all overlapping cells for bounding box", function(){
        var testBox = new BoundingBox(611, 1301, 995, 1450);
        var cellsBox = new CellsBox();

        this.testGrid.getCellsBox(testBox, cellsBox);

        expect(cellsBox.min[0]).toEqual(6);
        expect(cellsBox.min[1]).toEqual(13);
        expect(cellsBox.max[0]).toEqual(9);
        expect(cellsBox.max[1]).toEqual(14);
    });
});

