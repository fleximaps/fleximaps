/**
 * Created by Adrian Tello on 23.08.2016.
 */

import BABYLON from 'babylonjs';

const VIEWPORT_SIZE = 5;

export default class MapFacade{
    constructor(canvas, mapFormat){
        this._canvas = canvas;
        this._mapFormat = mapFormat;

        this._init();
    }
    _init(){
        this._initFields();
        this._createCacheObjs();

        this._initEngine();
        this._createScene();
        this._createCamera();
        this._updateAspectRatio();
    }
    _initFields(){
        this._size = {
            cols: 0,
            rows: 0
        };

        this._tileClickedListener = function(){};
    }
    _createCacheObjs(){
        this._tileTypeMaterials = [];

        this._rows = [];
    }
    _initEngine(){
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    _createScene(){
        const scene =  new BABYLON.Scene(this._engine);
        scene.shadowsEnabled = false;
        scene.ambientColor = new BABYLON.Color3(1, 1, 1);
        scene.lightsEnabled = false;

        this._scene = scene;
        this._mapFormat.setScene(scene);
    }
    _createCamera(){
        const camera = new BABYLON.TargetCamera('mainCamera', new BABYLON.Vector3(0, 0, -10), this._scene);
        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        // attach the camera to the canvas
        camera.attachControl(this._canvas, false);

        this._mainCamera = camera;
    }
    _updateAspectRatio(){
        const camera = this._mainCamera;

        let height = this._canvas.height;
        const width = this._canvas.width;

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
    start(){
        const engine = this._engine;
        const scene = this._scene;

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
    resize(){
        this._updateAspectRatio();
        this._engine.resize();
    }
    setTileTypes(tileTypes){
        const oldAvailableTileTypes = this._tileTypeMaterials.length;

        if(oldAvailableTileTypes > tileTypes){
            //There are fewer tile types
            console.warn('Not implemented yet');
        }else if(oldAvailableTileTypes < tileTypes){
            //There are new tile types
            for(let tileType = oldAvailableTileTypes; tileType < tileTypes; tileType++){
                this._createTileTypeMaterial();
            }
        }
    }
    _createTileTypeMaterial(){
        const scene = this._scene;
        const currTileType = this._tileTypeMaterials.length;

        const material = new BABYLON.StandardMaterial('material-tile-type-' + currTileType, scene);
        material.ambientColor = new BABYLON.Color3(1 / (currTileType + 1), 1 / (currTileType + 1), 1 / (currTileType + 1));
        material.freeze();

        this._tileTypeMaterials.push(material);
    }
    _setSize(numCols, numRows){
        this._setNumCols(numCols);
        this._setNumRows(numRows);
    }
    _setNumCols(numCols){
        this._size.cols = numCols;

        //TODO expand/remove existing rows
    }
    _setNumRows(numRows){
        const oldRowsCount = this._rows.length;

        //Check if the row number changed
        if(oldRowsCount > numRows){
            //There are fewer rows
            console.warn('Not implemented yet');
        }else if(oldRowsCount < numRows){
            //There are new tile types
            for(let rowNum = oldRowsCount; rowNum < numRows; rowNum++){
                this._createTilesRow(rowNum);
            }
        }
    }
    _createTilesRow(tileY){
        const scene = this._scene;

        const newRow = [];

        for (var tileX = 0; tileX < this._size.cols; tileX++){
            const tileTag = this._createTileTag(tileX, tileY);
            const tileMesh = this._mapFormat.createTileMesh(tileTag, tileX, tileY);

            const origMaterial = this._tileTypeMaterials[0];
            tileMesh.material = origMaterial;

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

        this._rows.push(newRow);
    }
    _createTileTag(tileX, tileY){
        return 'tile-' + tileX + '-' + tileY;
    }
    _setUpTileActions(tileMesh, origMaterial, tileCoords){
        const scene = this._scene;

        tileMesh.actionManager = new BABYLON.ActionManager(scene);

        this._setUpTileLeftPickAction(tileMesh, tileCoords);
    }
    _setUpTileLeftPickAction(tileMesh, tileCoords){
        const component = this;

        const tileLeftPickAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnLeftPickTrigger,
            function () {
                component._tileClickedListener.apply(null, [tileCoords.x, tileCoords.y]);
            });

        tileMesh.actionManager.registerAction(tileLeftPickAction);
    }
    setTileType(colNum, rowNum, tileType){
        const tileMesh = this._rows[rowNum][colNum];

        tileMesh.material = this._tileTypeMaterials[tileType];
    }
    setTileClickedListener(tileClickedListener){
        this._tileClickedListener = tileClickedListener;
    }
    setDebugMode(debugMode){
        if(debugMode){
            this._scene.debugLayer.show();
        }else{
            this._scene.debugLayer.hide();
        }
    }
}