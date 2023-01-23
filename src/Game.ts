import { Application } from "pixi.js";
import { IScene } from "./Interfaces";

export class Game {
    private constructor() { /*Static Class*/ }

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    // Read-only getters
    public static get width(): number {
        return Game._width;
    }
    public static get height(): number {
        return Game._height;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        Game._width = width;
        Game._height = height;

        Game.app = new Application({
            view: document.querySelector("#pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        // Add the ticker
        Game.app.ticker.add(Game.update)
    }

    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (Game.currentScene) {
            Game.app.stage.removeChild(Game.currentScene);
            Game.currentScene.destroy();
        }

        // Add the new one
        Game.currentScene = newScene;
        Game.app.stage.addChild(Game.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed: number): void {
        // Let the current scene know that we updated it...
        if (Game.currentScene) {
            Game.currentScene.update(framesPassed);
        }
    }
}
