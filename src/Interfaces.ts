import { DisplayObject } from "pixi.js";

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
export interface IScene extends DisplayObject {
    assetBundles: string[];
    constructorWithAssets(): void;
    update(framesPassed: number): void;
}
