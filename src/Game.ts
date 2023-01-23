import { Application, Assets } from "pixi.js";
import { IScene } from "./Interfaces";
import { manifest } from "./assets";

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

    private static initializeAssetsPromise: Promise<unknown>; 

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        Game.initializeAssetsPromise = Assets.init({ manifest: manifest });
        const bundleNames = manifest.bundles.map(b => b.name);
        Game.initializeAssetsPromise.then(() => {
            Assets.backgroundLoadBundle(bundleNames)
        });

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

    public static async changeScene(newScene: IScene): Promise<void> {
        // Wait for Assets to Initialize
        await Game.initializeAssetsPromise;

        // Remove and destroy old scene... if we had one..
        if (Game.currentScene) {
            Game.app.stage.removeChild(Game.currentScene);
            Game.currentScene.destroy();
        }

        // Start Downloading Assets
        await Assets.loadBundle(newScene.assetBundles);

        // TODO: Show Loading

        // When assets are ready, tell the scene
        newScene.constructorWithAssets();

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
