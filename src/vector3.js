export class Vector3 extends Float32Array {
    constructor(x = 0, y = 0, z = 0) {
        super(3);
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }
    rotate(x, y, z) {
        let cos = Math.cos(x);
        let sin = Math.sin(x);
        let newY = cos * this[1] - sin * this[2];
        let newZ = sin * this[1] + cos * this[2];
        this[1] = newY;
        this[2] = newZ;
        cos = Math.cos(y);
        sin = Math.sin(y);
        let newX = cos * this[0] + sin * this[2];
        newZ = -sin * this[0] + cos * this[2];
        this[0] = newX;
        this[2] = newZ;
        cos = Math.cos(z);
        sin = Math.sin(z);
        newX = cos * this[0] - sin * this[1];
        newY = sin * this[0] + cos * this[1];
        this[0] = newX;
        this[1] = newY;
    }
}
