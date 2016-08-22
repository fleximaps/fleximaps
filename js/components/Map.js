import BABYLON from 'babylonjs';
import React from 'react';
import Relay from 'react-relay';

import TileHoverInAnimationFactory from '../babylonjs/animations/tiles/TileHoverInAnimationFactory';
import TileHoverOutAnimationFactory from '../babylonjs/animations/tiles/TileHoverOutAnimationFactory';

import ChangeTileTypeMutation from '../mutations/ChangeTileTypeMutation';

const VIEWPORT_SIZE = 5;
const TILE_TYPES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //TODO get it from backend

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
        scene.debugLayer.show();

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

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 0, -1), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);

        const materials =this._createMaterials(scene);
        this._createTiles(scene, materials);

        return scene;
    }
    _createTiles(scene, materials){
        var xSize = 20;
        var ySize = 20;

        var firstTileMesh = null;

        for(var tileY = 0; tileY < ySize; tileY++){
            for (var tileX = 0; tileX < xSize; tileX++){
                var tileTag = 'tile-' + tileX + '-' + tileY;

                let tileMesh = null;
                if(firstTileMesh === null){
                    firstTileMesh = BABYLON.Mesh.CreatePlane(tileTag, 1.0, scene);
                    tileMesh = firstTileMesh;
                }else{
                    tileMesh = firstTileMesh.clone(tileTag);
                }

                const materialIdx = Math.floor(Math.random() * TILE_TYPES.length);

                const origMaterial = materials[materialIdx];
                tileMesh.material = origMaterial;
                tileMesh.position.x = tileX;
                tileMesh.position.y = tileY;

                const hoverInAnimation = TileHoverInAnimationFactory.create('anim-hover-in-' + tileTag);
                const hoverOutAnimation = TileHoverOutAnimationFactory.create('anim-hover-out-' + tileTag);
                
                tileMesh.animations.push(hoverInAnimation);
                tileMesh.animations.push(hoverOutAnimation);

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

                tileMesh.actionManager = new BABYLON.ActionManager(scene);
                tileMesh.actionManager.registerAction(hoverInAction);
                tileMesh.actionManager.registerAction(hoverOutAction);
            }
        }
    }
    _createMaterials(scene){
        return TILE_TYPES.map(function(tileType, index){
            const material = new BABYLON.StandardMaterial('material-tile-type-' + index, scene);
            material.diffuseColor = new BABYLON.Color3(1 / (index + 1), 1 / (index + 1), 1 / (index + 1));
            material.specularColor = material.diffuseColor;

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
