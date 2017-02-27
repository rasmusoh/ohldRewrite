
class Manifold {

    constructor (entity, withEntity, x, y) {
        this.entity = entity;
        this.withEntity = withEntity;
        this.collisionVector = Vec2.create(x,y);
        this.collisionPoint = Vec2.create(0,0);
        this.collisionEntity = 0;
    }
}
