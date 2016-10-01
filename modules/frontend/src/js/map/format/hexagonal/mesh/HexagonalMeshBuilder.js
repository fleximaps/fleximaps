import BABYLON from 'babylonjs';

import HexagonalVertexData from './HexagonalVertexData';

export default class HexagonalMeshBuilder{
    static create(name, scene, size = 1.0){
        const mesh = new BABYLON.Mesh(name, scene);

        const vertexData = HexagonalVertexData.create(size);
        vertexData.applyToMesh(mesh, false);
        
        return mesh;
    }
    static createBorder(name, scene, size = 1){
        const points = [];

        const displacement  = {
            x: 1,
            y: Math.sqrt(3)/2
        };

        //Calculate vertices
        for(let point = 0; point < 6; point++){
            const vrxPointBase = point*2;

            const angle = 2 * Math.PI / 6 * point;
            const xRel = Math.cos(angle) + displacement.x;
            const yRel = Math.sin(angle) + displacement.y;

            points.push(new BABYLON.Vector3(xRel*size, yRel*size, 0));
        }
        points.push(points[0]); //Close the lines

        const mesh = BABYLON.Mesh.CreateLines(name, points, scene);
        mesh.color = new BABYLON.Color3(0.196, 0.196, 0.196);

        return mesh;
    }
}