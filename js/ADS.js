function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
}

function DynamicalSystems(fx, fy, fz) {
    this.name = "";
    this.fx = fx;
    this.fy = fy;
    this.fz = fz;
    this.params = new Object();

    this.getValue = function(p) {
        var newPoint = new Point(p.x, p.y, p.z);
        newPoint.x = this.fx(point.x);
        newPoint.y = this.fx(point.y);
        newPoint.z = this.fx(point.z);
    }

    this.getNextPoint = function(p, CONST_H) {
        var newPoint = new Point(p.x, p.y, p.z);

        var k1x = this.fx(p);
        var k1y = this.fy(p);
        var k1z = this.fz(p);

        var k2x = this.fx(new Point(p.x + CONST_H / 2, p.y + (CONST_H * k1y) / 2, p.z + (CONST_H * k1z) / 2));
        var k2y = this.fy(new Point(p.x + (CONST_H * k1x) / 2, p.y + CONST_H / 2, p.z + (CONST_H * k1z) / 2));
        var k2z = this.fz(new Point(p.x + (CONST_H * k1x) / 2, p.y + (CONST_H * k1y) / 2, p.z + CONST_H / 2));

        var k3x = this.fx(new Point(p.x + CONST_H / 2, p.y + (CONST_H * k2y) / 2, p.z + (CONST_H * k2z) / 2));
        var k3y = this.fy(new Point(p.x + (CONST_H * k2x) / 2, p.y + CONST_H / 2, p.z + (CONST_H * k2z) / 2));
        var k3z = this.fz(new Point(p.x + (CONST_H * k2x) / 2, p.y + (CONST_H * k2y) / 2, p.z + CONST_H / 2));

        var k4x = this.fx(new Point(p.x + CONST_H, p.y + (CONST_H * k3y), p.z + (CONST_H * k3z)));
        var k4y = this.fy(new Point(p.x + (CONST_H * k3x), p.y + CONST_H, p.z + (CONST_H * k3z)));
        var k4z = this.fz(new Point(p.x + (CONST_H * k3x), p.y + (CONST_H * k3y), p.z + CONST_H));

        newPoint.x = p.x + CONST_H / 6 * (k1x + 2 * k2x + 2 * k3x + k4x);
        newPoint.y = p.y + CONST_H / 6 * (k1y + 2 * k2y + 2 * k3y + k4y);
        newPoint.z = p.z + CONST_H / 6 * (k1z + 2 * k2z + 2 * k3z + k4z);

        return newPoint;
    }

    this.getLapynovValueForPoint = function(p, v, EPSILON) {
        var closePoint = new Point(p.x + v.x, p.y + v.y, p.z + v.z);

        p = this.getNextPoint(p);
        v = this.getNextPoint(closePoint);

        v = new Point(v.x - p.x, v.y - p.y, v.z - p.z);
        var lengthV = v.length();

        closeVector = new Point(v.x / lengthV * EPSILON, v.y / lengthV * EPSILON, v.z / lengthV * EPSILON);

        return Math.log(lengthV / EPSILON);
    }
}