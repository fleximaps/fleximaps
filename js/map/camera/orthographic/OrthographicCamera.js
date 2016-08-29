import BABYLON from 'babylonjs';

import OrthographicCameraInputsManager from './OrthographicCameraInputsManager';

export default class OrthographicCamera extends BABYLON.TargetCamera{
    constructor(tag, position, scene, viewportSize = 5, scale = 1, zoomStep = 0.1){
        super(tag, position, scene);

        this._viewportSize = viewportSize;
        this._scale = scale;
        this._zoomStep = zoomStep;

        this.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        this.speed = 4.0;

        this._inputs = new OrthographicCameraInputsManager(this);
        this._inputs.addKeyboard();

        this._cachedCanvasWidth = null;
        this._cachedCanvasHeight = null;
    }
    resize(canvasWidth = this._cachedCanvasWidth, canvasHeight = this._cachedCanvasHeight){
        if(canvasWidth !== this._cachedCanvasWidth){
            this._cachedCanvasWidth = canvasWidth;
        }

        if(canvasHeight !== this._cachedCanvasHeight){
            this._cachedCanvasHeight = canvasHeight;
        }

        const viewportSize = this._viewportSize;
        const scale = this._scale;

        if (canvasHeight == 0) canvasHeight = 1;

        /* Calculate aspect ratio --------------------------------------------------------------------*/
        const aspectRatio = canvasWidth / canvasHeight;

        if (canvasWidth >= canvasHeight)
        {
            this.orthoLeft = -viewportSize*aspectRatio*scale;
            this.orthoRight = viewportSize*aspectRatio*scale;
            this.orthoBottom = -viewportSize*scale;
            this.orthoTop = viewportSize*scale;
        }
        else
        {
            this.orthoLeft = -viewportSize*scale;
            this.orthoRight = viewportSize*scale;
            this.orthoBottom = -viewportSize*aspectRatio*scale;
            this.orthoTop = viewportSize*aspectRatio*scale;
        }
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
    zoomIn(){
        this._scale += this._zoomStep*this._computeLocalCameraSpeed();
        this.resize();
    }
    zoomOut(){
        this._scale -= this._zoomStep*this._computeLocalCameraSpeed();
        this.resize();
    }
}