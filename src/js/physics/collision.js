// collision module, contains collision checks and check-handles for 
// three basic shapes - axis-aligned bounding boxes, circles and convex polygons
// uses separation of axis theorem see:
// http://www.metanetsoftware.com/technique/tutorialA.html for intro
Collision = {};

Collision.checkBoundingBox = function(A,B){
    return A.min[0] < B.max[0] && B.min[0] < A.max[0] 
        && A.min[1] < B.max[1] && B.min[1] < A.max[1];
}

Collision.boundingBoxPoint = function(box, point) {
    return box.max[0] >= point[0] &&
           box.min[0] <= point[0] &&
           box.max[1] >= point[1] &&
           box.min[1] <= point[1] 
}

Collision.checkBodies = function(A, B, collisionVector){
    var result;
    switch(B.type){
        case SHAPE.CIRCLE:
            if (A.type === SHAPE.CIRCLE){
                result = Collision.checkCircleCircle(A.body, B.body, collisionVector);
            } else {
                result = Collision.checkPolygonCircle(A.body, B.body, collisionVector); 
            }
            break;
        case SHAPE.POLYGON:
            if (A.type === SHAPE.CIRCLE){
                result = Collision.checkPolygonCircle(B.body, A.body, collisionVector); 
                Vec2.scale(collisionVector, -1, collisionVector); //get passed in opposite order, so we need to flip collision vector
            } else {
                result = Collision.checkPolygonPolygon(A.body, B.body, collisionVector); 
            }
            break;
        case SHAPE.EDGE:
            if (A.type === SHAPE.CIRCLE){
                result = Collision.checkCircleEdge(A.body, B.body, collisionVector);
            } else {
                result = Collision.checkPolygonEdge(A.body, B.body, collisionVector); 
            }
            break;
    }
    return result;
}

Collision.checkPolygonPolygon = function(A, B, out){
    var currentOverlap,
    minOverlap = Infinity;

    for(var i = A.norms.length -1; i >= 0; i--){
        B.project(A.norms[i]);
        A.project(A.norms[i]);
        currentOverlap = Line.overlap(A.proj, B.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vec2.scale(A.norms[i], Math.sign(B.proj[0] - A.proj[0]) * minOverlap, out);
        }
    }

    for(var i = B.norms.length -1; i >= 0; i--){
        B.project(B.norms[i]);
        A.project(B.norms[i]);
        currentOverlap = Line.overlap(A.proj, B.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vec2.scale(B.norms[i], Math.sign(A.proj[0] - B.proj[0]) * minOverlap, out);
        }
    }
    return true;
}


Collision.checkPolygonCircle = function(polygon, circle, out){
    var currentOverlap,
    nearestEdge = -1,
    minOverlap = Infinity;

    for(var i = polygon.norms.length -1; i >= 0; i--){
        polygon.project(polygon.norms[i]);
        circle.project(polygon.norms[i]);
        currentOverlap = Line.overlap(polygon.proj, circle.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            nearestEdge = i;
            Vec2.scale(polygon.norms[i], Math.sign(circle.proj[0] - polygon.proj[0]) * minOverlap, out);
        }
    } 

    //check the two verteces adjacent to the nearest edge, they might be even closer
    // mod operator b/c vertex 0 is adjacent to vertex length-1 etc
    var vertex1 = nearestEdge % polygon.norms.length; 
    var vertex2 = nearestEdge + 1 % polygon.norms.length;
    for (var i = vertex1; i <= vertex2; i++)
    {
        Vec2.subtract(polygon.verteces[i], circle.center, circle.norm);
        Vec2.normalize(circle.norm, circle.norm);
        polygon.project(circle.norm);
        circle.project(circle.norm);

        currentOverlap = Line.overlap(polygon.proj, circle.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vec2.scale(circle.norm, Math.sign(circle.proj[0] - polygon.proj[0]) * minOverlap, out);
        }
    }
    return true;
}



Collision.checkCircleCircle = function(A, B, out){
    if(Vec2.distance(A.center, B.center) - (A.r + B.r) < 0){
        out[0] =  Math.sign(B.center[0] - A.center[0]) * (A.r + B.r) - (B.center[0] - A.center[0]);
        out[1] = Math.sign(B.center[1] - A.center[1]) * (A.r + B.r) - (B.center[1] - A.center[1]);
        return true;
    } else {
        return false;
    }
}

Collision.checkCircleEdge = function(circle, edge, out){
    //check normal
    circle.project(edge.norm);
    minOverlap = Line.overlap(circle.proj, edge.normProj);
    if(minOverlap <= 0){
        return false;
    }
    Vec2.scale(edge.norm, Math.sign( edge.normProj[0] - circle.proj[0] ) * minOverlap, out);

    //check parallell
    circle.project(edge.parallellNorm);
    currentOverlap = Line.overlap(circle.proj, edge.parallellProj);
    if(currentOverlap <= 0){
        return false;
    } else if (currentOverlap < minOverlap){
        minOverlap = currentOverlap;
        Vec2.scale(edge.parallellNorm, Math.sign( edge.parallellProj[0] - circle.proj[0] ) * minOverlap, out);
    }

    if(currentOverlap <= circle.r){
        //have to check closest vertex as well
        var closest = circle.proj[0] + circle.r < edge.parallellProj[0] ? 0 : 1;
        circle.norm[0] = edge.verteces[closest][0] - circle.center[0];
        circle.norm[1] = edge.verteces[closest][1] - circle.center[1];
        Vec2.normalize(circle.norm, circle.norm);

        edge.project(circle.norm);
        circle.project(circle.norm);
        var minOverlap = Line.overlap(edge.proj, circle.proj);
        if(minOverlap <= 0){
            return false;
        }
        Vec2.scale(circle.norm, minOverlap, out);
    }
    return true;
}

Collision.checkPolygonEdge = function(polygon, edge, out){
    var currentOverlap,
    minOverlap = Infinity;

    //check normal
    polygon.project(edge.norm);
    minOverlap = Line.overlap(polygon.proj, edge.normProj);
    if(minOverlap <= 0){
        return false;
    }
    Vec2.scale(edge.norm, Math.sign(edge.normProj[0] - polygon.proj[0]) * minOverlap, out);

    //check parallell
    polygon.project(edge.parallellNorm);
    currentOverlap = Line.overlap(polygon.proj, edge.parallellProj);
    if(currentOverlap <= 0){
        return false;
    } else if (currentOverlap < minOverlap){
        minOverlap = currentOverlap;
        Vec2.scale(edge.parallellNorm, Math.sign( edge.parallellProj[0] - polygon.proj[0]) * minOverlap, out);
    }

    //check along polygon norms
    for(var i = polygon.norms.length -1; i >= 0; i--){
        polygon.project(polygon.norms[i]);
        edge.project(polygon.norms[i]);

        currentOverlap = Line.overlap(polygon.proj, edge.proj);
        if(currentOverlap <= 0){
            return false;
        } else if (currentOverlap < minOverlap){
            minOverlap = currentOverlap;
            Vec2.scale(polygon.norms[i], Math.sign(edge.proj[0] - polygon.proj[0]) * minOverlap, out);
        }
    } 
    return true;
}

