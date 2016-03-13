describe("Grid", function(){ 

    beforeEach(function() {
        this.testGrid = new Grid(2000, 2000, 100);
        this.testitem = { id: 1, name: "testitem"};
        this.testitem2 = { id: 2, name: "testitem2"};
    });

    it("hash should return cell offset in direction", function(){
        var result = this.testGrid.hash(2175.2);

        expect(result).toEqual(21);
    });

    it("insertPoint should insert point in corresponding cell", function(){
        var point = Vec2.create(812, 165.2);
        this.testGrid.insertPoint(this.testitem, point);

        expect(this.testGrid.contents[8][1].length).toEqual(1);
        expect(this.testGrid.contents[8][1][0].name).toEqual("testitem");
    });

    it("removePoint should remove point", function(){
        var point = Vec2.create(812, 165.2);
        this.testGrid.contents[8][1].push(this.testitem);
        this.testGrid.contents[8][1].push(this.testitem2);

        this.testGrid.removePoint(1, point);
        
        expect(this.testGrid.contents[8][1].length).toEqual(1);
        expect(this.testGrid.contents[8][1][0].name).toEqual("testitem2");
    });

    it("removePoint should not remove if point ist found", function(){
        var point = Vec2.create(812, 165.2);
        this.testGrid.contents[8][1].push(this.testitem);
        this.testGrid.contents[8][1].push(this.testitem2);

        this.testGrid.removePoint(3, point);
        
        expect(this.testGrid.contents[8][1].length).toEqual(2);
    });

    it("insertBox should insert bounding box in all overlapping cells", function(){
        this.testitem.box = new BoundingBox(811, 1101, 1095, 1205);

        this.testGrid.insertBox(this.testitem, this.testitem.box);

        expect(this.testGrid.contents[8][10].length).toEqual(0);
        expect(this.testGrid.contents[8][11].length).toEqual(1);
        expect(this.testGrid.contents[8][12].length).toEqual(1);
        expect(this.testGrid.contents[9][11].length).toEqual(1);
        expect(this.testGrid.contents[9][12].length).toEqual(1);
        expect(this.testGrid.contents[10][11].length).toEqual(1);
        expect(this.testGrid.contents[10][12].length).toEqual(1);
        expect(this.testGrid.contents[10][12][0].name).toEqual("testitem");
    });

    it("removeBox should remove bounding box in all containing cells", function(){
        this.testitem.box = new BoundingBox(811, 1101, 1095, 1205);
        this.testitem2.box = new BoundingBox(811, 1101, 1095, 1205);

        this.testGrid.insertBox(this.testitem, this.testitem.box);
        this.testGrid.insertBox(this.testitem2, this.testitem2.box);

        this.testGrid.removeBox(1, this.testitem.box);

        expect(this.testGrid.contents[8][11].length).toEqual(1);
        expect(this.testGrid.contents[8][12].length).toEqual(1);
        expect(this.testGrid.contents[9][11].length).toEqual(1);
        expect(this.testGrid.contents[9][12].length).toEqual(1);
        expect(this.testGrid.contents[10][11].length).toEqual(1);
        expect(this.testGrid.contents[10][12].length).toEqual(1);
        expect(this.testGrid.contents[10][12][0].name).toEqual("testitem2");
    });

    it("removeBox should not remove anything if nothing is found", function(){
        this.testitem.box = new BoundingBox(811, 1101, 1095, 1205);
        this.testitem2.box = new BoundingBox(811, 1101, 1095, 1205);

        this.testGrid.insertBox(this.testitem, this.testitem.box);
        this.testGrid.insertBox(this.testitem2, this.testitem2.box);

        this.testGrid.removeBox(3, this.testitem.box);

        expect(this.testGrid.contents[8][10].length).toEqual(0);
        expect(this.testGrid.contents[9][11].length).toEqual(2);
        expect(this.testGrid.contents[10][12].length).toEqual(2);
        expect(this.testGrid.contents[9][11].length).toEqual(2);
        expect(this.testGrid.contents[10][12].length).toEqual(2);
        expect(this.testGrid.contents[10][12][0].name).toEqual("testitem");
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

