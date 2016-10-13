import BABYLON from 'babylonjs';

export default class OrthographicCameraKeyboardInput{
    constructor(){
        this._keys = [];
        this._onKeyDown = function(){};
        this._onKeyUp = function(){};
        this._onLostFocus = function(){};

        this._keysUp = [38];
        this._keysDown = [40];
        this._keysLeft = [37];
        this._keysRight = [39];

        this._keysZoomIn = [17];
        this._keysZoomOut = [18];
    }
    attachControl(element, noPreventDefault = false){
        const input = this;

        element.tabIndex = 1;

        this._onKeyDown = function(evt){
            if (input._keysUp.indexOf(evt.keyCode) !== -1 ||
                input._keysDown.indexOf(evt.keyCode) !== -1 ||
                input._keysLeft.indexOf(evt.keyCode) !== -1 ||
                input._keysRight.indexOf(evt.keyCode) !== -1 ||
                input._keysZoomIn.indexOf(evt.keyCode) !== -1 ||
                input._keysZoomOut.indexOf(evt.keyCode) !== -1) {
                const index = input._keys.indexOf(evt.keyCode);

                if (index === -1) {
                    input._keys.push(evt.keyCode);
                }

                if (evt.preventDefault) {
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            }
        };

        this._onKeyUp = function(evt){
            if (input._keysUp.indexOf(evt.keyCode) !== -1 ||
                input._keysDown.indexOf(evt.keyCode) !== -1 ||
                input._keysLeft.indexOf(evt.keyCode) !== -1 ||
                input._keysRight.indexOf(evt.keyCode) !== -1 ||
                input._keysZoomIn.indexOf(evt.keyCode) !== -1 ||
                input._keysZoomOut.indexOf(evt.keyCode) !== -1) {
                const index = this._keys.indexOf(evt.keyCode);

                if (index >= 0) {
                    input._keys.splice(index, 1);
                }

                if (evt.preventDefault) {
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            }
        };

        this._onLostFocus = function(){
            input._keys = [];
        };

        element.addEventListener("keydown", this._onKeyDown.bind(this), false);
        element.addEventListener("keyup", this._onKeyUp.bind(this), false);

        BABYLON.Tools.RegisterTopRootEvents([
            { name: "blur", handler: this._onLostFocus }
        ]);
    }
    detachControl(element){
        if (element) {
            element.removeEventListener("keydown", this._onKeyDown.bind(this));
            element.removeEventListener("keyup", this._onKeyUp.bind(this));
        }

        BABYLON.Tools.UnregisterTopRootEvents([
            { name: "blur", handler: this._onLostFocus }
        ]);

        this._keys = [];
        this._onKeyDown = function(){};
        this._onKeyUp = function(){};
        this._onLostFocus = function(){};
    }
    checkInputs() {
        if (this._onKeyDown){
            const camera = this.camera;
            // Keyboard
            for (let index = 0; index < this._keys.length; index++) {
                var keyCode = this._keys[index];
                var speed = camera._computeLocalCameraSpeed();

                if (this._keysLeft.indexOf(keyCode) !== -1) {
                    camera.cameraDirection.copyFromFloats(-speed, 0, 0);
                } else if (this._keysUp.indexOf(keyCode) !== -1) {
                    camera.cameraDirection.copyFromFloats(0, speed, 0);
                } else if (this._keysRight.indexOf(keyCode) !== -1) {
                    camera.cameraDirection.copyFromFloats(speed, 0, 0);
                } else if (this._keysDown.indexOf(keyCode) !== -1) {
                    camera.cameraDirection.copyFromFloats(0, -speed, 0);
                } else if(this._keysZoomIn.indexOf(keyCode) !== -1) {
                    camera.zoomIn();
                } else if(this._keysZoomOut.indexOf(keyCode) !== -1) {
                    camera.zoomOut();
                }
            }
        }
    }
    getTypeName(){
        return "OrthographicCameraKeyboardInput";
    }
    getSimpleName(){
        return "keyboard";
    }
}