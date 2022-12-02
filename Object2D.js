function distance(point1, point2) {
    let vector = [point2[0]-point1[0], point2[1]-point1[1]];
    return Math.abs(Math.sqrt( vector[0]**2 + vector[1]**2 ));
}

const VEK = (ax, ay, bx, by) => ax * by - bx * ay;

function CrossingCheck(p1, p2, p3, p4) {
	let v1 = VEK(p4[0] - p3[0], p4[1] - p3[1], p1[0] - p3[0], p1[1] - p3[1]);
	let v2 = VEK(p4[0] - p3[0], p4[1] - p3[1], p2[0] - p3[0], p2[1] - p3[1]);
	let v3 = VEK(p2[0] - p1[0], p2[1] - p1[1], p3[0] - p1[0], p3[1] - p1[1]);
	let v4 = VEK(p2[0] - p1[0], p2[1] - p1[1], p4[0] - p1[0], p4[1] - p1[1]);
	return (v1 * v2 < 0 && v3 * v4 < 0);
}

function EquationOfTheLine(p1, p2) {
	let A = p2[1] - p1[1];                                            
    let B = p1[0] - p2[0];
    let C = -p1[0] * (p2[1] - p1[1]) + p1[1] * (p2[0] - p1[0]);
    return [A, B, C];
}

 
function Intersection(a1, b1, c1, a2, b2, c2) {
	let d = a1 * b2 - b1 * a2;
    let dx = -c1 * b2 + b1 * c2;
	let dy = -a1 * c2 + c1 * a2;
	return [[dx / d], [dy / d]];
}

function Mesh(vertexes, color='red', closed=false, type='mesh') {
    this.vertexes = vertexes;
    this.color = color;
    this.closed = closed;
    this.type = type;
}

function is_closed(object) {
    if (object.closed) {
        object.vertexes.push(object.vertexes[0]);
    }
}

function MeshCollision(p1, p2, p3, p4) {
    if (CrossingCheck(p1, p2, p3, p4)) {
		let points_1 = EquationOfTheLine(p1, p2);
		let a1 = points_1[0];
        let b1 = points_1[1];
        let c1 = points_1[2];
		let points_2 = EquationOfTheLine(p3, p4);
		let a2 = points_2[0];
        let b2 = points_2[1];
        let c2 = points_2[2];

        let points = Intersection(a1, b1, c1, a2, b2, c2);
        return [points[0], points[1]];
    }
    return false;
}
