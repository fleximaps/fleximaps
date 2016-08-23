import BABYLON from 'babylonjs';
import React from 'react';
import Relay from 'react-relay';

import ChangeTileTypeMutation from '../mutations/ChangeTileTypeMutation';

const VIEWPORT_SIZE = 5;

class Map extends React.Component {
    constructor(){
        super();

        this._oldProps = {
            tileset: {
                availableTileTypes: 0,
                rows: []
            }
        };

        this._materials = [];
        this._tiles = [];

        this._firstTileMesh = null;
        this._firstTileBorderMesh = null;

        this._scene = null;
    }
    render() {
        const component = this;

        if(this._scene !== null){
            this._update();
        }

        return (
            <canvas className="map" ref="mapRef"></canvas>
        );
    }
    _update(){
        this._updateTileTypes();
        this._updateTiles();
    }
    _updateTileTypes(){
        const oldAvailableTileTypes = this._oldProps.tileset.availableTileTypes;
        const availableTileTypes = this.props.tileset.availableTileTypes;

        if(oldAvailableTileTypes > availableTileTypes){
            //There are fewer tile types
            console.warn('Not implemented yet');
        }else if(oldAvailableTileTypes < availableTileTypes){
            //There are new tile types
            for(let tileType = oldAvailableTileTypes; tileType < availableTileTypes; tileType++){
                this._createTileTypeMaterial();
            }
        }
    }
    _updateTiles(){
        const component = this;

        this._updateRowsNumber();

        const rows = this.props.tileset.rows;
        rows.forEach(function(currRow, rowIdx){
            component._updateRow.apply(component, [currRow, rowIdx]);
        });
    }
    _updateRow(row, rowIdx){
        const component = this;

        const tileMeshes = this._tiles;
        const tiles = row.tiles;

        //TODO tile number changed...

        tiles.forEach(function(tile, tileIdx){
            const tileMesh = tileMeshes[rowIdx][tileIdx];

            tileMesh.material = component._materials[tile.type];
        });
    }
    _updateRowsNumber(){
        const rows = this.props.tileset.rows;

        const oldRowsCount = this._oldProps.tileset.rows.length;
        const rowsCount = rows.length;

        //Check if the row number changed
        if(oldRowsCount > rowsCount){
            //There are fewer rows
            console.warn('Not implemented yet');
        }else if(oldRowsCount < rowsCount){
            //There are new tile types
            for(let rowNum = oldRowsCount; rowNum < rowsCount; rowNum++){
                const row = rows[rowNum];
                this._createTilesRow(rowNum, row);
            }
        }
    }
    _onTileTypeChanged(tileCoords){
        const tile = this.props.tileset.rows[tileCoords.y].tiles[tileCoords.x];
        const newTileType = (tile.type + 1) % this.props.tileset.availableTileTypes;

        this.props.relay.commitUpdate(
            new ChangeTileTypeMutation({
                tile: tile,
                tileType: newTileType
            })
        );
    }
    componentDidMount(){
        const mapRef = this.refs.mapRef;

        this._initBabylon(mapRef);
        this._update();
    }
    _initBabylon(canvas){
        const component = this;

        // Load the BABYLON 3D engine
        const engine = new BABYLON.Engine(canvas, true);
        this._engine = engine;

        const scene = this._createScene(canvas);
        scene.ambientColor = new BABYLON.Color3(1, 1, 1);
        scene.lightsEnabled = false;
        scene.debugLayer.show();
        this._scene = scene;

        this._updateAspectRatio();

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener('resize', function () {
            component._updateAspectRatio.apply(component);

            component._engine.resize();
        });
    }
    _updateAspectRatio(){
        const scene = this._scene;

        const camera = this._mainCamera;

        let height = this.refs.mapRef.height;
        const width = this.refs.mapRef.width;

        if (height == 0) height = 1;

        /* Calculate aspect ratio --------------------------------------------------------------------*/
        const aspectRatio = width / height;

        if (width >= height)
        {
            camera.orthoLeft = -VIEWPORT_SIZE*aspectRatio;
            camera.orthoRight = VIEWPORT_SIZE*aspectRatio;
            camera.orthoBottom = -VIEWPORT_SIZE;
            camera.orthoTop = VIEWPORT_SIZE;
        }
        else
        {
            camera.orthoLeft = -VIEWPORT_SIZE;
            camera.orthoRight = VIEWPORT_SIZE;
            camera.orthoBottom = -VIEWPORT_SIZE*aspectRatio;
            camera.orthoTop = VIEWPORT_SIZE*aspectRatio;
        }
    }
    componentWillUnmount(){
        const engine = this._engine;
        engine.dispose();
    }
    _createScene(canvas){
        const engine = this._engine;
        const scene =  new BABYLON.Scene(engine);
        scene.shadowsEnabled = false;

        const camera = new BABYLON.TargetCamera('mainCamera', new BABYLON.Vector3(0, 0, -10), scene);
       camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        this._mainCamera = camera;

        return scene;
    }
    _createTilesRow(tileY, row){
        const scene = this._scene;
        const tiles = row.tiles;

        const newRow = [];

        for (var tileX = 0; tileX < tiles.length; tileX++){
            const tile = tiles[tileX];

            const tileTag = this._createTileTag(tileX, tileY);

            const tileMesh = this._createTileMesh(tileTag);
            const tileBorderMesh = this._createTileBorderMesh(tileTag);
            tileBorderMesh.parent = tileMesh;

            const origMaterial = this._materials[tile.type];
            tileMesh.material = origMaterial;
            tileMesh.position.x = tileX;
            tileMesh.position.y = tileY;

            this._setUpTileActions(
                tileMesh,
                origMaterial,
                {
                    x: tileX,
                    y: tileY
                }
            );

            newRow.push(tileMesh);
        }

        this._tiles.push(newRow);
    }
    _createTileTag(tileX, tileY){
        return 'tile-' + tileX + '-' + tileY;
    }
    _createTileMesh(tileTag){
        const scene = this._scene;
        let tileMesh = null;

        if(this._firstTileMesh === null){
            this._firstTileMesh = BABYLON.Mesh.CreatePlane(tileTag, 1.0, scene);
            tileMesh = this._firstTileMesh;
        }else{
            tileMesh = this._firstTileMesh.clone(tileTag);
        }
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

            tileBorderMesh = this._firstTileBorderMesh;
        }else{
            tileBorderMesh = this._firstTileBorderMesh.clone(borderMeshTag);
        }
        return tileBorderMesh;
    }
    _setUpTileActions(tileMesh, origMaterial, tileCoords){
        const scene = this._scene;

        tileMesh.actionManager = new BABYLON.ActionManager(scene);

        this._setUpTileLeftPickAction(tileMesh, tileCoords);
    }
    _setUpTileLeftPickAction(tileMesh, tileCoords){
        const component = this;
        const scene = this._scene;

        const tileLeftPickAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnLeftPickTrigger,
            function () {
                component._onTileTypeChanged(tileCoords);
            });

        tileMesh.actionManager.registerAction(tileLeftPickAction);
    }
    _createTileTypeMaterial(){
        const scene = this._scene;
        const currTileType = this._materials.length;

        const material = new BABYLON.StandardMaterial('material-tile-type-' + currTileType, scene);
        material.ambientColor = new BABYLON.Color3(1 / (currTileType + 1), 1 / (currTileType + 1), 1 / (currTileType + 1));
        material.freeze();

        this._materials.push(material);
    }
    shouldComponentUpdate(nextProps, nextState) {
        this._oldProps = nextProps;

        return true;
    }
}

export default Relay.createContainer(Map, {
    fragments: {
        tileset: () => Relay.QL`
            fragment on Tileset {
                rows{
                    id,
                    tiles {
                        id,
                        type,
                        ${ChangeTileTypeMutation.getFragment('tile')}
                    },
                },
                availableTileTypes
            }
        `
    }
});
