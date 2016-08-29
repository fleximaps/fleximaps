import BABYLON from 'babylonjs';

export default class OrthographicCamera extends BABYLON.TargetCamera{
    constructor(tag, position, scene){
        super(tag, position, scene);

        this.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    }
}