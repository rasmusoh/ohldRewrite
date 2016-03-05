// collision module, contains collision checks and check-handles for 
// three basic shapes - axis-aligned bounding boxes, circles and convex polygons
// uses separation of axis theorem see:
// http://www.metanetsoftware.com/technique/tutorialA.html for intro
Collision = {};

Collision.checkBoundingBox = function(A,B){
    return A.min[0] > B.max[1] && B.min[0] > A.max[0] 
        && A.min[1] > B.max[1] && B.min[1] > A.max[1];
}

Collision.checkBodies = function(A, B, out){
    var result;
    if (A.type === shapeEnum.CIRCLE){
        if (B.type === shapeEnum.CIRCLE){
            result = Collision.checkCircleCircle(A.body, B.body, A.collisionVector);
        } else {
            result = Collision.checkPolygonCircle(B.body, A.body, A.collisionVector); 
            Vec2.scale(A.collisionVector, -1, A.collisionVector); //get passed in opposite order, so we need to flip collision vector
        }
    } else {
        if (B.type === shapeEnum.CIRCLE){
            result = Collision.checkPolygonCircle(A.body, B.body, A.collisionVector);
        } else {
            result = Collision.checkPolygonPolygon(A.body, B.body, A.collisionVector);
        }
    }
    return result;
}

Collision.checkBodyStatic = function(A, B, out){
    var result;
    switch(B.type){
        case shapeEnum.CIRCLE:
            if (A.type === shapeEnum.CIRCLE){
                result = Collision.checkCircleCircle(A.body, B.body, A.collisionVector);
            } else {
                result = Collision.checkPolygonCircle(A.body, B.body, A.collisionVector); 
            }
            break;
        case shapeEnum.POLYGON:
            if (A.type === shapeEnum.CIRCLE){
                result = Collision.checkPolygonCircle(B.body, A.body, A.collisionVector); 
                Vec2.scale(A.collisionVector, -1, A.collisionVector); //get passed in opposite order, so we need to flip collision vector
            } else {
                result = Collision.checkPolygonPolygon(A.body, B.body, A.collisionVector); 
            }
            break;
        case shapeEnum.EDGE:
            if (A.type === shapeEnum.CIRCLE){
                result = Collision.checkCircleEdge(A.body, B.body, A.collisionVector);
            } else {
                result = Collision.checkPolygonEdge(B.body, A.body, A.collisionVector); 
            }
            break;
    }
    return result;
}

Collision.checkPolygonPolygon = function(A, B, out){
    var minoverlap = checkPolygonOneSide(A, B, Infinity, out);
    return minoverlap > 0 && checkPolygonOneSide(A, B, minoverlap, out) > 0;
}

//helper to checkpolygonpolygon
Collision.checkPolygonOneSide = function(A, B, currentMinOverlap, out){
    var currentOverlap,
    minOverlap = currentMinOverlap;

    for(i = A.norms.length -1; i >= 0; i--){
        B.project(A.norms[i]);
        A.project(A.norms[i]);
        currentOverlap = Line.overlap(A.proj, B.proj);
        if(currentOverlap <= 0){
            return currentOverlap;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vector.scale(norms[i], minOverlap, out);
        }
    }
    return minOverlap;
}


Collision.checkPolygonCircle = function(polygon, circle, out){
    var currentOverlap,
    nearestEdge = -1,
    minOverlap = Infinity;

    for(i = polygon.norms.length -1; i >= 0; i--){
        polygon.project(polygon.norms[i]);
        circle.project(polygon.norms[i]);
        currentOverlap = Line.overlap(polygon.proj, circle.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            nerestEdge = i;
            Vector.scale(norms[i], minOverlap, out);
        }
    } 

    //check the two verteces adjacent to the nearest edge, they might be even closer
    for (var i = nearestEdge; i < nearestEdge + 2; i++)
    {
        Vec2.subtract(polygon.verteces[i], circle.center, circle.norm);
        Vec2.normalize(circle.norm);
        polygon.project(circle.norm);
        circle.project(circle.norm);

        currentOverlap = Line.overlap(polygon.proj, circle.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vector.scale(circle.norm, minOverlap, out);
        }
    }
    return true;
}



Collsion.checkCircleCircle = function(A, B, out){
    if(Vector.distance(A.pos, B.pos) - (A.r + B.r) > 0){
        out[0] = B.pos[0] - A.pos[0] - Math.sign(B.pos[0] - A.pos[0]) * (A.r + B.r);
        out[1] = B.pos[1] - A.pos[1] - Math.sign(B.pos[1] - A.pos[1]) * (A.r + B.r);
        return true;
    } else {
        return false;
    }
}

Collision.checkCircleEdge = function(circle, edge, out){
    //check normal
    circle.project(edge.surfaceNorm);
    minOverlap = polygon.proj[0];
    if(minOverlap <= 0){
        return false;
    }
    Vec2.scale(edge.surfaceNorm, minOverlap, out);

    //check parallell
    circle.project(edge.parallellNorm);
    currentOverlap = Line.overlap(circle.proj, edge.parallellProj);
    if(currentOverlap <= 0){
        return false;
    } else if (currentOverlap < minOverlap){
        minOverlap = currentOverlap;
        Vector.scale(norms[i], minOverlap, out);
    }

    if( currentOverlap < = circle.r){
        //have to check closest vertex as well
        var closest = circle.proj[0] + circle.r < edge.parallellProj[0] ? 0 : 1;
        circle.norm[0] = edge.verteces[closest][0] - circle.center[0];
        circle.norm[1] = edge.verteces[closest][1] - circle.center[1];
        Vec2.normalize(circle.norm);

        edge.project(circle.norm);
        circle.project(circle.norm);
        var minOverlap = Line.overlap(aabb.proj, circle.proj);
        if(minOverlap <= 0){
            return false;
        }
        Vector.scale(circle.norm, minOverlap, out);
    }
    return true;
}

Collision.checkPolygonEdge = function(polygon, edge, out){
    var currentOverlap,
    minOverlap = Infinity;

    //check normal
    polygon.project(edge.surfaceNorm);
    minOverlap = polygon.proj[0];
    if(minOverlap <= 0){
        return false;
    }
    Vec2.scale(edge.surfaceNorm, minOverlap, out);

    //check parallell
    polygon.project(edge.parallellNorm);
    currentOverlap = Line.overlap(polygon.proj, edge.parallellProj);
    if(currentOverlap <= 0){
        return false;
    } else if (currentOverlap < minOverlap){
        minOverlap = currentOverlap;
        Vector.scale(norms[i], minOverlap, out);
    }

    //check along polygon norms
    for(i = polygon.norms.length -1; i >= 0; i--){
        polygon.project(polygon.norms[i]);
        edge.project(polygon.norms[i]);

        currentOverlap = Line.overlap(polygon.proj, edge.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vector.scale(norms[i], minOverlap, out);
        }
    } 
    return true;
}
