import { Application } from "pixi.js";
import { IScene } from "./Interfaces";

export class Manager {
    private constructor() { /*Static Class*/ }

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    // Read-only getters
    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application({
            view: document.querySelector("#pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        // Add the ticker
        Manager.app.ticker.add(Manager.update)
    }

    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed: number): void {
        // Let the current scene know that we updated it...
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}
