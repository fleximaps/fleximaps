import HexagonalMeshBuilder from './mesh/HexagonalMeshBuilder';

const SQRT3 = Math.sqrt(3);
const SIZE = 0.5;

export default class HexagonalFormat{
    constructor(){
        this._createCacheObs();
    }
    _createCacheObs(){
        this._firstTileMesh = null;
        this._firstTileBorderMesh = null;
        this._scene = null;
    }
    setScene(scene){
        this._scene = scene;
    }
    createTileMesh(tag, tileX, tileY){
        const tileMesh = this._createTileMesh(tag, tileX, tileY);
        const tileBorderMesh = this._createTileBorderMesh(tag);
        tileBorderMesh.parent = tileMesh;

        return tileMesh;
    }
    _createTileMesh(tileTag, tileX, tileY){
        let tileMesh = null;

        if(this._firstTileMesh === null){
            this._firstTileMesh = HexagonalMeshBuilder.create(tileTag, this._scene, SIZE);
            tileMesh = this._firstTileMesh;
        }else{
            tileMesh = this._firstTileMesh.clone(tileTag);
        }

        tileMesh.position.x = tileX*1.5*SIZE;
        tileMesh.position.y = tileY*SQRT3*SIZE;

        if(tileX % 2 === 1){
            tileMesh.position.y += SQRT3*SIZE/2.0;
        }

        tileMesh.freezeWorldMatrix();

        return tileMesh;
    }
    _createTileBorderMesh(tileTag){
        let tileBorderMesh = null;

        const borderMeshTag = 'border-' + tileTag;

        if(this._firstTileBorderMesh === null){
            this._firstTileBorderMesh = HexagonalMeshBuilder.createBorder(borderMeshTag, this._scene, SIZE);

            tileBorderMesh = this._firstTileBorderMesh;
        }else{
            tileBorderMesh = this._firstTileBorderMesh.clone(borderMeshTag);
        }

        tileBorderMesh.freezeWorldMatrix();

        return tileBorderMesh;
    }
}