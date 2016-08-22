import BABYLON from 'babylonjs';
import React from 'react';
import Relay from 'react-relay';

import TileHoverInAnimationFactory from '../babylonjs/animations/tiles/TileHoverInAnimationFactory';
import TileHoverOutAnimationFactory from '../babylonjs/animations/tiles/TileHoverOutAnimationFactory';

import ChangeTileTypeMutation from '../mutations/ChangeTileTypeMutation';

const VIEWPORT_SIZE = 5;
const TILE_TYPES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //TODO get it from backend

const SIZE_X = 20;
const SIZE_Y = 20;

class Map extends React.Component {
    render() {
        const component = this;

        const tileset = this.props.tileset;

        return (
            <canvas className="map" ref="mapRef"></canvas>
        );
    }
    _onTileTypeChanged(tile, newTileType){
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
        scene.createOrUpdateSelectionOctree();

        this._updateAspectRatio(scene);

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener('resize', function () {
            component._updateAspectRatio.apply(component, [scene]);

            component._engine.resize();
        });
    }
    _updateAspectRatio(scene){
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

        const materials =this._createMaterials(scene);
        this._createTiles(scene, materials);

        return scene;
    }
    _createTiles(scene, materials){
        var xSize = 20;
        var ySize = 20;

        this._firstTileMesh = null;
        this._firstTileBorderMesh = null;

        for(var tileY = 0; tileY < SIZE_Y; tileY++){
            this._createTilesRow(scene, materials, tileY);
        }
    }
    _createTilesRow(scene, materials, tileY){
        for (var tileX = 0; tileX < SIZE_X; tileX++){
            const tileTag = this._createTileTag(tileX, tileY);

            const tileMesh = this._createTileMesh(scene, tileTag);
            const tileBorderMesh = this._createTileBorderMesh(scene, tileTag);
            tileBorderMesh.parent = tileMesh;

            const materialIdx = Math.floor(Math.random() * TILE_TYPES.length);

            const origMaterial = materials[materialIdx];
            tileMesh.material = origMaterial;
            tileMesh.position.x = tileX;
            tileMesh.position.y = tileY;

            this._setUpTileActions(scene, tileMesh, origMaterial);
        }
    }
    _createTileTag(tileX, tileY){
        return 'tile-' + tileX + '-' + tileY;
    }
    _createTileMesh(scene, tileTag){
        let tileMesh = null;

        if(this._firstTileMesh === null){
            this._firstTileMesh = BABYLON.Mesh.CreatePlane(tileTag, 1.0, scene);
            tileMesh = this._firstTileMesh;
        }else{
            tileMesh = this._firstTileMesh.clone(tileTag);
        }
        return tileMesh;
    }
    _createTileBorderMesh(scene, tileTag){
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
    _setUpTileActions(scene, tileMesh, origMaterial){
        tileMesh.actionManager = new BABYLON.ActionManager(scene);

        this._setUpTileHoverInAction(scene, tileMesh, origMaterial);
        this._setUpTileHoverOutAction(scene, tileMesh, origMaterial);
    }
    _setUpTileHoverInAction(scene, tileMesh,origMaterial){
        const hoverInAnimation = TileHoverInAnimationFactory.create('anim-hover-in-' + tileMesh.tag);
        tileMesh.animations.push(hoverInAnimation);

        const hoverInAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function(){
                if(tileMesh.material === origMaterial){
                    //Clone the material
                    tileMesh.material = origMaterial.clone();
                }

                scene.stopAnimation(tileMesh);
                scene.beginDirectAnimation(tileMesh, [hoverInAnimation], 0, 100, false, 1);
            }
        );

        tileMesh.actionManager.registerAction(hoverInAction);
    }
    _setUpTileHoverOutAction(scene, tileMesh, origMaterial){
        const hoverOutAnimation = TileHoverOutAnimationFactory.create('anim-hover-out-' + tileMesh.tag);
        tileMesh.animations.push(hoverOutAnimation);

        const hoverOutAction = new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function(){
                if(tileMesh.material === origMaterial){
                    //Clone the material
                    tileMesh.material = origMaterial.clone();
                }

                scene.stopAnimation(tileMesh);
                scene.beginDirectAnimation(tileMesh, [hoverOutAnimation], 0, 100, false);
            }
        );

        tileMesh.actionManager.registerAction(hoverOutAction);
    }
    _createMaterials(scene){
        return TILE_TYPES.map(function(tileType, index){
            const material = new BABYLON.StandardMaterial('material-tile-type-' + index, scene);
            material.ambientColor = new BABYLON.Color3(1 / (index + 1), 1 / (index + 1), 1 / (index + 1));
            material.freeze();

            return material;
        });
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
