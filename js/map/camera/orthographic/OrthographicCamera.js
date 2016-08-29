import BABYLON from 'babylonjs';

import OrthographicCameraInputsManager from './OrthographicCameraInputsManager';

export default class OrthographicCamera extends BABYLON.TargetCamera{
    constructor(tag, position, scene){
        super(tag, position, scene);

        this.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        this.speed = 4.0;

        this._inputs = new OrthographicCameraInputsManager(this);
        this._inputs.addKeyboard();
    }
    _checkInputs(){
        this._inputs.checkInputs();

        super._checkInputs();
    }
    attachControl(element, noPreventDefault = false){
        this._inputs.attachElement(element, noPreventDefault);
    }
    detachControl(element){
        this._inputs.detachElement(element);

        this.cameraDirection = new BABYLON.Vector3(0, 0, 0);
    }
}