import BABYLON from 'babylonjs';

const indices = [
    0, 1, 2,
    2, 3, 4,
    0, 4, 5,
    0, 2, 4
];

export default class HexagonalVertexData{
    static create(size = 1.0){
        const displacement  = {
            x: 1,
            y: Math.sqrt(3)/2
        };

        const positions = [];
        const normals = [];
        const uvs = [];
        //Calculate vertices
        for(let point = 0; point < 6; point++){
            const vrxPointBase = point*2;

            const angle = 2 * Math.PI / 6 * point;
            const xRel = Math.cos(angle) + displacement.x;
            const yRel = Math.sin(angle) + displacement.y;

            positions.push(xRel*size, yRel*size , 0);
            uvs.push(xRel/2, yRel/2);
        }

        // result
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        BABYLON.VertexData._ComputeSides(BABYLON.Mesh.DEFAULTSIDE, positions, indices, normals, uvs);

        const vertexData = new BABYLON.VertexData();

        vertexData.indices = indices;
        vertexData.positions = positions;
        vertexData.normals = normals;
        vertexData.uvs = uvs;

        return vertexData;
    }
}