import BABYLON from 'babylonjs';

import OrthographicCameraKeyboardInput from './inputs/OrthographicCameraKeyboardInput';

export default class OrthographicCameraInputsManager extends BABYLON.CameraInputsManager{
    addKeyboard(){
        this.add(new OrthographicCameraKeyboardInput());
        return this;
    }
}