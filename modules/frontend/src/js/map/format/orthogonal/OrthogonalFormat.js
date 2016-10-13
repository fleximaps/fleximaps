import BABYLON from 'babylonjs';

export default class OrthogonalFormat{
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
        const scene = this._scene;
        let tileMesh = null;

        if(this._firstTileMesh === null){
            this._firstTileMesh = BABYLON.Mesh.CreatePlane(tileTag, 1.0, scene);
            tileMesh = this._firstTileMesh;
        }else{
            tileMesh = this._firstTileMesh.clone(tileTag);
        }

        tileMesh.position.x = tileX;
        tileMesh.position.y = tileY;
        tileMesh.freezeWorldMatrix();

        return tileMesh;
    }
    _createTileBorderMesh(tileTag){
        const scene = this._scene;

        let tileBorderMesh = null;

        const borderMeshTag = 'border-' + tileTag;

        if(this._firstTileBorderMesh === null){
            this._firstTileBorderMesh = BABYLON.Mesh.CreateLines(borderMeshTag, [
                new BABYLON.Vector3(-0.5, -0.5, 0),
                new BABYLON.Vector3(0.5, -0.5, 0),
                new BABYLON.Vector3(0.5, 0.5, 0),
                new BABYLON.Vector3(-0.5, 0.5, 0),
                new BABYLON.Vector3(-0.5, -0.5, 0)
            ], scene);

            this._firstTileBorderMesh.color = new BABYLON.Color3(0.196, 0.196, 0.196);

            tileBorderMesh = this._firstTileBorderMesh;
        }else{
            tileBorderMesh = this._firstTileBorderMesh.clone(borderMeshTag);
        }
        tileBorderMesh.freezeWorldMatrix();

        return tileBorderMesh;
    }
}