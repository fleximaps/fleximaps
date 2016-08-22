import BABYLON from 'babylonjs';

export default class TileHoverInAnimationFactory {
    static create(tag){
        //Animate it
        const animation = new BABYLON.Animation(tag, 'material.alpha', 100 * (1000.0 / 50), BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animation.setKeys([
            {
                frame: 0,
                value: 1
            },
            {
                frame: 100,
                value: 0.5
            }
        ]);

        return animation;
    }
};