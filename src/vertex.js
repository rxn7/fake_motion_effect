export function rotateVertex(vertex, x, y, z) {
    let cos = Math.cos(x);
    let sin = Math.sin(x);
    vertex.y = cos * vertex.y - sin * vertex.z;
    vertex.z = sin * vertex.y + cos * vertex.z;
    cos = Math.cos(y);
    sin = Math.sin(y);
    vertex.x = cos * vertex.x + sin * vertex.z;
    vertex.z = -sin * vertex.x + cos * vertex.z;
    cos = Math.cos(z);
    sin = Math.sin(z);
    vertex.x = cos * vertex.x - sin * vertex.y;
    vertex.y = sin * vertex.x + cos * vertex.y;
}
